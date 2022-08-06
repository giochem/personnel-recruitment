// Layouts

// Pages
import Home from '../pages/Home';
import Resume from '../pages/Resume';
import CreateResume from '../pages/CreateResume';
import Work from '../pages/Work';
import CreateApplication from '../pages/CreateApplication';
import Candidate from '../pages/Candidate';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';
import Application from '../pages/Application/Application';
export const routes = {
  home: '/',
  createResume: '/profile/create-resume',
  resume: '/resume/:resumeId',
  work: '/work',
  application: '/application/:applicationId',
  candidate: '/candidate/:applicationId',
  createApplication: 'profile/create-application',
  profile: '/profile',
  login: '/login',
  register: '/register',
  error: '/error',
};
// Public routes
const publicRoutes = [
  { path: routes.home, component: Home },
  { path: routes.resume, component: Resume },
  { path: routes.createResume, component: CreateResume },
  { path: routes.work, component: Work },
  { path: routes.application, component: Application },
  { path: routes.candidate, component: Candidate },
  { path: routes.createApplication, component: CreateApplication },
  { path: routes.profile, component: Profile },
  { path: routes.login, component: Login, layout: null },
  { path: routes.register, component: Register, layout: null },
  { path: routes.error, component: Error },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
