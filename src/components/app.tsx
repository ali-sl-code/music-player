import { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Stack, List, ListItem } from '@mui/material'
import MetaData from '../services/meta-data'
import getFileList from './../utils/getFileList'
import MusicPlayerSlider from './player'
// import { useAuth0 } from '@auth0/auth0-react'
import Logout from 'components/logout'

import './app-style.css'

import IMG1 from '../img/c870x524.jpg'
export default function Application() {
  const [imageSrc, setImageSrc] = useState('')
  const [title, setTitle] = useState()
  const [artist, setArtist] = useState()
  const [genre, setGenre] = useState()
  // const [audioID, setAudioID] = useState(0)
  const [audioList, setAudioList] = useState([])
  const [audioSrc, setAudioSrc] = useState()
  const [metaData, setMetaData] = useState(null)
  const [files, setFiles] = useState({})
  // const { isAuthenticated } = useAuth0()
  const audio = useRef(null)

  const fileHandler = useCallback(async e => {
    if (e.target.files.length) {
      setAudioList(getFileList(e))
      setFiles(e.target.files)
      setMetaData(new MetaData(e.target.files[0]))
    }
  }, [])

  const metaDataHandler = useCallback(
    id => {
      if (files) {
        setMetaData(new MetaData(files[id]))
      }
    },
    [files],
  )
  console.log(imageSrc),
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
    //isAuthenticated&&
    <Box sx={{ backdropFilter: 'blur(2px)!important' }}>
      <Stack
        style={{
          backgroundImage: `url('${imageSrc ? imageSrc : IMG1}')`,
          height: '200vh',
          backgroundRepeat: 'unset',
        }}
      >
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
              onChange={fileHandler}
              accept="audio/*"
              multiple
            />
            <label htmlFor="musicFile" className="input-file-trigger">
              Select a file...
            </label>
            <Logout />
          </div>
        </Box>

        <List sx={{ marginTop: '20px', marginInline: '5px' }}>
          {files ? (
            audioList.map(item => (
              <ListItem
                data-id={item.id}
                key={item.id}
                sx={{
                  color: 'wheat',
                  borderTop: '1px solid gray',
                  fontSize: 'large',
                }}
                onClick={(e: any) => {
                  metaDataHandler(e.target.getAttribute('data-id'))
                }}
                button
              >
                {item.name}
              </ListItem>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </List>
      </Stack>
    </Box>
  )
}
