import { configureStore } from '@reduxjs/toolkit'
import audioDataSlice from './slices/audioDataSlice'
import audioControlSlice from './slices/audioControlSlice'

export const store = configureStore({
  reducer: {
    audio: audioDataSlice,
    audioControl: audioControlSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
