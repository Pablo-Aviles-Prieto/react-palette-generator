import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Main from './pages/Main.js';
import Help from './pages/Help';
import SavedPalettes from './components/Palettes/SavedPalettes';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route index element={<SavedPalettes />} />
          <Route path='help' element={<Help />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
