import { configureStore } from '@reduxjs/toolkit'
import audioDataSlice from './slices/audioDataSlice'
import audioControlSlice from './slices/audioControlSlice'
import audioFileDataSlice from './slices/audioFileDataSlice'

export const store = configureStore({
  reducer: {
    audio: audioDataSlice,
    audioControl: audioControlSlice,
    audioFileData: audioFileDataSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
