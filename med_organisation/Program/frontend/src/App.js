import './App.css';
import './Components/Profile/User/UserProfileStyles.css';
import { Auth } from './Components/Auth/Auth.jsx';
import { UsersProfile } from './Components/Profile/User/UserProfile';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/profile" element={<UsersProfile />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;