import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styles from './Main.module.css';
import ColorPicker from '../components/Pickers/ColorPicker';
import { Help } from '../components/Icons';

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const changePageHandler = () => {
    if (location.pathname === '/help') {
      return navigate('/');
    }
    navigate('/help');
  };

  return (
    <>
      <div onClick={changePageHandler} className={styles.helper}>
        <Help width={50} />
      </div>
      <ColorPicker />
      <Outlet />
    </>
  );
};

export default Main;
