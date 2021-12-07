import {
  RouteComponentProps,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

import { useVotation } from '../../hooks/useVotation'
import CandidateElement from './candidate_item'
import FullHeigthSkeleton from '../full_height_skeleton'

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

  const Candidates = () => {
    return(
      <Container style={{overflowY: "auto"}}>
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
        <Container fluid>
          <Row>
            <Button className="mb-3 mt-3" onClick={() => handleVote(selected)}>Votar</Button>
          </Row>
        </Container>
      )
    } else {
      return <Button className="mb-3 mt-3" disabled>Votar</Button>
    }
  };

  if (candidates === []) { return <div>No hay candidatas</div>}

  return(
    <FullHeigthSkeleton header palette='user' flexDirectionColumn overflowY="hidden">
      <Candidates />
      <VoteButton />
    </FullHeigthSkeleton>
  )
}

export default VotationView