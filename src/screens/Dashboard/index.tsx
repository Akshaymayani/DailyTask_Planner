/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
/* eslint-disable react-hooks/exhaustive-deps */
import { AsyncStorage, NavigationPath } from '../../constant/Storage';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GetAsyncData, SetAsyncData } from '../../AsyncStorage/ManipulateStorage';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../Redux/Store';

import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import CustomButton from '../../component/CustomButton';
import CustomHeader from '../../component/Header';
import { DashboardNavigationProp } from '../../types/NavigationTypes';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FormInput from '../../component/FormInput';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RenderTaskItem from '../../component/RenderTask';
import TaskFilterDropdown from '../../component/FilterTaskDropdown';
import { logoutUser } from '../../Redux/Features/usersSlice';
import { useForm } from 'react-hook-form';

export interface Task {
  id: number;
  taskName: string;
  taskDescription: string;
  dueTime: Date | null;
}
interface FormData {
  taskName: string;
  taskDescription: string;
  dueTime: Date | null;
}

interface Props{
  navigation: DashboardNavigationProp;
}
const DashboardScreen = ({ navigation }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);


  const loggedInUser = useAppSelector((store: RootState) => store.userInfo.currentUser);
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['60%'];

  const { control, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    defaultValues: {
      taskName: '',
      taskDescription: '',
      dueTime: null,
    },
  });
  const resetFormField = ()=>{
    reset({
        taskName: '',
        taskDescription: '',
        dueTime: null,
      });
  };
  const openBottomSheet = (task?: Task) => {
    if (task) {
      setIsEditing(true);
      setEditingTaskId(task.id);
      setValue('taskName', task.taskName);
      setValue('taskDescription', task.taskDescription);
      setValue('dueTime', task.dueTime);
    } else {
      resetFormField();
      setIsEditing(false);
      setEditingTaskId(null);
    }
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    resetFormField();
    bottomSheetRef.current?.close();
  };


  const updateUserTasksInStorage = async (userId: string, updatedTasks: Task[]) => {
    try {
      const storedData = await GetAsyncData(AsyncStorage.TASK_INFO);
      const tasksByUser = storedData ? storedData : {};
      tasksByUser[userId] = updatedTasks;
      await SetAsyncData(AsyncStorage.TASK_INFO, tasksByUser);
    } catch (error) {
      console.error('Error updating AsyncStorage tasks:', error);
    }
  };

  const filteredTasks = () => {
    const now = new Date();
    // Map tasks and ensure dueTime is a Date object
    const updatedTasks = tasks.map(task => {
      const dueTime = task.dueTime ? new Date(task.dueTime) : null;
      return {
        ...task,
        dueTime,
        status: dueTime && now >= dueTime ? 'completed' : 'pending',
      };
    });
    console.log({ updatedTasks });
    return updatedTasks.filter(task => {
      if (filter === 'Completed') {return task.status === 'completed';}
      if (filter === 'Pending') {return task.status === 'pending';}
      return true;
    });
  };


  const handleSaveTask = async (data: FormData) => {
    console.log(data);
    if (isEditing && editingTaskId) {
      // Update existing task
      const updatedTasks = tasks.map(task =>
        task.id === editingTaskId
          ? {
              ...task,
              taskName: data.taskName,
              taskDescription: data.taskDescription,
              dueTime: data.dueTime,
            }
          : task
      );
      setTasks(updatedTasks);
      await updateUserTasksInStorage(loggedInUser.id, updatedTasks);
    } else {
      const newTask: Task = {
        id: new Date().getTime(),
        taskName: data.taskName,
        taskDescription: data.taskDescription,
        dueTime: data.dueTime,
      };
      console.log('New task: ', newTask);
      let updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      await updateUserTasksInStorage(loggedInUser.id, updatedTasks);
    }
    closeBottomSheet();
  };

  const handleDeleteTask = async (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await updateUserTasksInStorage(loggedInUser.id, updatedTasks);
  };

  // Date picker handlers
  const showDatePicker = useCallback(() => setIsDatePickerVisible(true),[isDatePickerVisible]);
  const hideDatePicker = useCallback(() => setIsDatePickerVisible(false),[isDatePickerVisible]);
  const handleConfirmDate = (date: Date) => {
    console.log(new Date(date));
    setValue('dueTime', new Date(date));
    hideDatePicker();
  };

  const handleLogout = async () => {
    await SetAsyncData(AsyncStorage.SESSION_INFO, null);
    dispatch(logoutUser());
    navigation.navigate(NavigationPath.Login);
  };

  useEffect(() => {
    const updateTaskStatus = () => {
      const now = new Date();
      setTasks(prevTasks =>
        prevTasks.map(task => ({
          ...task,
          status: task.dueTime && now >= task.dueTime ? 'completed' : 'pending',
        }))
      );
    };

    // Update immediately and then on an interval
    updateTaskStatus();
    const interval = setInterval(() => {
      updateTaskStatus();
    }, 20000); // every 20 seconds

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchAndResetTasksIfDateChanged = async () => {
      setLoading(true);
      const result = await GetAsyncData(AsyncStorage.TASK_INFO);

      if (result) {
        const userTask = result[loggedInUser.id];
        if (userTask && userTask.length > 0) {
          // Parse tasks and convert dueTime to Date objects
          const parsedTasks = userTask.map((task: Task) => ({
            ...task,
            dueTime: task.dueTime ? new Date(task.dueTime) : null,
          }));

          // Check the dueTime of the first task
          const today = new Date();
          const firstTask = parsedTasks[0];
          if (firstTask) {
            const taskDueDate = new Date(firstTask.dueTime || 0);

            // Check if the first task's dueDate is not today's date
            if (
              taskDueDate.getDate() !== today.getDate() ||
              taskDueDate.getMonth() !== today.getMonth() ||
              taskDueDate.getFullYear() !== today.getFullYear()
            ) {
              // Reset tasks if the date doesn't match
              setTasks([]);
              console.log('Tasks have been reset because the date has changed');
            } else {
              setTasks(parsedTasks);
            }
          } else {
            setTasks([]);
          }
        } else {
          setTasks([]);
        }
      }
      setLoading(false);
    };

    fetchAndResetTasksIfDateChanged();
  }, [loggedInUser.id]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: Platform.OS === 'ios' ?  45 : 10 }]}>
        {/* Greeting Message */}
        <CustomHeader title="Daily Task Planner" onLogout={handleLogout} />
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {loggedInUser ? loggedInUser.name : 'user'} !</Text>
        </View>
        {/* Add Task Button */}
        <View style={styles.filterContainer}>
          <TaskFilterDropdown selectedFilter={filter} onFilterChange={setFilter} />
          <TouchableOpacity style={styles.addButton} onPress={() => openBottomSheet()}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
        {/* Tasks List */}
        {tasks.length > 0 ? (
            <FlatList
              data={filteredTasks()}
              renderItem={({ item }) => (
                <RenderTaskItem
                  item={item}
                  handleDeleteTask={handleDeleteTask}
                  openBottomSheet={openBottomSheet}
                />
              )}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.taskList}
            />
          ) : (
            <View style={styles.notFoundContainer}>
              <Image
                 source={require('../../assets/NotFound.jpg')}
                 alt="notfound image"
                 resizeMode="cover"
                 width={300}
                 style={{aspectRatio:1}}
                />
              <Text style={styles.notFoundText}>No task found</Text>
            </View>
          )
        }

        {/* BottomSheet for Add/Edit Task */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: '#eee' }}
        >
          <BottomSheetView style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>
              {isEditing ? 'Edit Task' : 'Add Task'}
            </Text>
            <FormInput
              control={control}
              name="taskName"
              label="Task Name"
              rules={{ required: 'Task Name is required' }}
            />
            <FormInput
              control={control}
              name="taskDescription"
              label="Task Description"
              multiline
              rules={{ required: 'Task Description is required' }}
            />
            <TouchableOpacity
               style={styles.datePickerButton}
               onPress={showDatePicker}
               activeOpacity={0.5}
            >
              <Text style={styles.datePickerText}>
                {watch('dueTime')
                  ? watch('dueTime').toLocaleTimeString()
                  : 'Select Due Time'}
              </Text>
            </TouchableOpacity>
            <CustomButton title={isEditing ? 'Update Task' : 'Add Task'} onPress={handleSubmit(handleSaveTask)} />
          </BottomSheetView>
        </BottomSheet>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
      </View>
      <CustomActivityIndicator
         IsLoading={loading}
         LoadingText="Please wait..."
       />
    </GestureHandlerRootView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    // paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  taskList: {
    paddingBottom: 100,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notFoundContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent:'center',
    alignItems:'center',
  },
  notFoundText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eee',
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    paddingBottom:10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
});
