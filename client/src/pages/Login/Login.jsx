import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { routes } from '../../router/routes';
import { reset, login } from '../../dispatch/user.dispatch';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, isError, isLoading, message } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [notify, setNotify] = useState(null);
  useEffect(() => {
    if (isError) {
      setNotify(message.message || 'error');
    }
    if (auth) {
      navigate(routes.home);
    }
    return () => dispatch(reset());
  }, [auth, navigate, isError, message, dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };
  return (
    <div className="container">
      <div className="box is-flex is-flex-direction-column is-align-items-center ">
        <div className="block">Login...</div>
        <p className="block">{notify}</p>
        <form onSubmit={handleSubmit} className="content">
          <input onChange={handleChange} name="email" type="email" className="input block" placeholder="Enter email" />
          <input
            onChange={handleChange}
            name="password"
            type="password"
            className="input block"
            placeholder="Enter password"
          />
          <button className="button" onSubmit={handleSubmit}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
        <div>
          Not have account <Link to={routes.register}>Register</Link>
        </div>
        <Link to={routes.home}>Home</Link>
      </div>
    </div>
  );
}
