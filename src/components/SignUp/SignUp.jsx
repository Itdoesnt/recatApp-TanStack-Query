import styles from './index.module.scss';
import { signUp } from '../../api';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const $request = useQuery('signUp', signUp({ email, password }), { enabled: false, retry: false });

  const onSubmit = () => {
    $request.refetch({ email, password });
  };

  useEffect(() => {
    if ($request.isSuccess) {
      navigate('/signin');
    }
  }, [$request.isSuccess, navigate]);

  return <div className={styles.root}>
    <div className={styles.title}>SignUp</div>
    <input type="text" className={styles.control} placeholder='Email' onInput={(e) => setEmail(e.target.value)} />
    <input type="password" className={styles.control} placeholder='Password' onInput={(e) => setPassword(e.target.value)} />
    {!!$request.isError && <div className={styles.error}>{$request.error?.message}</div>}
    <button className={styles.submit} onClick={onSubmit}>Register</button>
  </div>
}