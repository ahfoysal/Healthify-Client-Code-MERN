/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { ReactNode } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import LoaderScreen from '../others/LoadingScreen';
import { AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import useAxiosSecure from './useAxios';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { app } from '@/firebase/firebase.config';
import toast from 'react-hot-toast';

export const AuthContext = createContext<{
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  logout: () => Promise<void>;
  loginChecking: boolean;
  setLoginChecking: React.Dispatch<React.SetStateAction<boolean>>;
  googleSignIn: () => Promise<UserCredential | undefined>;
}>({
  user: null,
  setUser: (() => {}) as React.Dispatch<React.SetStateAction<IUser | null>>,
  logout: async (): Promise<void> => {},
  loginChecking: false,
  setLoginChecking: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
  googleSignIn: async (): Promise<UserCredential | undefined> => {
    return undefined;
  },
});
export interface IUser {
  name: string;
  email: string;
  avatar: string;
  password: string;
  id: string;
  _id: string;
  bloodGroup: string;
  district: string;
  upazila: string;
  role: string;
  userStatus: string;
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const Axios = useAxiosSecure();
  const [user, setUser] = useState<IUser | null>(null);
  const [loginChecking, setLoginChecking] = useState(true);
  const token = Cookies.get('user');

  const googleSignIn = async (): Promise<UserCredential | undefined> => {
    setLoginChecking(false);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error('Error signing in with Google');
      setUser(null);
      return undefined;
    }
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await Axios.get('/auth/', {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 200 && response.data.success) {
          setUser(response.data.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
        setUser(null);
      } finally {
        setLoginChecking(false);
      }
    };
    if (token) {
      checkUserAuthentication();
    } else {
      setLoginChecking(false);
    }
  }, [token, Axios]);

  const authInfo = {
    user,
    setUser: setUser as React.Dispatch<React.SetStateAction<IUser | null>>,
    googleSignIn,
    logout: async (): Promise<void> => {
      // Provide a default implementation or leave it empty
      Cookies.remove('user');
      setUser(null);
      setLoginChecking(false);
    },
    loginChecking,
    setLoginChecking,
  };

  if (loginChecking) {
    return (
      <AnimatePresence>
        <LoaderScreen />
      </AnimatePresence>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
