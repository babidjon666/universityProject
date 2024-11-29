using backend.Data;
using backend.interfaces;
using backend.models;

namespace backend.Services
{
    public class AuthService: IAuthService
    {
        private readonly IAuthRepository authRepository;

        public AuthService(IAuthRepository authRepository)
        {
            this.authRepository = authRepository;
        }

        public async Task RegisterService(UserModel user)
        {
            if (await authRepository.CheckName(user.Login)) { throw new Exception("Логин уже занят!"); }

            var hashedPassword = HashPassword.GetHash(user.Password); // хеширование пароля
            user.Password = hashedPassword;
            
            await authRepository.AddUserToDataBase(user);
        }

        public async Task<UserModel> LoginService(string login, string password)
        {
            var hashedPassword = HashPassword.GetHash(password);

            var dbUser = await authRepository.GetUserFromDataBase(login, hashedPassword);

            if (dbUser == null) { throw new Exception("Такого пользователя нет!"); } 

            return dbUser;
        }
    }
}