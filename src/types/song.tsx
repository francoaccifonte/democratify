export type Song ={
  id: number;
  title: string;
  artist: string;
  album: string;
  year?: number;
  genre?: string;
  cover_art: {
    height: number;
    width: number;
    url: string;
  }[]
}
