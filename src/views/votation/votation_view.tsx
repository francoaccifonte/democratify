import {
  RouteComponentProps,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

import { useVotation } from '../../hooks/useVotation'
import CandidateElement from './candidate_item'

type TParams = { id: string };

const VotationView = ({ match }: RouteComponentProps<TParams>) => {
  const accountId = Number(match.params.id);
  const { votationState, voteForCandidate } = useVotation(accountId, 'asdf')
  const [selected, setSelected] = useState<number|undefined>(undefined);

  const handleVote = (id: number) => voteForCandidate(id)
  const handleSelectCandidate = (id: number) => {
    setSelected(id)
  }

  if(!votationState.votation.id && !["idle", "pending"].includes(votationState.status)) {
    return <div>No hay una playlist en curso</div>
  }

  const candidates = votationState.votation.votation_candidates;

  const renderCandidates = () => {
    return(
      <Container style={{overflowY: "scroll"}}>
          {
            candidates?.map((candidate, index) => {
              return(
                <CandidateElement data={candidate} key={index} selected={selected} onSelect={() => handleSelectCandidate(candidate.id)} />
              )
            })
          }
        </Container>
    )
  };

  const VoteButton = () => {
    if(selected) {
      return(
        <Button className="mb-3 mt-3" onClick={() => handleVote(selected)}>Votar</Button>
      )
    } else {
      return <Button className="mb-3 mt-3" disabled>Votar</Button>
    }
  };

  if (candidates === []) { return <div>No hay candidatas</div>}

  return(
    <Container className="d-flex flex-column justify-content-between" style={{background: "#E953C9", height: "100vh"}} fluid>
      {renderCandidates()}
      <VoteButton />
    </Container>
  )
}

export default VotationView
