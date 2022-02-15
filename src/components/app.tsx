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
import MusicPlayerSlider from './player'
// import { useAuth0 } from '@auth0/auth0-react'
// import Logout from 'components/logout'
import { InputFileContainer, PlayList, MyItem } from './player-components'
import AddIcon from '@mui/icons-material/Add'
import default_image from './../img/default_image.jpg'
import { RootState } from './../store'
import { color } from '@mui/system'

import './app-style.css'

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

  // useEffect(() => {
  //   console.log(`🟢Loged 👉 audioListState.playingAudioId`, audioListState.playingAudioId)
  //   if (!audioControlState.loop) {
  //     audio.current.addEventListener('ended', () => {
  //       if (files && Object.keys(files).length !== 0) {
  //         if (audio.current !== null) {
  //           // @ts-ignore
  //           if (files.length - 1 != audioListState.playingAudioId) {
  //             console.log("audioListState.playingAudioId ended", audioListState.playingAudioId)
  //             console.log("audioListState.playingAudioId + 1 ended", audioListState.playingAudioId + 1)
  //             metaDataHandler(audioListState.playingAudioId + 1)
  //           }
  //         }
  //       }
  //     })
  //   }

  //   return () => {
  //     audio.current.removeEventListener('ended', () => {
  //       if (files && Object.keys(files).length !== 0) {
  //         if (audio.current !== null) {
  //           // @ts-ignore
  //           if (files.length - 1 != audioListState.playingAudioId) {
  //             metaDataHandler(audioListState.playingAudioId + 1)
  //           }
  //         }
  //       }
  //     })
  //   }
  // }, [files])

  const handleEnded = useCallback(
    playingAudioId => {
      if (!audioControlState.loop) {
        if (files && Object.keys(files).length !== 0) {
          // @ts-ignore
          if (files.length - 1 != playingAudioId) {
            console.log('audioListState.playingAudioId ended', playingAudioId)
            console.log(
              'audioListState.playingAudioId + 1 ended',
              playingAudioId + 1,
            )
            metaDataHandler(playingAudioId + 1)
          }
        }
      }
    },
    [files],
  )

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
      getFileList(e.target.files).then(fileListInfo => {
        // @ts-ignore
        dispatch(setAudioList(fileListInfo))
      })
      setFiles(e.target.files)
      dispatch(setAudioID(0))
      setMetaData(new MetaData(e.target.files[0]))
    }
  }, [])

  const metaDataHandler = useCallback(
    (id: number) => {
      if (files) {
        console.log(`🟢Loged 👉 metaDataHandler 👉 id`, Number(id))
        console.log(`🟢Loged 👉 metaDataHandler 👉 id`, typeof Number(id))
        dispatch(setAudioID(Number(id)))
        setMetaData(new MetaData(files[Number(id)]))
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
    metaData.getTitle().then(title => dispatch(setTitle(title)))
    metaData.getArtist().then(artist => dispatch(setArtist(artist)))
    metaData.getGenre().then(gener => dispatch(setGenre(gener)))
    metaData.getAudioSrc().then(audioSrc => dispatch(setAudioSrc(audioSrc)))
    metaData.getImageSrc().then(imageSrc => dispatch(setImageSrc(imageSrc)))
    metaData.getArtwork().then(artwork => dispatch(setArtwork(artwork)))
    metaData.getInfo().then(console.log)
  }, [metaData])

  useEffect(() => {
    if (
      'mediaSession' in navigator &&
      audioState.title &&
      audioState.artist &&
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
          backgroundColor: 'rgb(252, 182, 241)',
        }}
      >
        <audio
          src={audioState.audioSrc}
          ref={audio}
          loop={audioControlState.loop}
          onEnded={() => {
            handleEnded(audioListState.playingAudioId)
          }}
          autoPlay
        ></audio>

        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{ height: '100%' }}
        >
          <MusicPlayerSlider audio={audio} switchSong={musicControlDispatch} />
          <PlayList>
            {files ? (
              audioListState.audioList.map(
                item =>
                  item.name !== null && (
                    <ListItem
                      data-id={item.id}
                      key={item.id}
                      sx={{
                        color: 'black',
                        backgroundColor: 'white',
                        borderTop: '1px solid gray',
                        fontSize: 'small',
                        width: '90%',
                        height: '50px',
                        margin: '0 auto',
                        position: 'relative',
                        //  marginLeft:'17px',
                        //  marginRight:'4px',
                        marginTop: '10px',
                        border: 'none',
                        borderRadius: '10px',
                        '&:hover': {
                          backgroundColor: 'rgb(224, 148, 212)',
                        },
                        '&:focus': {
                          backgroundColor: 'rgb(201, 187, 201)',
                        },
                      }}
                      onClick={(e: any) => {
                        metaDataHandler(e.target.getAttribute('data-id'))
                      }}
                      button
                    >
                      <div>
                        <Stack
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            alignItems: 'center',
                            // gap:'30px'
                          }}
                        >
                          <h4 className="firststyle">{item.id + 1}</h4>
                          <div className="s1">
                            {item.imgSrc !== null && (
                              <img
                                src={item.imgSrc}
                                alt="imgSrc"
                                width="30px"
                                height="30px"
                                style={{ borderRadius: '5px' }}
                              />
                            )}
                          </div>
                          <h4 className="s2">{item.name}</h4>
                          <h4 className="s3">{item.artist}</h4>
                          <h4 className="s4">{item.duration}</h4>
                        </Stack>
                      </div>
                    </ListItem>
                  ),
              )
            ) : (
              <p>Loading...</p>
            )}
          </PlayList>
        </Grid>
        <Box>
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
              <AddIcon sx={{ color: '#000' }} />
            </label>
            {/* <Logout /> */}
          </InputFileContainer>
        </Box>
      </Stack>
    </Box>
    // )
  )
}
