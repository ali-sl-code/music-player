import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AudioState {
    loop: boolean,
    position: number,
    paused: boolean,
    volume: number,
    faster: boolean,
    pictureInPictureMode: boolean
}

export const initialState: AudioState = {
    loop: false,
    position: 0,
    paused: true,
    volume: 30,
    faster: false,
    pictureInPictureMode: false
}

export const audioData = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setLoop: (state, action: PayloadAction<AudioState['loop']>) => {
      state.loop = action.payload
    },
    setPosition: (state, action: PayloadAction<AudioState['position']>) => {
      state.position = action.payload
    },
    setPaused: (state, action: PayloadAction<AudioState['paused']>) => {
      state.paused = action.payload
    },
    setVolume: (state, action: PayloadAction<AudioState['volume']>) => {
      state.volume = action.payload
    },
    setFaster: (state, action: PayloadAction<AudioState['faster']>) => {
      state.faster = action.payload
    },
    setPictureInPictureMode: (state, action: PayloadAction<AudioState['pictureInPictureMode']>) => {
      state.pictureInPictureMode = action.payload
    },
  },
})

export const {
  setLoop,
  setPosition,
  setPaused,
  setVolume,
  setFaster,
  setPictureInPictureMode,
} = audioData.actions

export default audioData.reducer
