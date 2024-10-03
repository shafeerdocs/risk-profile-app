import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

export type RootState = ReturnType<typeof reducer>; // This will provide the root state type

export default store;
