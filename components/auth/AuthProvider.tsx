"use client";
import {
  onIdTokenChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useEffect, useContext, createContext } from "react";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase.config";
interface AuthContextProps {
  signInWithGoogle: () => Promise<UserCredential>;
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signUpWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signInWithFacebook: () => Promise<UserCredential>;
  signInWithGoogleRedirect: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextProps>({
  signInWithGoogle: async () => {
    return {} as UserCredential;
  },
  signInWithGoogleRedirect: async () => {
    return {} as UserCredential;
  },
  signInWithEmail: async (email: string, password: string) => {
    return {} as UserCredential;
  },
  signUpWithEmail: async (email: string, password: string) => {
    return {} as UserCredential;
  },
  signInWithFacebook: async () => {
    return {} as UserCredential;
  },
  logOut: async () => {},
});
export const useAuth = () => useContext(AuthContext);
function AuthProvider({ children }: { children: React.ReactNode }) {
  const setRoles = useAuthStore((state) => state.setRoles);
  const setUser = useAuthStore((state) => state.setUser);
  const logOu = useAuthStore((state) => state.logOut);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setRolesLoading = useAuthStore((state) => state.setRolesLoading);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log(user);
      setUser(user);
      setLoading(false);

      if (user === null) {
        setRolesLoading(false);
      }
      user?.getIdTokenResult(true).then((token) => {
        setRoles(token.claims);
        setRolesLoading(false);
      });
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [auth]);
  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    return await signInWithPopup(auth, provider);
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  };
  const signInWithEmail = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = async () => {
    await signOut(auth);

    logOu();
    router.push("/login");
  };
  const signUpWithEmail = async (email: string, password: string) => {
    console.log("HEY")
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log({ userCredential });
        return userCredential;
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        throw error;
      });
      console.log("Firebase response:", userCredential);
      return userCredential;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };
  const signInWithGoogleRedirect = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithRedirect(auth, provider);
  };
  return (
    <AuthContext.Provider
      value={{
        signInWithFacebook,
        signInWithGoogle,
        signInWithEmail,
        logOut,
        signUpWithEmail,
        signInWithGoogleRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
