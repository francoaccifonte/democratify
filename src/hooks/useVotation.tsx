import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../features/root_reducer'
import { fetchVotation, castVote } from '../features/slices/votation_slice'
import { useEffect } from 'react'

const useVotation = (accountId?: number, token?: string) => {
  const dispatch = useDispatch()
  accountId = accountId || useSelector((state: RootState) => state.account.id)

  let votationState = useSelector((state: RootState) => state.votations)
  const previousVotationIds = localStorage.getItem('votation_ids')?.split(',') || []

  useEffect(() => {
    if (!votationState.votation.id && votationState.status === 'idle' && accountId !== undefined) {
      dispatch(fetchVotation({ id: accountId, token: token }))
    }
  }, [dispatch, votationState, accountId, token])

  votationState = useSelector((state: RootState) => state.votations)

  const voteForCandidate = (candidateId: number) => {
    if (accountId !== undefined) {
      dispatch(castVote({ accountId: accountId, token: token, candidateId: candidateId }))
    }
  }

  const reloadVotation = () => {
    if (accountId !== undefined) {
      dispatch(fetchVotation({ id: accountId, token: token }))
    }
  }

  return {
    votationState,
    voteForCandidate,
    previousVotationIds,
    reloadVotation
  }
}

export default useVotation
