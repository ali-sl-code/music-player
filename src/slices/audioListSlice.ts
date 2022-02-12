import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AudioState {
  playingAudioId: number | null,
  audioList: [
    {
      id: number | null,
      name: string | null,
      imgSrc: string | null,
      artist: string | null,
      duration: string | null,
    },
  ]
}

export const initialState: AudioState = {
  playingAudioId: 0,
  audioList: [
    {
      id: null,
      name: null,
      imgSrc: null,
      artist: null,
      duration: null,
    },
  ],
}

export const audioList = createSlice({
  name: 'audioList',
  initialState,
  reducers: {
    playingAudio: (
      state,
      action: PayloadAction<AudioState['playingAudioId']>,
    ) => {
      state.playingAudioId = action.payload
    },
    setAudioList: (state, action: PayloadAction<AudioState['audioList']>) => {
      state.audioList = action.payload
    },
  },
})

export const { playingAudio, setAudioList } = audioList.actions

export default audioList.reducer
