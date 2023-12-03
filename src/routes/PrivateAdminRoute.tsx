import { AuthContext } from '@/hooks/AuthContextProvider';
import LoaderScreen from '@/others/LoadingScreen';
import { ReactNode, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PrivateAdminRoute({ children }: IProps) {
  const { pathname } = useLocation();
  const { user, loginChecking } = useContext(AuthContext);
  console.log(user);
  if (loginChecking && !user) {
    return <LoaderScreen />;
  }

  if (!user) {
    return <Navigate to={'/login'} replace={true} state={{ path: pathname }} />;
  }

  if (user?.role != 'admin') {
    return (
      <Navigate to={'/dashboard'} replace={true} state={{ path: pathname }} />
    );
  }
  return children;
}
