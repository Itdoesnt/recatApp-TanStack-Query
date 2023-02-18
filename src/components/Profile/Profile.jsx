import styles from './index.module.scss';
import { useQuery } from 'react-query';
import { me } from '../../api';
import { useEffect } from 'react';
import { Loading } from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { authActions, authSelectors } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(authSelectors.token);

  const $request = useQuery('profile', me({ token }), {
    enabled: false,
    retry: false,
    cacheTime: 0,
  });

  useEffect(() => {
    if (token) {
      $request.refetch();
    }
  }, [token]);

  if ($request.isLoading) {
    return <Loading className={styles.root} />;
  }

  if ($request.isError) {
    return <div className={styles.root}>Ошибка загрузки</div>;
  }

  const onLogout = () => {
    dispatch(authActions.remove());
    navigate('/signin');
  };

  if ($request.isSuccess) {
    const profileData = $request.data;

    return <div className={styles.root}>
      <div className={styles.row}>
        <img className={styles.avatar} src={profileData.avatar} alt="avatar" />
        <div className={styles.column}>
          <div className={styles.name}>{profileData.name}</div>
          <div className={styles.column}>
            <div>About: {profileData.about}</div>
            <div>Email: {profileData.email}</div>
            <button className={styles.logout} onClick={onLogout}>Выйти</button>
          </div>
        </div>
      </div>
    </div>
  }
}