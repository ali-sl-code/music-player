import { parseBlob, selectCover } from 'music-metadata-browser'
import { encode } from 'base64-arraybuffer'
import resize from 'resize-base64'

const getImgBase64Src = (base64String: string) =>
  `data:image/jpg;base64, ${base64String}`

const DEFAULT_IMG_SRC =
  'https://i.picsum.photos/id/610/120/120.jpg?hmac=45n0S_eELB97ObNBUVFeCN4ujyfM5wXLGM7bVonjwQQ'

export default class MetaData {
  file: File = null
  parsedBlob = null
  constructor(file: File) {
    this.file = file
  }

  async initiateMusicMetaDataBlob() {
    if (!this.parsedBlob) this.parsedBlob = await parseBlob(this.file)
  }

  async getImageSrc() {
    try {
      await this.initiateMusicMetaDataBlob()
      const { common } = this.parsedBlob
      const base64String = encode(selectCover(common.picture).data)
      return getImgBase64Src(base64String)
    } catch {
      return DEFAULT_IMG_SRC
    }
  }

  async getTitle() {
    try {
      await this.initiateMusicMetaDataBlob()
      const { common } = this.parsedBlob
      return common.title ? common.title : 'Music name is undefined'
    } catch { }
  }

  async getGenre() {
    try {
      await this.initiateMusicMetaDataBlob()
      const { common } = this.parsedBlob
      const genre = common.genre || common.label
      return genre.join`, `
    } catch { }
  }

  async getArtist() {
    try {
      await this.initiateMusicMetaDataBlob()
      const { common } = this.parsedBlob
      return common.artists.join(', ')
    } catch {
      // fallback strategy on not good match
      const { common } = this.parsedBlob
      return common.artist || common.albumartistsort
    }
  }

  async getInfo() {
    try {
      await this.initiateMusicMetaDataBlob()
      console.log(this.parsedBlob)
    } catch { }
  }

  async getAudioSrc() {
    return URL.createObjectURL(this.file)
  }

  async getArtwork() {
    let sizes: number[] = [96, 128, 192, 256, 384, 512]
    let dataImage = await this.getImageSrc()
    const artwork = sizes.map(value => ({
      src: resize(dataImage, value, value),
      sizes: `${value}x${value}`,
      type: 'image/jpeg',
    }))
    return artwork
  }

  async getDuration() {
    try {
      await this.initiateMusicMetaDataBlob()
      const { format: { duration } } = this.parsedBlob
      return duration
    } catch { }
  }
}
