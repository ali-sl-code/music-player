import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AudioState {
  title: string,
  artist: string,
  genre: string,
  artwork: [
    {
      src: string,
      sizes: string,
      type: string,
    },
  ],
  imageSrc: string,
  audioSrc: string,
  duration: number
}

export const initialState: AudioState = {
  title: '',
  artist: '',
  genre: '',
  artwork: [
    {
      src: '',
      sizes: '',
      type: '',
    },
  ],
  imageSrc: '',
  audioSrc: '',
  duration: 200
}

export const audioData = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setDuration: (state, action: PayloadAction<AudioState['duration']>) => {
      state.duration = action.payload
    },
    setTitle: (state, action: PayloadAction<AudioState['title']>) => {
      state.title = action.payload
    },
    setArtist: (state, action: PayloadAction<AudioState['artist']>) => {
      state.artist = action.payload
    },
    setGenre: (state, action: PayloadAction<AudioState['genre']>) => {
      state.genre = action.payload
    },
    setImageSrc: (state, action: PayloadAction<AudioState['imageSrc']>) => {
      state.imageSrc = action.payload
    },
    setAudioSrc: (state, action: PayloadAction<AudioState['audioSrc']>) => {
      state.audioSrc = action.payload
    },
    setArtwork: (state, action: PayloadAction<AudioState['artwork']>) => {
      state.artwork = action.payload
    },
  },
})

export const {
  setTitle,
  setArtist,
  setGenre,
  setImageSrc,
  setAudioSrc,
  setArtwork,
  setDuration
} = audioData.actions

export default audioData.reducer
