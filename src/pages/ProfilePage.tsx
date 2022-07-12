import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSlice } from '../redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSlice);

  const handleOnSignOut = () => {
    dispatch(userSlice.actions.logout());
    navigate('/');
  };

  useEffect(() => {
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Manage your account</h1>
        <button
          type="button"
          className={styles.button}
          onClick={handleOnSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
