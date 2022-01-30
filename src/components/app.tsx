import React, { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'
import MetaData from '../services/meta-data'
import MusicPlayerSlider from './player'

export default function Application() {
  const [imageSrc, setImageSrc] = useState()
  const [title, setTitle] = useState()
  const [artist, setArtist] = useState()
  const [genre, setGenre] = useState()
  const [audioSrc, setAudioSrc] = useState()

  const audio = React.useRef(null)

  const [metaData, setMetaData] = useState(null)
  const handler = async e => {
    const blob = e.target.files[0]
    setMetaData(new MetaData(blob))
  }

  useEffect(() => {
    if (!metaData) return
    metaData.getImageSrc().then(setImageSrc)
    metaData.getInfo().then(console.log)
    metaData.getTitle().then(setTitle)
    metaData.getArtist().then(setArtist)
    metaData.getGenre().then(setGenre)
    metaData.getAudioSrc().then(setAudioSrc)
  }, [metaData])

  return (
    <Stack>
      <audio src={audioSrc} ref={audio} autoPlay></audio>
      <Box sx={{ position: 'absolute', zIndex: 2 }}>
        <input type="file" onChange={handler} />
      </Box>
      <MusicPlayerSlider
        genre={genre}
        title={title}
        artist={artist}
        poster={imageSrc}
        audio={audio}
      />
    </Stack>
  )
}
