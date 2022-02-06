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
import { Grid } from '@mui/material'
import {
  WallPaper,
  Widget,
  CoverImage,
  TinyText,
  TimeIndicator,
  VolumeIndicator,
} from './player-components'

export default function MusicPlayerSlider({
  poster,
  title,
  artist,
  genre,
  audio,
  switchSong,
  loop,
  setLoop,
}) {
  const theme = useTheme()
  const [duration, setDuration] = React.useState(200) // seconds
  const [position, setPosition] = React.useState(0)
  const [paused, setPaused] = React.useState(true)
  const [volume, setVolume] = React.useState(30)
  const [faster, setFaster] = React.useState(false)
  const [pictureInPictureMode, setPictureInPictureMode] = React.useState(false)

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
        setDuration(Math.floor(e.target.duration))
        setPaused(false)
      })

      audio.current.addEventListener(
        'timeupdate',
        event => {
          setPosition(event.path[0].currentTime)
        },
        false,
      )
    }

    return () => {
      audio.current.removeEventListener('loadedmetadata', e => {
        setDuration(Math.floor(e.target.duration))
        setPaused(false)
      })

      audio.current.removeEventListener('timeupdate', event => {
        setPosition(event.path[0].currentTime)
      })
    }
  }, [])

  //* Handle music volume
  React.useEffect(() => {
    if (audio.current != null) audio.current.volume = volume / 100
  }, [volume])

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000'
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Widget>
        <Grid container alignItems="stretch" sx={{}} spacing={0}>
          <Grid item xs={12} md={6}>
          <CoverImage>
            {poster ? (
              <img
                alt="can't win - Chilling Sunday"
                src={poster}
               
              />
            ) : (
              <img
                alt="can't win - Chilling Sunday"
                src={DefaultImage}
                
              />
            )}
          </CoverImage>
          </Grid>
      
        <Grid  item xs={12} md={6}>
         
        
        <TimeIndicator
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          
          onChange={(_, value) => {
            setPosition(+value)
            //* Handle music currentTime
            audio.current.currentTime = +value
          }}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: '-2' }}
        >
          <TinyText>{formatDuration(Math.floor(position))}</TinyText>
          <TinyText>
            -{formatDuration(Math.floor(duration) - Math.floor(position))}
          </TinyText>
        </Stack>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mt: -1,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <IconButton
              onClick={() =>
                setFaster(preFaster => {
                  preFaster
                    ? (audio.current.playbackRate = 1)
                    : (audio.current.playbackRate = 2)
                  return !preFaster
                })
              }
              color={faster ? 'primary' : 'default'}
            >
              <SpeedIcon />
            </IconButton>
            <IconButton
              onClick={() => setLoop(preLoop => !preLoop)}
              color={loop ? 'primary' : 'default'}
            >
              <RepeatIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                showPictureInPictureWindow(!pictureInPictureMode)
                setPictureInPictureMode(preMode => !preMode)
              }}
              color={pictureInPictureMode ? 'primary' : 'default'}
            >
              <PictureInPictureAltIcon />
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
              aria-label={paused ? 'play' : 'pause'}
              onClick={() =>
                setPaused(prePaused => {
                  if (audio.current.src != '') {
                    //* Handle music play and pause
                    paused ? audio.current.play() : audio.current.pause()
                    return !prePaused
                  }
                  return prePaused
                })
              }
            >
              {paused ? (
                <PlayArrowRounded
                  sx={{ fontSize: '3rem' }}
                  htmlColor={mainIconColor}
                />
              ) : (
                <PauseRounded
                  sx={{ fontSize: '3rem' }}
                  htmlColor={mainIconColor}
                />
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
          </Box>
          <Stack
            // width='15vw'
            // position='absolute'
            // right='4px'
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ mb: 1, px: 1 }}
          >
            <VolumeDownRounded
              htmlColor={lightIconColor}
              // sx={{ position: 'absolute', right: 120 }}
            />
            <VolumeIndicator
              aria-label="Volume"
              value={volume}
              onChange={(e: any) => {
                setVolume(e.target.value)
              }}
            />
            <VolumeUpRounded
              htmlColor={lightIconColor}
              // sx={{ position: 'absolute', right: 3 }}
            />
          </Stack>
        </Stack>
        <Typography sx={{marginLeft:'10px'}} variant="caption" color="text.secondary" fontWeight={500}>
            {genre}
          </Typography>
          <Typography sx={{marginLeft:'10px'}} noWrap>
            <b>{title}</b>
          </Typography>
          <Typography sx={{marginLeft:'10px'}} noWrap letterSpacing={-0.25}>
            {artist}
          </Typography>
        </Grid>  </Grid>
      </Widget>
      <WallPaper />
    </Box>
  )
}
