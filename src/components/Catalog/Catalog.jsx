import styles from './index.module.scss';
import { products } from '../../api';
import { useQuery } from 'react-query';
import { Loading } from '../Loading/Loading';
import { useEffect } from 'react';
import { CatalogItem } from '../CatalogItem/CatalogItem';
import { authSelectors } from '../../store/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Catalog = () => {
  const token = useSelector(authSelectors.token);
  const navigate = useNavigate();
  const $request = useQuery('products', products({ token }), {
    enabled: false,
    retry: false,
    cacheTime: 0,
  });

  useEffect(() => {
    if (token) {
      $request.refetch();
    } else {
      navigate('/signin');
    }
  }, [token]);

  if (!token) {

  }

  if ($request.isLoading) {
    return <Loading className={styles.root} />
  }

  if ($request.isError) {
    return <div className={styles.root}>Ошибка загрузки</div>
  }

  if ($request.isSuccess) {
    const data = $request.data;

    return <div className={styles.root}>
      <div className={styles.found}>Найдено: {data.total} товаров</div>

      <div className={styles.items}>
        {data.products.map((product) => <CatalogItem key={product._id} product={product} className={styles.item} />)}
      </div>
    </div>
  }
}