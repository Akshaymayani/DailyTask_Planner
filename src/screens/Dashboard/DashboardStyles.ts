import { StyleSheet } from 'react-native';

export const DashboardStyles = () => (
    StyleSheet.create({
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
    })
);
