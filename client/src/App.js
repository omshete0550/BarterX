import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Landing from './Pages/Landing/Landing';
import Register from './Pages/Register/Register';
import Category from './Pages/Category/Category';
import Home from './Pages/Home/Home';
import NotificationPage from './Pages/Notification/NotificationPage'

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/categ" element={<Category />} />
            <Route exact path="/notification" element={<NotificationPage />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
