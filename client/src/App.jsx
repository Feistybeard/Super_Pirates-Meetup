import { Routes, Route } from 'react-router-dom';
import { Login } from './views/Login';
import { SignUp } from './views/SignUp';
import { Navbar } from './components/Navbar/Navbar';
import { baseLink } from './utils/helpers';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={`${baseLink}/`} element={<Login />} />
        <Route path={`${baseLink}/signup`} element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
