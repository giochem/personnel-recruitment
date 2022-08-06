import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { findResumesPublic, reset } from '../../dispatch/resume.dispatch';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resumes, isError, isLoading, message } = useSelector((state) => state.resume);

  useEffect(() => {
    if (isError) {
      navigate('/error');
      console.log(message);
    }
    dispatch(findResumesPublic());
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, navigate]);

  return (
    <div className="box">
      <div className="columns">
        {!isLoading && (
          <div className="column is-8">
            {resumes.length > 0 &&
              resumes.map((resume) => (
                <div key={resume._id} className="box">
                  <p>name: {resume.name}</p>
                  <p className="is-flex is-inline-flex">description:{resume.description}</p>
                  <div>
                    {resume.projects.map((project) => (
                      <a href={project} key={project} target="_black">
                        link: {project}
                      </a>
                    ))}
                  </div>
                  <Link to={{ pathname: `/resume/${resume._id}` }}>Discuss</Link>
                </div>
              ))}
          </div>
        )}
        <div className="column is-4 box">
          <a
            target="_black"
            href="https://docs.google.com/forms/d/e/1FAIpQLSckPujCJlh9yhx9EiELp_JBx76VJv9HymQlIr6rxcv9tE4dgQ/viewform?usp=sf_link"
          >
            Feedback
          </a>
        </div>
      </div>
    </div>
  );
}
