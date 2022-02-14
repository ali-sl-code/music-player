import { parseBlob, selectCover } from 'music-metadata-browser'
import { encode } from 'base64-arraybuffer'
import resize from 'resize-base64'

const getImgBase64Src = (base64String: string) =>
  `data:image/jpg;base64, ${base64String}`

const DEFAULT_IMG_SRC =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80'

export default class MetaData {
  file: File = null
  parsedBlob = null
  constructor(file: File) {
    this.file = file
  }

  async initiateMusicMetaDataBlob() {
    try {
      if (!this.parsedBlob) this.parsedBlob = await parseBlob(this.file)
    } catch (error) {}
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
    } catch {}
  }

  async getGenre() {
    try {
      await this.initiateMusicMetaDataBlob()
      const { common } = this.parsedBlob
      const genre = common.genre || common.label
      return genre.join`, `
    } catch {}
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
    } catch {}
  }

  async getAudioSrc() {
    try {
      return URL.createObjectURL(this.file)
    } catch (error) {}
  }

  async getArtwork() {
    try {
      let sizes: number[] = [96, 128, 192, 256, 384, 512]
      let dataImage = await this.getImageSrc()
      const artwork = sizes.map(value => ({
        src:
          dataImage === DEFAULT_IMG_SRC
            ? dataImage
            : resize(dataImage, value, value),
        sizes: `${value}x${value}`,
      }))
      return artwork
    } catch (error) {
      return {
        src: DEFAULT_IMG_SRC,
        sizes: `512x512`,
      }
    }
  }

  async getDuration() {
    try {
      await this.initiateMusicMetaDataBlob()
      const {
        format: { duration },
      } = this.parsedBlob
      return duration
    } catch {}
  }
}
