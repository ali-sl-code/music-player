import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import FastForwardRounded from '@mui/icons-material/FastForwardRounded'
import FastRewindRounded from '@mui/icons-material/FastRewindRounded'
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded'
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded'
import SpeedIcon from '@mui/icons-material/Speed'
import RepeatIcon from '@mui/icons-material/Repeat'
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt'
import DefaultImage from '../img/default_image.jpg'
import showPictureInPictureWindow from '../utils/pictureInPicture'

import { TinyText, TimeIndicator, VolumeIndicator } from './player-components'
import { useSelector, useDispatch } from 'react-redux'
import { setDuration } from './../slices/audioDataSlice'
import {
  setLoop,
  setPosition,
  setPaused,
  setVolume,
  setFaster,
  setPictureInPictureMode,
} from './../slices/audioControlSlice'
import { RootState } from './../store'
import { Paper } from '@mui/material'

export default function MusicPlayer({ audio, switchSong }) {
  const theme = useTheme()

  const dispatch = useDispatch()
  const audioState = useSelector((state: RootState) => state.audio)
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
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60)
    const secondLeft = value - minute * 60
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`
  }

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

    return () => {
      audio.current.removeEventListener('loadedmetadata', e => {
        dispatch(setDuration(Math.floor(e.target.duration)))
        // setDuration(Math.floor(e.target.duration))
        dispatch(setPaused(false))
      })

      audio.current.removeEventListener('timeupdate', event => {
        dispatch(setPosition(event.path[0].currentTime))
      })
    }
  }, [])

  //* Handle music volume
  React.useEffect(() => {
    if (audio.current != null)
      audio.current.volume = audioControlState.volume / 100
  }, [audioControlState.volume])

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000'
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
  return (
    <Stack
      alignItems="center"
      sx={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      {/*cover and info of song */}
      <Stack alignItems="center" sx={{ width: '40%' }}>
        <Box>
          {audioState.imageSrc ? (
            <img
              alt="can't win - Chilling Sunday"
              src={audioState.imageSrc}
              width="100%"
              style={{
                borderRadius: '30px',
                boxShadow: '0px 5px 20px 3px rgba(0,0,0,0.28)',
              }}
            />
          ) : (
            <img
              alt="can't win - Chilling Sunday"
              src={DefaultImage}
              width="100%"
              style={{
                borderRadius: '30px',
                boxShadow: '0px 5px 20px 3px rgba(0,0,0,0.28)',
              }}
            />
          )}
        </Box>
        <Box {...(audioState && {mt:3})}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {audioState.genre}
          </Typography>
          <Typography>
            <b>{audioState.title}</b>
          </Typography>
          <Typography>{audioState.artist}</Typography>
        </Box>
      </Stack>
      {/*time indicator */}
      <Stack alignItems="center" sx={{ width: '80%'}} {...(audioState && {mt:3})}>
        <TimeIndicator
          aria-label="time-indicator"
          size="small"
          value={audioControlState.position}
          min={0}
          step={1}
          max={audioState.duration}
          onChange={(_, value) => {
            dispatch(setPosition(+value))
            //* Handle music currentTime
            audio.current.currentTime = +value
          }}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <TinyText>
            {formatDuration(Math.floor(audioControlState.position))}
          </TinyText>
          <TinyText>
            -
            {formatDuration(
              Math.floor(audioState.duration) -
                Math.floor(audioControlState.position),
            )}
          </TinyText>
        </Stack>
      </Stack>
      {/*buttons */}
      <Stack direction="row" justifyContent="space-between">
        <IconButton
          onClick={() => {
            dispatch(setFaster(!audioControlState.faster))
            audioControlState.faster
              ? (audio.current.playbackRate = 1)
              : (audio.current.playbackRate = 2)
          }}
          color={audioControlState.faster ? 'primary' : 'default'}
        >
          <SpeedIcon />
        </IconButton>
        <IconButton
          aria-label="previous song"
          onClick={() => {
            switchSong({ type: 'PREV' })
          }}
        >
          <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
        </IconButton>
        <IconButton
          aria-label={audioControlState.paused ? 'play' : 'pause'}
          onClick={() => {
            if (audio.current.src != '') {
              dispatch(setPaused(!audioControlState.paused))
              //* Handle music play and pause
              audioControlState.paused
                ? audio.current.play()
                : audio.current.pause()
            }
          }}
          sx={{ boxShadow: '0px 5px 20px 3px rgba(0,0,0,0.28)' }}
        >
          {audioControlState.paused ? (
            <PlayArrowRounded
              sx={{ fontSize: '3rem' }}
              htmlColor={mainIconColor}
            />
          ) : (
            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
          )}
        </IconButton>
        <IconButton
          aria-label="next song"
          onClick={() => {
            switchSong({ type: 'NEXT' })
          }}
        >
          <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(setLoop(!audioControlState.loop))
          }}
          color={audioControlState.loop ? 'primary' : 'default'}
        >
          <RepeatIcon />
        </IconButton>
        
      </Stack>
      {/* volume*/}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={3}
        spacing={2}
      >
        <VolumeDownRounded
          htmlColor={lightIconColor}
          // sx={{ position: 'absolute', right: 120 }}
        />
        <VolumeIndicator
          aria-label="Volume"
          value={audioControlState.volume}
          onChange={(e: any) => {
            dispatch(setVolume(e.target.value))
          }}
        />
        <VolumeUpRounded
          htmlColor={lightIconColor}
        />
        <IconButton
          onClick={() => {
            showPictureInPictureWindow(!audioControlState.pictureInPictureMode)
            dispatch(
              setPictureInPictureMode(!audioControlState.pictureInPictureMode),
            )
          }}
          color={audioControlState.pictureInPictureMode ? 'primary' : 'default'}
          
        >
          <PictureInPictureAltIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}