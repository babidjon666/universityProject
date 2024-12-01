using backend.models;
using backend.models.Atributes;
using backend.models.Attributes;

namespace backend.interfaces
{
    public interface IProfileService
    {
        Task<UserModel> GetProfileService(int userId);
        Task EditPatientService(int oldPatientId, Patient newPatient);
        Task EditPassportService(int oldPassportId, Passport newPassport);
    }
}