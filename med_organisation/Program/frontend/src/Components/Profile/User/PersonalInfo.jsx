import React from 'react';
import { Patient } from './Patient.jsx';
import { Passport } from './Passport.jsx';

export const PersonalInfo = ( {profile, patient, passport, fetchProfile}) => {
    return(
        <div className="section-container">
        <div className="personal-info">
            <h3 className="personal-info-header">Personal Info</h3>
            <div className="personal-info-content">
                <p>
                    <span className="personal-info-label">Name:</span> {profile.name}
                </p>
                <p>
                    <span className="personal-info-label">Surname:</span> {profile.surname}
                </p>
                <p>
                    <span className="personal-info-label">Login:</span> {profile.login}
                </p>
            </div>
        </div>
        <Patient patient={patient} profile={profile} fetchProfile={fetchProfile} />
        <Passport passport={passport} profile={profile} fetchProfile={fetchProfile} />
    </div>
    );
};