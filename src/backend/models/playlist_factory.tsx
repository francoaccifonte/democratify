import Faker from 'faker'
import Song from './song_model'

const SongFactory = (prevId: number = 0): Song => {
  return({
    id: Faker.datatype.number() + prevId,
    title: Faker.lorem.words(),
    album: Faker.lorem.word(),
    artist: Faker.lorem.words()
  })
}

const PlaylistFactory = (id: number) => {
  var prevId = 0;
  var playlist: any = []
  for (let i = 0; i < id; i++) {
    playlist.push(SongFactory(prevId))
    prevId = playlist.at(-1).id
  }
  return playlist
}

export default PlaylistFactory
