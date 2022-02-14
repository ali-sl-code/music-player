import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { setPictureInPictureMode } from 'slices/audioControlSlice'

import showPictureInPictureWindow from '../../utils/pictureInPicture'

import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt'

export default function PictureInPicture() {
  const audioControlState = useSelector(
    (state: RootState) => state.audioControl
  )
  const dispatch = useDispatch<AppDispatch>()
  return (
    <Stack alignItems="flex-end" sx={{ width: '100%' }}>
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
