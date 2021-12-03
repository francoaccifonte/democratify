import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router'

import { useOngoingPlaylist } from '../../hooks/useOngoingPlaylist'

type PlayerFooterProps = {}

const PlayerFooter = (props: PlayerFooterProps) => {
  const { ongoingPlaylist } = useOngoingPlaylist()
  const history = useHistory();
  const redirect = () => history.push('/playlists/ongoing')

  if (!ongoingPlaylist) {
    return(null)
  }

  const semicirclePosition = 0.37

  var textStyle = {
    fontSize: "1.5rem",
    fontWeight: "semibold" as "bold",
    color: "white",
    fontFamily: "Poppins"
  };

  var containerStyle = {
    height: "8rem",
    bottom: "0",
    width: "100%",
    backgroundColor: "#021335",
    position: "fixed" as "fixed",
    display: "flex",
    alignItems: "center",
    flexDirection: "row" as "row",
    cursor: "pointer"
  };

  var playerButtonStyle = {
    width: "10%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column" as "column",
  };
  
  var currentSongBlockStyle = {
    width: "53%",
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
  };

    var listeningWordingStyle = {
      height: "1.5rem",
      paddingRight: "3rem",
      display: "flex",
      flexDirection: "column" as "column",
      justifyContent: "space-evenly",
      margin: "0 0 0 0",
    };

  var nextSongStyle = {
    paddingLeft: "2rem",
    width: "37%",
    height: "100%",
    backgroundColor: "#5571AA",
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
  }

  if (ongoingPlaylist.status === 'fulfilled' && ongoingPlaylist.id) {
      return(
        <>
          <div style={{height: "9rem"}} />
          <div className="player-footer-container" style={containerStyle} onClick={redirect}>
            <div className="player-button" style={playerButtonStyle}>
              <FontAwesomeIcon icon={faPlay} size="5x" color="white"/>
            </div>
            <div className="player-footer-current-song" style={{...textStyle, ...currentSongBlockStyle}}>
              <div className="player-footer-current-song-wording" style={listeningWordingStyle}>
                Estas escuchando:
              </div>
              <div className="player-footer-current-song-details">
                <div className="player-footer-current-song-title">
                  {ongoingPlaylist?.playingSong?.title}
                </div>
                <div>
                  {ongoingPlaylist?.playingSong?.artist}
                </div>
              </div>
            </div>
            <div className="player-footer-next-song" style={{...textStyle, ...nextSongStyle}}>
              Proxima cancion lablabal
            </div>
          </div>
        </>
      )
  }
  
  return (
    <></>
  )
}

export default PlayerFooter;
