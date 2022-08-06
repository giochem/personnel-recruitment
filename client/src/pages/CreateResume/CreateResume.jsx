import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createResume } from '../../dispatch/resume.dispatch';

export default function CreateResume() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading, message } = useSelector((state) => state.resume);
  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'public',
    projects: [],
  });
  const [openModel, setOpenModel] = useState(false);

  const [link, setLink] = useState('');

  const [notify, setNotify] = useState(null);

  useEffect(() => {
    if (isError) {
      navigate('/error');
      console.log(message);
    }
  }, [isError, message, navigate]);
  const handleChange = (name) => (e) => {
    setForm({
      ...form,
      [name]: e.target.value,
    });
  };
  const handleAddLink = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      projects: [...form.projects, link],
    });
    setLink('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.projects.length) {
      setNotify('Please add all field');
    } else {
      alert('Create success');
      dispatch(createResume(form));
    }
  };
  const toggleModel = (e) => {
    e.preventDefault();
    setOpenModel(!openModel);
  };
  return (
    <div className="container">
      <div className={openModel ? 'modal is-active' : 'modal'}>
        <div className="modal-background" onClick={toggleModel}></div>
        <div className="modal-content has-text-light">
          {form.projects.map((project, index) => (
            <a key={index} href={project} target="_black" className="box">
              {project}
            </a>
          ))}
        </div>
        <button className="modal-close is-large" aria-label="close"></button>
      </div>
      <div className="is-flex is-flex-direction-column  is-align-items-center">
        <div className="block">Create...</div>
        <p className="block">{notify}</p>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange('name')} className="input block" type="text" placeholder="Name " />
          <input onChange={handleChange('description')} className="input block" type="text" placeholder="Description" />
          <div onChange={handleChange('status')} className="select block">
            <select>
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="input"
            type="text"
            placeholder="Link Project"
          />
          <button name="link" onClick={handleAddLink} className="button">
            Add Project
          </button>
          <button className="button">{isLoading ? 'Loading...' : 'Submit'}</button>
        </form>
        <button name="link" onClick={toggleModel} className="button">
          Projects
        </button>
      </div>
    </div>
  );
}
