import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { Box, Stack, List, ListItem, Button, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {
  setTitle,
  setArtist,
  setGenre,
  setImageSrc,
  setAudioSrc,
  setArtwork,
} from './../slices/audioDataSlice'
import {
  playingAudio as setAudioID,
  setAudioList,
} from './../slices/audioListSlice'
import MetaData from './../services/meta-data'
import getFileList from './../utils/getFileList'
import MusicPlayerSlider from './new-player'
// import { useAuth0 } from '@auth0/auth0-react'
// import Logout from 'components/logout'
import { InputFileContainer, PlayList, MyItem } from './player-components'
import AddIcon from '@mui/icons-material/Add'
import default_image from './../img/default_image.jpg'
import { RootState } from './../store'
import { color } from '@mui/system'

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
  const dispatch = useDispatch()

  const audioState = useSelector((state: RootState) => state.audio)
  // const [title, setTitle] = useState()
  // const [artist, setArtist] = useState()
  // const [genre, setGenre] = useState()
  // const [audioSrc, setAudioSrc] = useState()
  // const [artwork, setArtwork] = useState()
  // const [imageSrc, setImageSrc] = useState()

  const audioControlState = useSelector(
    (state: RootState) => state.audioControl,
  )
  // const [loop, setLoop] = useState(false)

  const [metaData, setMetaData] = useState(null)
  const [files, setFiles] = useState({})

  const audioListState = useSelector((state: RootState) => state.audioList)
  // const [audioID, setAudioID] = useState(0)
  // const [audioList, setAudioList] = useState([])

  // const { isAuthenticated } = useAuth0()

  function musicControlReducer(state: State, action: Action) {
    switch (action.type) {
      case 'NEXT':
        return {
          ...state,
          status: 'NEXT',
          id: audioListState.playingAudioId + 1,
        }
        break
      case 'PREV':
        return {
          ...state,
          status: 'PREV',
          id: audioListState.playingAudioId - 1,
        }
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
        if (files.length - 1 != audioListState.playingAudioId) {
          metaDataHandler(audioListState.playingAudioId + 1)
        } else {
          metaDataHandler(0)
        }
      } else if (musicControl.status == 'PREV') {
        // @ts-ignore
        if (audioListState.playingAudioId != 0) {
          metaDataHandler(audioListState.playingAudioId - 1)
        } else {
          // @ts-ignore
          metaDataHandler(files.length - 1)
        }
      }
    }
  }, [musicControl])

  const fileHandler = useCallback(async e => {
    if (e.target.files.length) {
      // @ts-ignore
      dispatch(setAudioList(getFileList(e)))
      setFiles(e.target.files)
      dispatch(setAudioID(0))
      setMetaData(new MetaData(e.target.files[0]))
    }
  }, [])

  const metaDataHandler = useCallback(
    id => {
      if (files) {
        setMetaData(new MetaData(files[id]))
        dispatch(setAudioID(id))
      }
    },
    [files],
  )

  useEffect(() => {
    if (!metaData) return
    // metaData.getTitle().then(setTitle)
    // metaData.getArtist().then(setArtist)
    // metaData.getGenre().then(setGenre)
    // metaData.getAudioSrc().then(setAudioSrc)
    // metaData.getImageSrc().then(setImageSrc)
    // metaData.getArtwork().then(setArtwork)
    metaData.getTitle().then(artist => dispatch(setArtist(artist)))
    metaData.getArtist().then(title => dispatch(setTitle(title)))
    metaData.getGenre().then(gener => dispatch(setGenre(gener)))
    metaData.getAudioSrc().then(audioSrc => dispatch(setAudioSrc(audioSrc)))
    metaData.getImageSrc().then(imageSrc => dispatch(setImageSrc(imageSrc)))
    metaData.getArtwork().then(artwork => dispatch(setArtwork(artwork)))
    metaData.getInfo().then(console.log)
  }, [metaData])

  useEffect(() => {
    if (audio.current !== null) {
      audio.current.addEventListener('ended', () => {
        if (!audioControlState.loop) {
          // @ts-ignore
          if (files.length - 1 != audioListState.playingAudioId) {
            metaDataHandler(audioListState.playingAudioId + 1)
          }
        }
      })
    }

    return () => {
      audio.current.removeEventListener('ended', () => {
        if (!audioControlState.loop) {
          // @ts-ignore
          if (files.length - 1 != audioListState.playingAudioId) {
            metaDataHandler(audioListState.playingAudioId + 1)
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    if (
      'mediaSession' in navigator &&
      audioState.title &&
      audioState.artist &&
      audioState.genre &&
      audioState.artwork
    ) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: audioState.title,
        artist: audioState.artist,
        album: audioState.genre,
        artwork: audioState.artwork,
      })
    }
  }, [audioState.artwork])

  return (
    // isAuthenticated && (
    <Box sx={{ backdropFilter: 'blur(2px)!important' }}>
      <Stack
        style={{
          height: '100vh',
          display: 'flex',
          backgroundImage: `url('${audioState.imageSrc || default_image}')`,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <audio
          src={audioState.audioSrc}
          ref={audio}
          loop={audioControlState.loop}
          autoPlay
        ></audio>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <MusicPlayerSlider audio={audio} switchSong={musicControlDispatch} />

          <PlayList>
            {files ? (
              audioListState.audioList.map(item => (
                <ListItem
                  data-id={item.id}
                  key={item.id}
                  sx={{
                    color: 'rgb(128, 76, 9)',
                    borderTop: '1px solid gray',
                    fontSize: 'large',
                    width: '100%',
                    display: 'block'
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
          </PlayList>
        </Grid>
        <Box sx={{ marginTop: '100px' }}>
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
              <AddIcon />
            </label>
            {/* <Logout /> */}
          </InputFileContainer>
        </Box>
      </Stack>
    </Box>
    // )
  )
}
