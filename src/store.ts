import { configureStore } from '@reduxjs/toolkit'
import audioDataSlice from './slices/audioDataSlice'

export const store = configureStore({
  reducer: {
    audio: audioDataSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
