import { User, updateProfile } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "@/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { User as User2 } from "@/types/firestore/users/user";

export async function updateUserProfileObj(
  user: User,
  data: { firstName: string; lastName: string; photoURL?: string }
) {
  return await updateProfile(user, data);
}

export async function sendContactEmail(data: any, file: File | null) {
  
  const contactEmail = httpsCallable(functions, "contactEmail");
  const out = await contactEmail(data);
  return out;
}


export async function getProfileData(uid: string) {
  const docRef = doc(db, `users/${uid}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data as User2;
  } 
  return {} as User2;
}