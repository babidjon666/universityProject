import React from 'react';
import { Patient } from './Patient.jsx';
import { Passport } from './Passport.jsx';

export const PersonalInfo = ( {profile, patient, passport, fetchProfile}) => {
    return(
        <div className="section-container">
        <Patient patient={patient} profile={profile} fetchProfile={fetchProfile} />
        <Passport passport={passport} profile={profile} fetchProfile={fetchProfile} />
    </div>
    );
};