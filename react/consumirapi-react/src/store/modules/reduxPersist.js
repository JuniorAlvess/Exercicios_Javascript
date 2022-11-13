import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'TRACT-BASE',
      storage,
      whitelist: ['example'], // O que será salvo
    },
    reducers
  );

  return persistedReducers;
};
