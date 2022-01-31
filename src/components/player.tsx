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
import IMG1 from '../img/c870x524.jpg'
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
}) {
  const theme = useTheme()
  const [duration, setDuration] = React.useState(0) // seconds
  const [position, setPosition] = React.useState(0)
  const [paused, setPaused] = React.useState(true)
  const [volume, setVolume] = React.useState(30)
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60)
    const secondLeft = value - minute * 60
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`
  }

  //* Set music duration
  React.useEffect(() => {
    if (audio.current != null) {
      audio.current.addEventListener('loadedmetadata', e => {
        setDuration(e.target.duration)
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
        setDuration(e.target.duration)
        setPaused(true)
      })

      audio.current.removeEventListener('timeupdate', event => {
        setPosition(event.path[0].currentTime)
      })
    }
  }, [audio.current])

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
        <Stack direction="row" alignItems="center">
          <CoverImage>
            {poster ? (
              <img
                alt="can't win - Chilling Sunday"
                src={poster}
                height={400}
              />
            ) : (
              <img alt="can't win - Chilling Sunday" src={IMG1} height={400} />
            )}
          </CoverImage>
        </Stack>
        <Box sx={{ ml: 1.5, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {genre}
          </Typography>
          <Typography noWrap>
            <b>{title}</b>
          </Typography>
          <Typography noWrap letterSpacing={-0.25}>
            {artist}
          </Typography>
        </Box>
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
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song">
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
            {!paused ? (
              <PauseRounded
              sx={{ fontSize: '3rem' }}
              htmlColor={mainIconColor}
            />
            ) : (
              <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
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
              sx={{ position: 'absolute', right: 120 }}
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
              sx={{ position: 'absolute', right: 3 }}
            />
          </Stack>
        </Stack>
      </Widget>
      <WallPaper />
    </Box>
  )
}
