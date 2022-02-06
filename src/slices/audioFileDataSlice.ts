import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AudioState {
  metaData: any
  files: File | null
}

export const initialState: AudioState = {
  metaData: '',
  files: null,
}

export const audioData = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setMetaData: (state, action: PayloadAction<AudioState['metaData']>) => {
      state.metaData = action.payload
    },
    setFiles: (state, action: PayloadAction<AudioState['files']>) => {
      state.files = action.payload
    },
  },
})

export const { setMetaData, setFiles } = audioData.actions

export default audioData.reducer
