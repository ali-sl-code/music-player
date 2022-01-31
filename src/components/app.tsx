import React, { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'
import MetaData from '../services/meta-data'
import MusicPlayerSlider from './player'
import './app-style.css'
export default function Application() {
  const [imageSrc, setImageSrc] = useState()
  const [title, setTitle] = useState()
  const [artist, setArtist] = useState()
  const [genre, setGenre] = useState()
  const [audioSrc, setAudioSrc] = useState()

  const audio = React.useRef(null)

  const [metaData, setMetaData] = useState(null)
  const handler = async e => {
    const the_return = document.querySelector('.file-return')
    the_return.innerHTML = e.target.value
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
  useEffect(() => {
    document.querySelector('html').classList.add('js')
  }, [])
  return (
    <Stack>
      <audio src={audioSrc} ref={audio} autoPlay></audio>
      <MusicPlayerSlider
        genre={genre}
        title={title}
        artist={artist}
        poster={imageSrc}
        audio={audio}
      />
      <Box>
        <div className="container">
          <div className="input-file-container">
            <input
              className="input-file"
              id="my-file"
              type="file"
              onChange={handler}
            />
            <label htmlFor="my-file" className="input-file-trigger">
              Select a file...
            </label>
          </div>
          <p className="file-return"></p>
        </div>
        {/* <input type="file" onChange={handler} /> */}
      </Box>
    </Stack>
  )
}
