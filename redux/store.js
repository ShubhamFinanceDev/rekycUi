import { combineReducers, configureStore } from '@reduxjs/toolkit'

import loaderSlice from './slice/loader.slice'
import authSlice from './slice/auth.slice'

const rootReducer = combineReducers({
    loaderSlice,
    authSlice,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store