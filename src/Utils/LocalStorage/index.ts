//@libraries
import AsyncStorage from "@react-native-async-storage/async-storage";

export const USER_COLLECTION = "@gopizza:users";

export async function setDataStorage(key: string, data: any) {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function getDataStorage(key: string) {
  const result = await AsyncStorage.getItem(key);

  return JSON.parse(result as any);
}

export async function clearAllData(key: string) {
  await AsyncStorage.removeItem(key);
}
