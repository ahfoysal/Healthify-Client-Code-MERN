import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { app } from './firebase.config';

const auth = getAuth(app);

interface Payload {
  password: string;
  email: string;
  name?: string;
}

export const authHelper = () => {
  const signUp = ({ password, email }: Payload) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const signIn = ({ password, email }: Payload) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  return {
    signUp,
    logout,
    signIn,
  };
};
