import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchPlaylists } from '../features/slices/playlists_slice'

const PlaylistSelectionView = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPlaylists({}))
  }, []);


  return(
    <div>
      <h1>Playlist Selection</h1>
    </div>
  );
};  

export default PlaylistSelectionView;