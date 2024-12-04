using backend.Data;
using backend.interfaces;
using backend.models;
using backend.models.Atributes;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class AuthRepository : BaseRepository, IAuthRepository
    {
        public AuthRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<bool> CheckName(string cheackedLogin) // проверка зареган ли такой логин
        {
            return await _context.Users.AnyAsync(u => u.Login == cheackedLogin);
        }

        public async Task AddUserToDataBase(UserModel user) // добавить пользователя в бд
        {
            _context.Users.Add(user);
            await Save();
        }

        public async Task<UserModel> GetUserFromDataBase(string login, string hashedPassword)
        {
            var dbUser = await _context.Users
                            .FirstOrDefaultAsync(u => u.Login == login && u.Password == hashedPassword);

            if (dbUser == null)
            {
                throw new Exception("Пользователь не найден в бд");
            }
            
            return dbUser;
        }
    }
}