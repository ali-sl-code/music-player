import { configureStore } from '@reduxjs/toolkit'
import audioDataSlice from './slices/audioDataSlice'
import audioControlSlice from './slices/audioControlSlice'
import audioListSlice from './slices/audioListSlice'

export const store = configureStore({
  reducer: {
    audio: audioDataSlice,
    audioControl: audioControlSlice,
    audioList: audioListSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
