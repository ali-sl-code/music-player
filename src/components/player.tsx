import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDuration } from '../slices/audioDataSlice'
import { setPosition, setPaused } from '../slices/audioControlSlice'
import { AppDispatch, RootState } from '../store'
import Cover from './player-sub-component/cover-info'
import TimeIndicator from './player-sub-component/time-indicator'
import Buttons from './player-sub-component/buttons'
import Volume from './player-sub-component/volume'
import PictureInPicture from './player-sub-component/picture-in-picture'
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'

export default function MusicPlayer({ audio, switchSong }) {

  const dispatch = useDispatch<AppDispatch>()
  // const [duration, setDuration] = React.useState(200) // seconds

  const audioControlState = useSelector(
    (state: RootState) => state.audioControl,
  )
  // const [position, setPosition] = React.useState(0)
  // const [paused, setPaused] = React.useState(true)
  // const [volume, setVolume] = React.useState(30)
  // const [faster, setFaster] = React.useState(false)
  // const [pictureInPictureMode, setPictureInPictureMode] = React.useState(false)

  //* Duration display

  //* Set music duration
  React.useEffect(() => {
    if (audio.current !== null) {
      audio.current.addEventListener('loadedmetadata', e => {
        dispatch(setDuration(Math.floor(e.target.duration)))
        // setDuration(Math.floor(e.target.duration))
        dispatch(setPaused(false))
      })

      audio.current.addEventListener(
        'timeupdate',
        event => {
          dispatch(setPosition(event.path[0].currentTime))
        },
        false,
      )
    }

    // return () => {
    //   audio.current.removeEventListener('loadedmetadata', e => {
    //     dispatch(setDuration(Math.floor(e.target.duration)))
    //     // setDuration(Math.floor(e.target.duration))
    //     dispatch(setPaused(false))
    //   })

    //   audio.current.removeEventListener('timeupdate', event => {
    //     dispatch(setPosition(event.path[0].currentTime))
    //   })
    // }
  }, [])

  //* Handle music volume
  React.useEffect(() => {
    if (audio.current != null)
      audio.current.volume = audioControlState.volume / 100
  }, [audioControlState.volume])

  return (
    <Stack
      alignItems="center"
      sx={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '50px 0',
        boxShadow: '0px 5px 15px 7px rgba(0,0,0,0.15)',
      }}
    >
      {/*cover and info of song */}
      <Cover />
      {/*time indicator */}
      <TimeIndicator audio={audio} />
      {/*buttons */}
      <Buttons audio={audio} switchSong={switchSong} />
      {/* volume*/}
      <Volume />
      <PictureInPicture />
    </Stack>
  )
}
