import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { Task } from '../screens/Dashboard';

interface Props {
    item : Task,
    handleDeleteTask: (id: number)=> void
    openBottomSheet: (item: Task) => void
}


  const RenderTaskItem = ({ item,openBottomSheet,handleDeleteTask }:Props) => {
    const handleShowTask = () => {
        Alert.alert(item.taskName,item.taskDescription);
    }
    return(
    <TouchableOpacity style={styles.taskItem} onPress={handleShowTask} activeOpacity={0.7}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskName}>{item.taskName}</Text>
        <Text style={styles.taskDate}>{item.dueTime ? item.dueTime.toLocaleString() : ''}</Text>
      </View>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openBottomSheet(item)}>
          <Ionicons name="pencil" size={24} color="blue" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )};

export default RenderTaskItem;
const styles = StyleSheet.create({
      taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginVertical: 5,
        borderWidth:1,
        borderColor:"#ccc",
      },
      taskInfo: {
        flex: 1,
      },
      taskName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      taskDate: {
        fontSize: 14,
        color: '#777',
      },
      taskActions: {
        flexDirection: 'row',
        alignItems: 'center',
      },
})