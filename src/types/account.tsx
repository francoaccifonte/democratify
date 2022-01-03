type Account = {
  id: number | undefined,
  token: string | undefined,
  tokenExpiration: string | undefined,
  spotifyUsers?: {
    id: number,
    email: string,
  }[]
}

export default Account
