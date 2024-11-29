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
            if (await authRepository.CheckName(user.Login)) // проверка есть ли такой логин в бд
            {
                throw new Exception("Логин уже занят");
            }

            var hashedPassword = HashPassword.GetHash(user.Password); // хеширование пароля
            user.Password = hashedPassword;
            
            await authRepository.AddUser(user);
        }
    }
}