import { database } from "@/api/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

interface ImageMap {
  [key: string]: string;
}

interface FetchResponse {
  id: string;
  description: string;
  title: string;
  type: string;
  images: ImageMap;
}

export async function getAll() {
  const querySnapshot = await getDocs(collection(database, "db"));
  const data = [] as FetchResponse[];
  querySnapshot.forEach((doc) => {
    // @ts-ignore
    data.push({
      ...doc.data(),
      id: doc.id
    });
  });
  return data;
}

export async function getData(id: string) {
  const docRef = doc(database, "db", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      id: docSnap.id
    };
  } else {
    console.log("No document");
  }
}