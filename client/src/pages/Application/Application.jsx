import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { findApplicationById, reset } from '../../dispatch/application.dispatch';
import { createCandidate } from '../../dispatch/candidate.dispatch';
import { findResumesOfUser } from '../../dispatch/resume.dispatch';
export default function Application() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applicationId } = useParams();
  const { applications, isLoading, isError, message } = useSelector((state) => state.application);
  const { resumes } = useSelector((state) => state.resume);
  const { auth } = useSelector((state) => state.user);
  const [model, setModel] = useState(false);
  const [chooseResume, setChooseResume] = useState({
    name: 'Not resume is choose',
    id: '',
  });

  useEffect(() => {
    if (isError) {
      navigate('/error');
      console.log(message);
    }
    if (auth) {
      dispatch(findResumesOfUser());
    }
    dispatch(findApplicationById(applicationId));
    return () => dispatch(reset());
  }, [isError, message, dispatch, navigate, applicationId, auth]);

  const applyApplication = () => {
    dispatch(createCandidate({ applicationId, resumeId: chooseResume.id, name: chooseResume.name }));
    alert('Apply success');
    setModel(false);
  };

  return (
    <div>
      <div className={model ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Resumes of you</p>
            <p className="modal-card-title">{chooseResume.name}</p>
          </header>
          <section className="modal-card-body">
            {resumes.length > 0 &&
              resumes.map((resume) => (
                <button
                  key={resume._id}
                  className="button"
                  onClick={() => setChooseResume({ name: resume.name, id: resume._id })}
                >
                  {resume.name}
                </button>
              ))}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={applyApplication}>
              Save changes
            </button>
            <button className="button" onClick={() => setModel(false)}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
      {!isLoading && (
        <div className="container box">
          <p className="block">title: {applications.title}</p>
          <p className="block">computer: {applications.computer}</p>
          <p className="block">address: {applications.address}</p>
          <p className="block">wage: {applications.wage}</p>
          <p className="block">education: {applications.education}</p>
          <p className="block">position: {applications.position}</p>
          <p className="block">type job: {applications.typeJob}</p>
          <p className="block">working form: {applications.workingForm}</p>
          <p className="block">quantity: {applications.quantity}</p>
          <p className="block">job description: {applications.jobDescription}</p>
          <p className="block">job request: {applications.jobRequest}</p>
          <p className="block">candidate: {applications.candidateBenefit}</p>
          <p className="block">
            skills: {applications.skills > 0 && applications.skills.map((skill) => <p key={skill}>{skill}</p>)}
          </p>
        </div>
      )}
      <button className="button" onClick={() => setModel(true)}>
        Apply
      </button>
    </div>
  );
}
