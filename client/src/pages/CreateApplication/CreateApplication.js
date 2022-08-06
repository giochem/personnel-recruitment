import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createApplication } from '../../dispatch/application.dispatch';
export default function CreateApplication() {
  const dispatch = useDispatch();
  const { isError, isLoading, message } = useSelector((state) => state.application);

  const [form, setForm] = useState({
    title: '',
  });
  const [notify, setNotify] = useState(null);
  const [skills, setSkills] = useState({});
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message]);

  const handleChange = (name) => (e) => {
    if (name === 'skills') {
      if (skills[e.target.value]) {
        setSkills({ ...skills, [e.target.value]: !skills[e.target.value] });
      } else {
        setSkills({ ...skills, [e.target.value]: true });
      }
    } else {
      setForm({ ...form, [name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.computer) {
      setNotify('Please add add title or computer');
    } else {
      const skillArr = Object.keys(skills).filter((skill) => skills[skill] === true);
      dispatch(createApplication({ ...form, skills: skillArr }));
    }
  };

  return (
    <div className="container">
      <div className="is-flex is-flex-direction-column  is-align-items-center">
        <div className="block">Create Application...</div>
        <p className="block">{notify}</p>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange('title')} className="input block" type="text" placeholder="Title" />
          <input onChange={handleChange('computer')} className="input block" type="text" placeholder="Computer" />
          <input onChange={handleChange('address')} className="input block" type="text" placeholder="Address" />
          <input onChange={handleChange('wage')} className="input block" type="text" placeholder="Wage" />
          <input onChange={handleChange('education')} className="input block" type="text" placeholder="education" />
          <input onChange={handleChange('position')} className="input block" type="text" placeholder="Position" />
          <input onChange={handleChange('typeJob')} className="input block" type="text" placeholder="Type job" />
          <input
            onChange={handleChange('workingForm')}
            className="input block"
            type="text"
            placeholder="Working form"
          />
          <input onChange={handleChange('quantity')} className="input block" type="text" placeholder="Quantity" />
          <input className="block" onChange={handleChange('skills')} value="js" type="checkbox" /> js
          <input className="block" onChange={handleChange('skills')} value="php" type="checkbox" /> php
          <input className="block" onChange={handleChange('skills')} value="ts" type="checkbox" /> ts
          <input className="block" onChange={handleChange('skills')} value="go" type="checkbox" /> go
          <input className="block" onChange={handleChange('skills')} value="c#" type="checkbox" /> c#
          <input className="block" onChange={handleChange('skills')} value="c++" type="checkbox" /> c++
          <input className="block" onChange={handleChange('skills')} value="java" type="checkbox" /> java
          <input className="block" onChange={handleChange('skills')} value=".net" type="checkbox" /> .net
          <input className="block" onChange={handleChange('skills')} value="python" type="checkbox" /> python
          <textarea
            placeholder="Job description"
            className="textarea block"
            onChange={handleChange('jobDescription')}
          ></textarea>
          <textarea
            placeholder="Job request"
            className="textarea block"
            onChange={handleChange('jobRequest')}
          ></textarea>
          <textarea
            placeholder="Candidate benefit"
            className="textarea block"
            onChange={handleChange('candidateBenefit')}
          ></textarea>
          <button className="button">{isLoading ? 'Loading...' : 'Submit'}</button>
        </form>
      </div>
    </div>
  );
}
