using backend.Data;
using backend.interfaces;
using backend.models;
using backend.models.Atributes;
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
                            .Include(u => u.Profile)
                                .ThenInclude(p => p.Requests)    
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
    }
}