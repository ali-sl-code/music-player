import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import FastForwardRounded from '@mui/icons-material/FastForwardRounded'
import FastRewindRounded from '@mui/icons-material/FastRewindRounded'
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded'
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded'
import IMG1 from '../img/c870x524.jpg'
import { WallPaper, Widget, CoverImage, TinyText } from './player-components'

export default function MusicPlayerSlider({
  poster,
  title,
  artist,
  genre,
  audio,
}) {
  const theme = useTheme()
  const [duration, setDuration] = React.useState(200) // seconds
  const [position, setPosition] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [volume, setVolume] = React.useState(30)
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60)
    const secondLeft = value - minute * 60
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`
  }

  //* Set music duration
  React.useEffect(() => {
    if (audio.current != null)
      audio.current.addEventListener('loadedmetadata', e => {
        console.log(e.target.duration)
        setDuration(Math.floor(e.target.duration))
      })

    return () => {
      audio.current.removeEventListener('loadedmetadata', () => {
        console.log('loadedmetadata removed')
      })
    }
  }, [audio.current])

  //* Handle music volume
  React.useEffect(() => {
    if (audio.current != null) audio.current.volume = volume / 100
  }, [volume])

  //* Handle music current time
  React.useEffect(() => {
    if (audio.current != null) audio.current.currentTime = position
  }, [position])

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000'
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        </Box>
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
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(+value)}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
                if (audio.current != null)
                  //* Handle music play and pause
                  paused ? audio.current.play() : audio.current.pause()
                return !prePaused
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
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <Stack
            // width='15vw'
            // position='absolute'
            // right='4px'
            spacing={2}
            direction="row"
            sx={{ mb: 1, px: 1 }}
            alignItems="center"
          >
            <VolumeDownRounded
              htmlColor={lightIconColor}
              sx={{ position: 'absolute', right: 120 }}
            />
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={(e: any) => {
                setVolume(e.target.value)
              }}
              sx={{
                width: 90,
                position: 'absolute',
                right: 30,
                color:
                  theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                '& .MuiSlider-track': {
                  border: 'none',
                },
                '& .MuiSlider-thumb': {
                  width: 24,
                  height: 24,
                  backgroundColor: '#fff',
                  '&:before': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible, &.Mui-active': {
                    boxShadow: 'none',
                  },
                },
              }}
            />
            <VolumeUpRounded
              htmlColor={lightIconColor}
              sx={{ position: 'absolute', right: 3 }}
            />
          </Stack>
        </Box>
      </Widget>
      <WallPaper />
    </Box>
  )
}
