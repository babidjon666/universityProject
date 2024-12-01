using backend.interfaces;
using backend.models;
using backend.models.Atributes;
using backend.models.Attributes;

namespace backend.Services
{
    public class ProfileService: IProfileService
    {
        private readonly IProfileRepository profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            this.profileRepository = profileRepository;
        }

        public async Task<UserModel> GetProfileService(int userId)
        {
            var dbUser = await profileRepository.GetUserFromDataBase(userId);

            if (dbUser == null)
            {
                throw new Exception("пользователь не найден");
            }

            return dbUser;
        }

        public async Task EditPatientService(int oldPatientId, Patient newPatient)
        {
            await profileRepository.EditPatientInDataBase(oldPatientId, newPatient);
        }

        public async Task EditPassportService(int oldPassportId, Passport newPassport)
        {
            await profileRepository.EditPassportInDataBase(oldPassportId, newPassport);
        }
    }
}