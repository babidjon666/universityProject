using backend.Data;
using backend.interfaces;
using backend.models;
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

        public async Task AddUser(UserModel user)
        {
            _context.Users.Add(user);
            await Save();
        }
    }
}