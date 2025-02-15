
// In App.js in a new project

import MainRoutes from './src/Navigator/MainRoutes';
import { Provider } from 'react-redux';
import React from 'react';
import { Store } from "./src/Redux/Store";

export default function App() {
  return (
      <Provider store={Store}>
        <MainRoutes />
      </Provider>
  );
}
