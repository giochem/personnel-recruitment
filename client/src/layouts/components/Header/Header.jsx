import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { routes } from '../../../router/routes';
import { logout } from '../../../dispatch/user.dispatch';
export default function Header() {
  const { auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };
  return (
    <div className="columns is-vcentered">
      <Link to={routes.home} className="column">
        Home
      </Link>
      <Link to={routes.work} className="column">
        Work
      </Link>
      <Link to={routes.profile} className="column">
        Profile
      </Link>
      <>
        {auth ? (
          <div className="columns">
            <button className=" button" onClick={logoutUser}>
              Logout
            </button>
          </div>
        ) : (
          <div className="columns">
            <Link className="column" to={routes.login}>
              Login
            </Link>
            <Link className="column" to={routes.register}>
              Register
            </Link>
          </div>
        )}
      </>
    </div>
  );
}
