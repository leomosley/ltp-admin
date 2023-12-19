import { database } from "./firebase";
import { ref, get, child } from "firebase/database";

interface ImageObject {
  imageURL: string;
}

interface WorkImages {
  [key: string]: ImageObject;
}

interface WorkImagesCollection {
  [key: string]: WorkImages;
}

interface Work {
  date: string;
  description: string;
  id: string;
  name: string;
  type: string;
}

interface Works {
  [key: string]: Work;
}

interface WorkWithImages extends Work {
  images: WorkImages;
}

interface WorkImagesMap {
  [key: string]: WorkWithImages;
}

export const fetchData = async () => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, 'db'));
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const works: Works = data?.work || {};
      const workImagesMap: WorkImagesMap = data?.image || {};
      const merged: WorkImagesMap = {};
    
      for (const id in works) {
        const work = works[id];
        const workImagesCollection = workImagesMap[work.id];
    
        if (work && workImagesCollection) {
          const mergedWork: WorkWithImages = {
            ...work,
            // @ts-ignore
            images: workImagesCollection,
          };
    
          merged[id] = mergedWork;
        }
      }
      
      return merged;
    } else {
      console.log('No data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};