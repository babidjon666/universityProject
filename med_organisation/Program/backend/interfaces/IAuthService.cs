using backend.models;

namespace backend.interfaces
{
    public interface IAuthService
    {
         Task RegisterService(UserModel user);
    }
}