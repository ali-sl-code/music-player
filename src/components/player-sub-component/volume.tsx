import Stack from '@mui/material/Stack'
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded'
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded'
import { useTheme } from '@mui/material/styles'

import { AppDispatch, RootState } from '../../store'
import { setVolume } from 'slices/audioControlSlice'
import { useSelector, useDispatch } from 'react-redux'
import { VolumeIndicator } from '../player-components'

export default function Volume() {
  const audioControlState = useSelector(
    (state: RootState) => state.audioControl,
  )
  const dispatch = useDispatch<AppDispatch>()
  const theme = useTheme()

  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ width: '100%', my: 3 }}
    >
      <VolumeDownRounded htmlColor={lightIconColor} />
      <VolumeIndicator
        aria-label="Volume"
        value={audioControlState.volume}
        onChange={(e: any) => {
          dispatch(setVolume(e.target.value))
        }}
      />
      <VolumeUpRounded htmlColor={lightIconColor} />
    </Stack>
  )
}
