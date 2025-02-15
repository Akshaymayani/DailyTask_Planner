import { StyleSheet, View } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';

interface Props {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}
const TaskFilterDropdown = ({ selectedFilter, onFilterChange }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedFilter);
  const [items, setItems] = React.useState([
    { label: 'All', value: 'All' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Pending', value: 'Pending' },
  ]);

  const handleChange = (value: any) => {
    setValue(value);
    onFilterChange(value);
  };

  return (
    <View style={styles.dropdownContainer}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleChange}
        setItems={setItems}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownList}
        textStyle={styles.dropdownText}
        placeholderStyle={styles.placeholder}
        onChangeValue={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    flex: 1,
  },
  dropdown: {
    backgroundColor: '#e9ecef',
    borderColor: '#dee2e6',
    borderRadius: 15,
  },
  dropdownList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    overflow: 'hidden',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
  },
  arrow: {
    marginLeft: 10 },
  arrowIcon: {
    color: '#333' },
  arrowStyle: {
    marginLeft: 10 },

});

export default TaskFilterDropdown;
