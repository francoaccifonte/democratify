import React, { useState } from 'react'
import {
  RouteComponentProps
} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import { ThemeProvider } from 'react-jss'

import Text from '../components/text'
import { useVotation } from '../../hooks'
import CandidateElement from './candidate_item'
import FullHeigthSkeleton from '../full_height_skeleton'
import { userPalette } from '../../color_palette'

type TParams = { id: string };

const VotationView = ({ match }: RouteComponentProps<TParams>) => {
  const accountId = Number(match.params.id)
  const { votationState, voteForCandidate, previousVotationIds } = useVotation(accountId, 'asdf')
  const [selected, setSelected] = useState<number|undefined>(undefined)

  const voteAlreadyCasted = previousVotationIds.includes(String(votationState.votation.id))

  const handleVote = (id: number) => voteForCandidate(id)
  const handleSelectCandidate = (id: number) => {
    if (!voteAlreadyCasted) { setSelected(id) }
  }

  if (!votationState.votation.id && !['idle', 'pending'].includes(votationState.status)) {
    return <div>No hay una playlist en curso</div>
  }

  const candidates = votationState.votation.votation_candidates

  const Candidates = () => {
    return (
      <Container style={{ overflowY: 'auto' }}>
          {
            candidates?.map((candidate, index) => {
              return (
                <CandidateElement data={candidate} key={index} selected={selected} disabled={voteAlreadyCasted} onSelect={() => handleSelectCandidate(candidate.id)} />
              )
            })
          }
      </Container>
    )
  }

  const VoteButton = () => {
    if (selected) {
      return (
        <Container fluid>
          <Row>
            <Button className="mb-3 mt-3" onClick={() => handleVote(selected)} style={{ backgroundColor: userPalette.Info, borderColor: userPalette.Info }}>Votar</Button>
          </Row>
        </Container>
      )
    } else {
      return <Button className="mb-3 mt-3" disabled>Votar</Button>
    }
  }

  const VotationTimer = () => {
    if (voteAlreadyCasted) {
      return (
       <Text type="bodyRegular" >
          {`Votacion termina en ${moment.utc(moment(votationState.votation.scheduled_close_for).diff(moment())).format('mm:ss')}`}
        </Text>
      )
    }
    return null
  }

  if (candidates === []) { return <div>No hay candidatas</div> }

  return (
    <ThemeProvider theme={userPalette}>
      <FullHeigthSkeleton header palette='user' flexDirectionColumn overflowY="hidden">
        <VotationTimer />
        <Candidates />
        <VoteButton />
      </FullHeigthSkeleton>
    </ThemeProvider>
  )
}

export default VotationView
