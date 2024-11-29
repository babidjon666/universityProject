using backend.models;

namespace backend.interfaces
{
    public interface IAuthService
    {
         Task RegisterService(UserModel user);
         Task<UserModel> LoginService(string login, string password);
    }
}