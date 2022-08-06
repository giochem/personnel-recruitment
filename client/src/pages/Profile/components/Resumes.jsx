import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { findResumesOfUser, deleteResume, reset } from '../../../dispatch/resume.dispatch';

export default function Resumes({ auth = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resumes, isLoading, isError, message } = useSelector((state) => state.resume);
  useEffect(() => {
    if (isError) {
      navigate('/error');
      console.log(message);
    }
    if (auth) {
      dispatch(findResumesOfUser());
    }
    return () => dispatch(reset());
  }, [auth, isError, message, dispatch, navigate]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteResume(e.target.value));
    alert('Success delete');
  };
  return (
    <>
      {!isLoading && (
        <nav className="panel">
          <p className="panel-heading">Resumes</p>
          {resumes.length > 0 &&
            resumes.map((resume) => (
              <div className=" column notification is-success" key={resume._id}>
                <button value={resume._id} className="delete" onClick={handleDelete}></button>
                <p>{resume.name}</p>
                <p>{resume.description}</p>
                <div>
                  {resume.projects.map((project) => (
                    <a href={project} key={project} target="_black">
                      {project}
                    </a>
                  ))}
                </div>
                <Link to={{ pathname: `/resume/${resume._id}` }}>Discuss</Link>
              </div>
            ))}
        </nav>
      )}
    </>
  );
}
