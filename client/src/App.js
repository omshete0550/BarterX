import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Landing from './Pages/Landing/Landing';
import logo from './logo.svg';
import Register from './Pages/Register/Register';
function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
