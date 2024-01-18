/**
 * author : Sudeera Madushan
 * date : 1/16/2024
 * project : my_app
 */
import AsyncStorage from "@react-native-async-storage/async-storage";


export const setDataToAsyncStorage = async  (key:string, data:string) => {
   return  await AsyncStorage.setItem(key,data);
};
