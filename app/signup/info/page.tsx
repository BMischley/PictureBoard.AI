"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import SignUpForm from './SignUpInfo';
import { getProfileData } from '@/utils/user/accountMethods';
import { auth } from '@/firebase.config';
import { User } from 'firebase/auth';
import { User as User2 } from "@/types/firestore/users/user";


export default function Home() {
  const [userData, setUserData] = useState<User2 | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const data = await getProfileData(user.uid);
        setUserData(data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userData !== null ? (
        <SignUpForm self_description={userData.selfDescription} language={userData.language}/>
      ) : (
        <SignUpForm self_description="Deez" language="English"/>
      )}
    </>
  );
}
