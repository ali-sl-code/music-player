import { useSelector, useDispatch } from 'react-redux'
import { setPosition } from '../../slices/audioControlSlice'
import { AppDispatch, RootState } from '../../store'

import Stack from '@mui/material/Stack'
import { TimeIndicator, TinyText } from '../player-components'

export default function Timer({ audio }) {
  const audioState = useSelector((state: RootState) => state.audio)
  const audioControlState = useSelector(
    (state: RootState) => state.audioControl,
  )
  const dispatch = useDispatch<AppDispatch>()

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60)
    const secondLeft = value - minute * 60
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`
  }

  return (
    <Stack
      alignItems="center"
      sx={{ width: '80%' }}
      {...(audioState && { mt: 3 })}
    >
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
  )
}
