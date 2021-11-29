import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/root_reducer'
import { fetchVotation, castVote } from '../features/slices/votation_slice'
import { useEffect } from 'react';

export const useVotation = (account_id: number, token?: string) => {
  const dispatch = useDispatch();

  var votationState = useSelector((state: RootState) => state.votations);

  useEffect(() => {
    if (!votationState.votation.id && votationState.status === 'idle') {
      dispatch(fetchVotation({ id: account_id, token: token}))
    }
  }, [dispatch, votationState, account_id, token]);

  votationState = useSelector((state: RootState) => state.votations)

  const voteForCandidate = (candidateId: number) => {
    dispatch(castVote({ accountId: account_id, token: token, candidateId: candidateId }))
  }

  return {
    votationState,
    voteForCandidate
  }
}
