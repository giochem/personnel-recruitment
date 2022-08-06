import { configureStore } from '@reduxjs/toolkit';

import user from '../reducers/user.reducer';
import resume from '../reducers/resume.reducer';
import application from '../reducers/application.reducer';
import candidate from '../reducers/candidate.reducer';
import vote from '../reducers/vote.reducer';

export const store = configureStore({
  reducer: {
    user,
    resume,
    application,
    candidate,
    vote,
  },
});
