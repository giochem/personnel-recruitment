import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { findApplicationsOfUser, deleteApplication, reset } from '../../../dispatch/application.dispatch';

export default function Applications({ auth = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applications, isLoading, isError, message } = useSelector((state) => state.application);
  useEffect(() => {
    if (isError) {
      navigate('/error');
      console.log(message);
    }
    if (auth) {
      dispatch(findApplicationsOfUser());
    }
    return () => dispatch(reset());
  }, [auth, isError, message, dispatch, navigate]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteApplication(e.target.value));
    alert('Success delete');
  };
  return (
    <>
      {!isLoading && (
        <nav className="panel">
          <p className="panel-heading">Applications</p>
          {applications.length > 0 &&
            applications.map((application) => (
              <div key={application._id} className=" column notification is-success">
                <button value={application._id} className="delete" onClick={handleDelete}></button>
                <p>{application.title}</p>
                <p>{application.computer}</p>
                <nav>
                  {application.skills.map((skill) => (
                    <p key={skill}>{skill}</p>
                  ))}
                </nav>
                <Link to={{ pathname: `/candidate/${application._id}` }}>Candidate</Link>
              </div>
            ))}
        </nav>
      )}
    </>
  );
}
