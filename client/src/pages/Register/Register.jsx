import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { routes } from '../../router/routes';
import { reset, register } from '../../dispatch/user.dispatch';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, isError, isLoading, message } = useSelector((state) => state.user);
  const [notify, setNotify] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isError) {
      setNotify(message.message);
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
    dispatch(register(form));
  };
  return (
    <div className="container">
      <div className="box is-flex is-flex-direction-column is-align-items-center">
        <p className="block">Register...</p>
        <p className="block">{notify}</p>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="name"
            value={form.name}
            type="text"
            className="input block"
            placeholder="Enter name"
          />
          <input
            onChange={handleChange}
            name="email"
            value={form.email}
            type="email"
            className="input block"
            placeholder="Enter email"
          />
          <input
            onChange={handleChange}
            name="password"
            value={form.password}
            type="password"
            className="input block"
            placeholder="Enter password"
          />
          <button className="button">{isLoading ? 'Loading...' : 'Submit'}</button>
        </form>
        <p>
          Have account <Link to={routes.login}>Login</Link>
        </p>
        <Link to={routes.home}>Home</Link>
      </div>
    </div>
  );
}
