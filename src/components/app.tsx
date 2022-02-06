import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { Box, Stack, List, ListItem, Button } from '@mui/material'
import MetaData from '../services/meta-data'
import getFileList from './../utils/getFileList'
import MusicPlayerSlider from './player'
// import { useAuth0 } from '@auth0/auth0-react'
// import Logout from 'components/logout'
import { InputFileContainer } from './player-components'
import default_image from './../img/default_image.jpg'
import { color } from '@mui/system'
import { MyBox , MyItem } from './player-components'

// import './app-style.css'

interface State {
  id: number | null,
  status: 'NEXT' | 'PREV' | null
}

interface Action {
  type: 'NEXT' | 'PREV',
  payload: any
}

export default function Application() {
  const audio = useRef(null)

  const [imageSrc, setImageSrc] = useState()
  const [title, setTitle] = useState()
  const [artist, setArtist] = useState()
  const [genre, setGenre] = useState()
  const [artwork, setArtwork] = useState()
  const [audioID, setAudioID] = useState(0)
  const [audioList, setAudioList] = useState([])
  const [audioSrc, setAudioSrc] = useState()
  const [metaData, setMetaData] = useState(null)
  const [files, setFiles] = useState({})
  const [loop, setLoop] = useState(false)

  // const { isAuthenticated } = useAuth0()

  function musicControlReducer(state: State, action: Action) {
    switch (action.type) {
      case 'NEXT':
        return { ...state, status: 'NEXT', id: audioID + 1 }
        break
      case 'PREV':
        return { ...state, status: 'PREV', id: audioID - 1 }
        break
      default:
        return state
    }
  }

  const [musicControl, musicControlDispatch] = useReducer(musicControlReducer, {
    id: null,
    status: null,
  })

  useEffect(() => {
    if (files) {
      if (musicControl.status == 'NEXT') {
        // @ts-ignore
        if (files.length - 1 != audioID) {
          metaDataHandler(audioID + 1)
        } else {
          metaDataHandler(0)
        }
      } else if (musicControl.status == 'PREV') {
        // @ts-ignore
        if (audioID != 0) {
          metaDataHandler(audioID - 1)
        } else {
          // @ts-ignore
          metaDataHandler(files.length - 1)
        }
      }
    }
  }, [musicControl])

  const fileHandler = useCallback(async e => {
    if (e.target.files.length) {
      setAudioList(getFileList(e))
      setFiles(e.target.files)
      setAudioID(0)
      setMetaData(new MetaData(e.target.files[0]))
    }
  }, [])

  const metaDataHandler = useCallback(
    id => {
      if (files) {
        setMetaData(new MetaData(files[id]))
        setAudioID(id)
      }
    },
    [files],
  )

  useEffect(() => {
    if (!metaData) return
    metaData.getImageSrc().then(setImageSrc)
    metaData.getInfo().then(console.log)
    metaData.getTitle().then(setTitle)
    metaData.getArtist().then(setArtist)
    metaData.getGenre().then(setGenre)
    metaData.getArtwork().then(setArtwork)
    metaData.getAudioSrc().then(setAudioSrc)
  }, [metaData])

  useEffect(() => {
    if (audio.current !== null) {
      audio.current.addEventListener('ended', () => {
        if (!loop) {
          // @ts-ignore
          if (files.length - 1 != audioID) {
            metaDataHandler(audioID + 1)
          }
        }
      })
    }

    return () => {
      audio.current.removeEventListener('ended', () => {
        if (!loop) {
          // @ts-ignore
          if (files.length - 1 != audioID) {
            metaDataHandler(audioID + 1)
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    if ('mediaSession' in navigator && title && artist && genre && artwork) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist,
        album: genre,
        artwork,
      })
    }
  }, [artwork])

  return (
    // isAuthenticated && (
    <Box sx={{ backdropFilter: 'blur(2px)!important'}}>
      <Stack
        style={{
          backgroundImage: `url('${imageSrc || default_image}')`,
          height: '300vh',
          backgroundRepeat: 'unset',
          display:'flex'
        }}
      >
        <audio src={audioSrc} ref={audio} loop={loop} autoPlay></audio>
<MyBox>
  
        <MusicPlayerSlider
          genre={genre}
          title={title}
          artist={artist}
          poster={imageSrc}
          audio={audio}
          switchSong={musicControlDispatch}
          loop={loop}
          setLoop={setLoop}
        />
        
        <List sx={{ marginTop: '20px', marginInline: '0' }}>
          {files ? (
            audioList.map(item => (
              <ListItem
                data-id={item.id}
                key={item.id}
                sx={{
                  '@media screen and (max-width:900px)': {
                    marginLeft:'4px',
                  },
                  color: 'rgb(128, 76, 9)',
                  borderTop: '1px solid gray',
                  fontSize: 'large',
                  width:'100%',
                  marginLeft:'-18%',
                  marginRight:'-60px',
                  
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
        </MyBox>
        <Box sx={{marginTop:'100px'}}>
          <InputFileContainer>
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
            {/* <Logout /> */}
          </InputFileContainer>
        </Box>

      </Stack>
    </Box>
    // )
  )
}
