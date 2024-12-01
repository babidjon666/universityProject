using backend.Data;
using backend.interfaces;
using backend.models;
using backend.models.Atributes;
using backend.models.Attributes;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ProfileRepository : BaseRepository, IProfileRepository
    {
        public ProfileRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<UserModel> GetUserFromDataBase(int userId)
        {
            var dbUser = await _context.Users
                            .Include(u => u.Profile)              
                                .ThenInclude(p => p.Passport)     
                            .Include(u => u.Profile)
                                .ThenInclude(p => p.Patient)      
                            .Include(u => u.Profile)
                                .ThenInclude(p => p.MedCard)      
                            .FirstOrDefaultAsync(u => u.Id == userId); 

            return dbUser;
        }
        public async Task EditPatientInDataBase(int oldPatientId, Patient newPatient)
        {
            var oldPatient = await _context.Patients
                                .FirstOrDefaultAsync(p => p.Id == oldPatientId);

            if (oldPatient == null)
            {
                throw new Exception($"Patient with ID {oldPatientId} not found.");
            }

            oldPatient.DocumentNumber = newPatient.DocumentNumber;
            oldPatient.Serie = newPatient.Serie;
            oldPatient.INN = newPatient.INN;
            oldPatient.PatentTerritory = newPatient.PatentTerritory;
            oldPatient.IssuedBy = newPatient.IssuedBy;
            oldPatient.Nationality = newPatient.Nationality;
            oldPatient.DateOfIssue = newPatient.DateOfIssue;

            await Save();
        }

        public async Task EditPassportInDataBase(int oldPassportId, Passport newPassport)
        {
            var oldPassport = await _context.Passports
                                .FirstOrDefaultAsync(p => p.Id == oldPassportId);

            if (oldPassport == null)
            {
                throw new Exception($"Passport with ID {oldPassport} not found.");
            }

            oldPassport.DocumentNumber = newPassport.DocumentNumber; 
            oldPassport.Serie = newPassport.Serie; 
            oldPassport.Sex = newPassport.Sex; 
            oldPassport.PlaceOfBirthday = newPassport.PlaceOfBirthday; 
            oldPassport.CodeOfState = newPassport.CodeOfState; 
            oldPassport.Nationality = newPassport.Nationality; 
            oldPassport.IssuingAuthority = newPassport.IssuingAuthority; 
            oldPassport.PlaceOfResidence = newPassport.PlaceOfResidence; 
            oldPassport.DateOfBirth = newPassport.DateOfBirth; 
            oldPassport.DateOfIssue = newPassport.DateOfIssue; 
            oldPassport.DateOfExpiry = newPassport.DateOfExpiry; 

            await Save();               
        }
    }
}