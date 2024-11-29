using backend.models;

namespace backend.interfaces
{
    public interface IAuthRepository
    {
        Task<bool> CheckName(string cheackedLogin);
        Task AddUser(UserModel user);
    }
}