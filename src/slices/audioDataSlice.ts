import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AudioState {
  title: string | null,
  artist: string | null,
  genre: string | null,
  artwork: [
    {
      src: string | null,
      sizes: string | null,
      type: string | null,
    },
  ],
  imageSrc: string | null,
  audioSrc: string | null,
  duration: number | null,
}

export const initialState: AudioState = {
  title: null,
  artist: null,
  genre: null,
  artwork: [
    {
      src: null,
      sizes: null,
      type: null,
    },
  ],
  imageSrc: null,
  audioSrc: null,
  duration: 200,
}

export const audioData = createSlice({
  name: 'audioData',
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
  setDuration,
} = audioData.actions

export default audioData.reducer
