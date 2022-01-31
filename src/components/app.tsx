import React, { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'
import MetaData from '../services/meta-data'
import getFileList from './../utils/getFileList'
import MusicPlayerSlider from './player'
import './app-style.css'

export default function Application() {
  const [imageSrc, setImageSrc] = useState()
  const [title, setTitle] = useState()
  const [artist, setArtist] = useState()
  const [genre, setGenre] = useState()
  const [audioID, setAudioID] = useState(0)
  const [audioList, setAudioList] = useState([])
  const [audioSrc, setAudioSrc] = useState()

  const audio = React.useRef(null)

  const [metaData, setMetaData] = useState(null)
  const handler = async e => {
    if (e.target.files.length) {
      setAudioList(getFileList(e))
      setMetaData(new MetaData(e.target.files[audioID]))
    }
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
      {/* <Box sx={{ position: 'absolute', zIndex: 2 }}>
        <input type="file" onChange={handler} accept="audio/*" multiple />
      </Box> */}
      <MusicPlayerSlider
        genre={genre}
        title={title}
        artist={artist}
        poster={imageSrc}
        audio={audio}
      />
      <Box>
        <div id="inputFileContainer">
          <input
            className="input-file"
            id="musicFile"
            type="file"
            onChange={handler}
            accept="audio/*"
            multiple
          />
          <label htmlFor="musicFile" className="input-file-trigger">
            Select a file...
          </label>
        </div>
        {/* <input type="file" onChange={handler} /> */}
      </Box>
    </Stack>
  )
}
