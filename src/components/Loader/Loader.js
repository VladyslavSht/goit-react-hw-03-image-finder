import s from './Loader.module.css';
import { Puff } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={s.container}>
      <Puff color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
