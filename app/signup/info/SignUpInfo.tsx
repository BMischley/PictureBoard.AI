"use client";
import { useState } from "react";
import { updateProfile } from "@/utils/user/profileMethods";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";

export default function Signup({self_description, language}: {self_description: string, language: string}) {
  console.log(self_description)
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [description, setDescription] = useState(self_description);

  const languages = ["English", "Spanish", "French", "German", "Chinese"];
  const router = useRouter();

  const onSubmit = async () => {
    const user = auth.currentUser;
   console.log(user)
    try {
      if(!user) throw new Error("No user found");
     
      const data = {uidAuth: user.uid, selfDescription: description, language: selectedLanguage}
      console.log(data)
      await updateProfile(user.uid, data);
      router.push("/pictureboard");
    } catch (e: any) {
      console.error(e);
      
    }
  };




  return (
    <div className="flex pb-16 bg-slate-100 h-screen flex-row w-full justify-center">
      <div className="w-full max-w-md m-auto bg-white rounded-xl p-8">
        <h1 className="text-lg text-center font-bold mb-4">
          Account Information
        </h1>

        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-700"
        >
          Choose a language
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          id="language"
          name="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option disabled selected>
            Choose a language
          </option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        <div className="mt-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Describe yourself in 1-2 sentences.
          </label>
          <textarea
            className="textarea w-full textarea-bordered"
            placeholder="Bio"
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            value={description}
            name="description"
          ></textarea>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border bg-primary-teal border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={() => onSubmit()}
          >
            Save Information
          </button>
        </div>
      </div>
    </div>
  );
}
