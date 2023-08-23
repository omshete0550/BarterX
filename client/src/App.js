import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Landing from './Pages/Landing/Landing';
import Register from './Pages/Register/Register';
import Homepage from './Pages/Homepage/Homepage';
import NotificationsPage from './Pages/NotificationPage/NotificationPage';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Homepage" element={<Homepage />} />
          <Route exact path="/Notifications" element={<NotificationsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
