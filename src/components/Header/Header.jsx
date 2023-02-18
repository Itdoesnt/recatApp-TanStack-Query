import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import userPic from '../../assets/user.png';
import signUpPic from '../../assets/signup.png';
import signInPic from '../../assets/signin.png';
import { authSelectors } from '../../store/auth';
import { useSelector } from 'react-redux';

export const Header = ({ className }) => {
  const token = useSelector(authSelectors.token);

  return <div className={classNames(styles.root, className)}>
    <Link className={styles.logo} to={'/catalog'}>DOG FOOD</Link>
    <input type="text" placeholder='Search in catalog' className={styles.search} />
    <div className="actions">
      {!!token
        ? <Link className={styles.button} to={'/profile'}>
          <img className={styles.user} src={userPic} alt="" />
        </Link>
        : (<>
          <Link className={styles.button} to={'/signup'} title={'Sign up'}>
            <img className={styles.user} src={signUpPic} alt="" />
          </Link>
          <Link className={styles.button} to={'/signin'} title={'Sign in'}>
            <img className={styles.user} src={signInPic} alt="" />
          </Link>
        </>)
      }
    </div>
  </div>
}