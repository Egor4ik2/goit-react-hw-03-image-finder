import React from 'react';
import styles from './Loader.module.css'; // импортируем CSS-модуль
import { BallTriangle } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <BallTriangle color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
