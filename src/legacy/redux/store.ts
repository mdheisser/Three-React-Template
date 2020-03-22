import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: {actionsBlacklist: ['RAYCAST_SET', 'RAYCAST_UNSET', 'COMMAND']}
})

export default store