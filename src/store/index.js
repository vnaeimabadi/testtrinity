import {configureStore} from '@reduxjs/toolkit';
import global from './reducers/global';

const store = configureStore({
  reducer: {
    globalState: global,
  },
});

export default store;
