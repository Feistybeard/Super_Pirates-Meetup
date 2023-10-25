import { Routes, Route } from 'react-router-dom';
import { Login } from './views/Login';
import { SignUp } from './views/SignUp';
import { Navbar } from './components/Navbar/Navbar';
import { baseLink } from './utils/helpers';
import { Home } from './views/Home';
import MeetupList from './views/MeetupList';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={`${baseLink}/`} element={<Home />} />
        <Route path={`${baseLink}/login`} element={<Login />} />
        <Route path={`${baseLink}/signup`} element={<SignUp />} />
        <Route path={`${baseLink}/meetups`} element={<MeetupList />} />
      </Routes>
    </div>
  );
}

export default App;
