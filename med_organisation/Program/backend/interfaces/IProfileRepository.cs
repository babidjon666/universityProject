using backend.models;
using backend.models.Atributes;
using backend.models.Attributes;
using backend.models.DTO;

namespace backend.interfaces
{
    public interface IProfileRepository
    {
        Task<UserModel> GetUserFromDataBase(int userId);
        Task EditPatientInDataBase(int oldPatientId, Patient newPatient);
        Task EditPassportInDataBase(int oldPassportId, Passport newPassport);
    }
}