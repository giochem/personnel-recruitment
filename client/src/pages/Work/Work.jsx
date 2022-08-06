import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { findApplicationsPublic, reset } from '../../dispatch/application.dispatch';

export default function Work() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applications, isError, isLoading, message } = useSelector((state) => state.application);

  useEffect(() => {
    if (isError) {
      navigate('/error');
      console.log(message);
    }
    dispatch(findApplicationsPublic());
    return () => dispatch(reset());
  }, [isError, message, navigate, dispatch]);

  return (
    <div className="container">
      <div className="columns box">
        {!isLoading && applications.length > 0 && (
          <>
            <div className="column is-8 ">
              {applications.map((application) => (
                <div key={application._id} className="box block">
                  <p>{application.title}</p>
                  <p>{application.computer}</p>
                  <Link to={{ pathname: `/application/${application._id}` }}>Detail</Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
