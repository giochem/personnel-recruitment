import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { findResume } from '../../dispatch/resume.dispatch';

import io from 'socket.io-client';

const socket = io.connect();
export default function Resume() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resumeId } = useParams();
  const { auth } = useSelector((state) => state.user);
  const { resumes, isLoading, isError, message } = useSelector((state) => state.resume);
  const [chat, setChat] = useState('');
  const [discuss, setDiscuss] = useState([]);

  useEffect(() => {
    if (isError) {
      navigate('/error');
      console.log(message);
    }
    dispatch(findResume(resumeId));
  }, [isError, message, dispatch, navigate, resumeId]);

  // socket.io
  useEffect(() => {
    socket.on('discuss: message', (data) => {
      setDiscuss(data);
    });
    socket.on('discuss: new message', (data) => {
      setDiscuss([...discuss, data]);
    });
    return () => {
      socket.off('discuss: message');
      socket.off('discuss: new message');
    };
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = auth ? auth.name : 'guest';
    socket.emit('discuss: message', { resumeId: resumeId, name, message: chat });
  };
  const handleClick = (e) => {
    e.preventDefault();
    socket.emit('discuss: connect', resumeId);
  };
  return (
    <div className="box">
      {!isLoading && (
        <div className="block">
          <p>name:{resumes.name}</p>
          <p>description:{resumes.description}</p>
          <div>
            {resumes.projects &&
              resumes.projects.map((e, index) => (
                <a href={e} key={index} target="_black">
                  link:{e}
                </a>
              ))}
          </div>
        </div>
      )}
      <form className="block" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Comment"
          onChange={(e) => setChat(e.target.value)}
          value={chat}
        />
      </form>
      <button className="button block" onClick={handleClick}>
        See all comment
      </button>
      <div>
        {discuss.map((e, index) => (
          <p key={index}>
            {e.name} : {e.message}
          </p>
        ))}
      </div>
    </div>
  );
}
