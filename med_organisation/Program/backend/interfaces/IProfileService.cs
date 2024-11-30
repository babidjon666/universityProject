using backend.models;
using backend.models.Atributes;

namespace backend.interfaces
{
    public interface IProfileService
    {
        Task<UserModel> GetProfileService(int userId);
        Task EditPatientService(int oldPatientId, Patient newPatient);
    }
}