// define a type for the song model without using interfaces
type Song ={
  id: number;
  title: string;
  artist: string;
  album: string;
  year?: number;
  genre?: string;
}

export default Song