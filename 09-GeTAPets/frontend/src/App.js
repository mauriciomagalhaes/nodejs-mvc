import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

/* Pages */
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />   
      </Routes>
    </Router>
  );
}

export default App;
