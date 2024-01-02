import { database } from "@/api/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

interface ImageMap {
  [key: string]: string;
}

interface PostData {
  description: string;
  title: string;
  type: string;
  images: ImageMap;
}

interface Data {
  [x: string]: any;
}

export async function postData(data: PostData) {
  return await setDoc(doc(database, "db"), data);
} 

export async function updateData(id: string, data: Data) {
  const docRef = doc(database, "db", id);
  return await updateDoc(docRef, data);

}