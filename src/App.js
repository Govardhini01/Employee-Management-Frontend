import { Route, Routes } from 'react-router-dom';
import Login from './components/Home/Index';
import DashBoard from './components/dashboard';
import './App.css';
import SignInRequired from './components/SignInRequired';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/dashboard' exact element={<SignInRequired> <DashBoard /></SignInRequired>} />
      </Routes>
    </div>
  );
}

export default App;
