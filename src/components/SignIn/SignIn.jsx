import styles from './index.module.scss';
import { signIn } from '../../api';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const $request = useQuery('signIn', signIn({ email, password }), {
    enabled: false,
    retry: false,
    cacheTime: 0,
  });

  const onSubmit = () => {
    $request.refetch({ email, password });
  };

  useEffect(() => {
    if ($request.isSuccess) {
      dispatch(authActions.set($request.data.token));
      navigate('/catalog');
    }
  }, [$request.isSuccess]);


  return <div className={styles.root}>
    <div className={styles.title}>SignIn</div>
    <input type="text" className={styles.control} placeholder='Email' onInput={(e) => setEmail(e.target.value)} />
    <input type="password" className={styles.control} placeholder='Password' onInput={(e) => setPassword(e.target.value)} />
    {!!$request.isError && <div className={styles.error}>{$request.error?.message}</div>}
    <button className={styles.submit} onClick={onSubmit}>Login</button>
  </div>
}