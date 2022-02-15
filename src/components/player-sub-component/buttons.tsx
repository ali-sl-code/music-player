import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { setFaster, setLoop, setPaused } from 'slices/audioControlSlice'
import { setPictureInPictureMode } from 'slices/audioControlSlice'

import showPictureInPictureWindow from '../../utils/pictureInPicture'

import Stack from '@mui/material/Stack'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import FastForwardRounded from '@mui/icons-material/FastForwardRounded'
import FastRewindRounded from '@mui/icons-material/FastRewindRounded'
import SpeedIcon from '@mui/icons-material/Speed'
import RepeatIcon from '@mui/icons-material/Repeat'
import IconButton from '@mui/material/IconButton'
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt'
import { useTheme } from '@mui/material/styles'

export default function Buttons({ audio, switchSong }) {
  const audioControlState = useSelector(
    (state: RootState) => state.audioControl,
  )
  const dispatch = useDispatch<AppDispatch>()
  const theme = useTheme()

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000'

  return (
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
        sx={{ boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.28)' }}
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
  )
}
