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
            if (userId < 0)
            {
                throw new Exception("Пользователя с отрицательным id не существует");
            }

            var dbUser = await profileRepository.GetUserFromDataBase(userId);
            return dbUser;
        }

        public async Task EditPatientService(int oldPatientId, Patient newPatient)
        {
            if (oldPatientId < 0 || newPatient == null)
            {
                throw new Exception("Ошибка входных данных в сервисе");
            }

            await profileRepository.EditPatientInDataBase(oldPatientId, newPatient);
        }

        public async Task EditPassportService(int oldPassportId, Passport newPassport)
        {
            if (oldPassportId < 0 || newPassport == null)
            {
                throw new Exception("Ошибка входных данных в сервисе");
            }

            await profileRepository.EditPassportInDataBase(oldPassportId, newPassport);
        }
    }
}