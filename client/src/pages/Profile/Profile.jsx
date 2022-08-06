import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Resumes, Applications } from './components';
export default function Profile() {
  const { auth } = useSelector((state) => state.user);

  return (
    <div className="box">
      {auth ? (
        <>
          <div className="columns block">
            <div className="column is-8">
              <Resumes />
              <Applications />
            </div>
            <div className="column is-4">
              <Link to="/profile/create-resume" className="block is-flex button">
                Create resume
              </Link>
              <Link to="/profile/create-application" className="is-flex button">
                Create application
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p>Please login or register</p>
      )}
    </div>
  );
}
