using backend.models;
using backend.models.Atributes;

namespace backend.interfaces
{
    public interface IProfileRepository
    {
        Task<UserModel> GetUserFromDataBase(int userId);
        Task EditPatientInDataBase(int oldPatientId, Patient newPatient);
    }
}