import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../features/root_reducer'
import { fetchVotation, castVote } from '../features/slices/votation_slice'

const useVotation = (accountId?: number, token?: string) => {
  const dispatch = useDispatch()
  const satateAccountId = useSelector((state: RootState) => state.account.id)
  const usableAccountId = accountId || satateAccountId

  const votationState = useSelector((state: RootState) => state.votations)
  const previousVotationIds = localStorage.getItem('votation_ids')?.split(',') || []

  const reloadVotation = () => {
    if (usableAccountId !== undefined) {
      dispatch(fetchVotation({ id: usableAccountId, token: token }))
    }
  }

  if (!votationState.votation.id && votationState.status === 'idle') {
    reloadVotation()
  }

  const voteForCandidate = (candidateId: number) => {
    if (usableAccountId !== undefined) {
      dispatch(castVote({ accountId: usableAccountId, token: token, candidateId: candidateId }))
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
