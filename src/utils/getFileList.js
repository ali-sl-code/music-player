import MetaData from './../services/meta-data'

export default async function getFileList(files) {
  let filedInfo = []

  for (let i = 0; i < files.length; i++) {
    let metaData = new MetaData(files[i])
    if (!metaData) return []

    let name = await metaData.getTitle()
    let imgSrc = await metaData.getImageSrc()
    let artist = await metaData.getArtist()
    let duration = await metaData.getDuration()

    //* Duration display
    const formatDuration = value => {
    
      const minute = Math.floor(value / 60)
      const secondLeft = Math.floor(value - minute * 60)
      return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`
      
    }

    filedInfo.push({
      id: i,
      name,
      imgSrc,
      artist,
      duration: formatDuration(duration),
    })
  }

  return filedInfo
}
