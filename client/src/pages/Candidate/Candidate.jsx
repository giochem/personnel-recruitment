import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { reset, findCandidatesOfApplication } from '../../dispatch/candidate.dispatch';

export default function Candidate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applicationId } = useParams();
  const { candidates, isError, isLoading, message } = useSelector((state) => state.candidate);

  useEffect(() => {
    if (isError) {
      navigate('/error');
      console.log(message);
    }
    dispatch(findCandidatesOfApplication(applicationId));
    return () => dispatch(reset());
  }, [isError, message, dispatch, applicationId, navigate]);

  return (
    <div className="container box">
      <div className="columns">
        <div className="column is-8">
          {!isLoading &&
            candidates.length > 0 &&
            candidates.map((candidate) => (
              <div className="box" key={candidate._id}>
                <p>Name: {candidate.name}</p>
                <Link to={{ pathname: `/resume/${candidate.resumeId}` }}>Discuss</Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
