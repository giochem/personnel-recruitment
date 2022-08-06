import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findCandidatesOfApplication, reset } from '../../../dispatch/candidate.dispatch';
export default function Candidate({ applicationId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { candidates, isLoading, isError, message } = useSelector((state) => state.candidate);
  useEffect(() => {
    if (isError) {
      navigate('/error');
      console.log(message);
    }
    dispatch(findCandidatesOfApplication(applicationId));
    return () => dispatch(reset());
  }, [isError, message, navigate, dispatch, applicationId]);
  console.log(candidates);
  return <div>{candidates.length > 0 && candidates.map((candidate) => <></>)}</div>;
}
