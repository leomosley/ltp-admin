import { database } from "./firebase";
import { ref, get, child } from "firebase/database";

export const fetchData = async () =>{
  const dbRef = ref(database);
  let data;
  try {
    const snapshot = await get(child(dbRef, 'db'));
    if (snapshot.exists()) {
      data = snapshot.val();
    } else {
      console.log('No data');
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error
  }
  return data;
}