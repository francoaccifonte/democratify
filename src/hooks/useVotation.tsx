import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../features/root_reducer'
import { fetchVotation, castVote } from '../features/slices/votation_slice'
import { useEffect } from 'react'

const useVotation = (accountId: number, token?: string) => {
  const dispatch = useDispatch()

  let votationState = useSelector((state: RootState) => state.votations)
  const previousVotationIds = localStorage.getItem('votation_ids')?.split(',') || []

  useEffect(() => {
    if (!votationState.votation.id && votationState.status === 'idle') {
      dispatch(fetchVotation({ id: accountId, token: token }))
    }
  }, [dispatch, votationState, accountId, token])

  votationState = useSelector((state: RootState) => state.votations)

  const voteForCandidate = (candidateId: number) => {
    dispatch(castVote({ accountId: accountId, token: token, candidateId: candidateId }))
  }

  const reloadVotation = () => {
    dispatch(fetchVotation({ id: accountId, token: token }))
  }

  return {
    votationState,
    voteForCandidate,
    previousVotationIds,
    reloadVotation
  }
}

export default useVotation
