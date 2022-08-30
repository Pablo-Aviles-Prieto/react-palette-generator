import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Main from './pages/Main.js';
import Help from './pages/Help';
import SavedPalettes from './components/Palettes/SavedPalettes';
import { PaletteProvider } from './store/PaletteProvider';
import { SavedPaletteProvider } from './store/SavedPalettesProvider';

const App = () => {
  return (
    <SavedPaletteProvider>
      <PaletteProvider>
      <wc-toast></wc-toast>
        <Layout>
          <Routes>
            <Route path='/' element={<Main />}>
              <Route index element={<SavedPalettes />} />
              <Route path='help' element={<Help />} />
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Layout>
      </PaletteProvider>
    </SavedPaletteProvider>
  );
};

export default App;
