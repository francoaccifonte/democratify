import {
  RouteComponentProps,
  useHistory
} from "react-router-dom";
import Image from 'react-bootstrap/Image'
import { useDispatch } from "react-redux";

import { useVotation } from '../../hooks/useVotation'

type TParams = { id: string };

const VotationView = ({ match }: RouteComponentProps<TParams>) => {
  const accountId = Number(match.params.id);
  const { votationState, voteForCandidate } = useVotation(accountId, 'asdf')
  const handleVote = (id: number) => voteForCandidate(id)

  if(!votationState.votation.id && !["idle", "pending"].includes(votationState.status)) {
    return <div>No hay una playlist en curso</div>
  }

  const candidates = votationState.votation.votation_candidates;

  if (candidates === []) { return <div>No hay candidatas</div>}

  return(
    <>
      {
        candidates?.map((candidate, index) => {
          return(
            <Image src={candidate.spotify_song?.cover_art[1].url} onClick={() => handleVote(candidate.id)} key={index}/>
          )
        })
      }
    </>
  )
}

export default VotationView
