import './App.css';
import './Components/Profile/User/UserProfileStyles.css';
import { Auth } from './Components/Auth/Auth.jsx';
import { UsersProfile } from './Components/Profile/User/UserProfile';
import { DoctorProfile } from './Components/Profile/Doctor/DoctorProfile.jsx'
import { AdminProfile } from './Components/Profile/Admin/AdminProfile.jsx'
import { LaboratoryA } from './Components/Profile/LaboratoryA/LaboratoryA.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/userProfile/:id" element={<UsersProfile />} />
                <Route path="/adminProfile/:id" element={<AdminProfile />} />
                <Route path="/doctorProfile/:id" element={<DoctorProfile />} />
                <Route path="/laborantProfile/:id" element={<LaboratoryA />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;