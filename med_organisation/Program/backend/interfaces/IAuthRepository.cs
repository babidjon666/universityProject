using backend.models;

namespace backend.interfaces
{
    public interface IAuthRepository
    {
        Task<bool> CheckName(string cheackedLogin);
        Task AddUserToDataBase(UserModel user);
        Task<UserModel> GetUserFromDataBase(string login, string hashedPassword);
    }
}