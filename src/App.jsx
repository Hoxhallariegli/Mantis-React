import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store'; // Make sure you're exporting this in store/index.js
import store from './store';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </ScrollTop>
    </ThemeCustomization>
  );
}