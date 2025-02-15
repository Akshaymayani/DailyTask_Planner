import AsyncStorage from '@react-native-async-storage/async-storage';

async function SetAsyncData(name: string, data:any) {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(data));
    console.log(`Data Added SuccessFully in ${name}`);
  } catch (error) {
    console.log(`Sorry, Error:${error} Occured While Adding Data in ${name}`);
  }
}

async function GetAsyncData(name: string) {
  try {
    const retrievedData = await AsyncStorage.getItem(name);

    if (retrievedData !== undefined) {
      return retrievedData ? JSON.parse(retrievedData) : undefined;
    }
  } catch (error) {
    console.log(
      `Sorry, Error:${error} Occured While Retreiving Data from ${name}`,
    );
  }
}
async function RemoveAsyncData(name: string) {
  try {
    await AsyncStorage.removeItem(name);
    // Congrats! You've just removed your first value!
  } catch (error) {
    console.log(
      `Sorry, Error:${error} Occured While Removing Data from ${name}`,
    );
  }
}

async function ClearAsyncStorage() {
  try {
    await AsyncStorage.clear();
    console.log("Congrats! You've just cleared the device Async storage!");
  } catch (error) {
    // There was an error on the native side
  }
}
export {GetAsyncData, SetAsyncData, RemoveAsyncData, ClearAsyncStorage};