import classes from './MainNavigation.module.css';
import { Palette } from '../Icons/index.js';

const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <div>
        <Palette height='50' width='50' color='#fff' bg='none' />
      </div>
      <h2>Color palette generator</h2>
    </header>
  );
};

export default MainNavigation;
