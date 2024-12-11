using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.interfaces;
using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class CertificateRepository : BaseRepository, ICertificateRepository
    {
        public CertificateRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CreateCertificateAtDB(Certificate certificate)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == certificate.UserId);

            if (user == null)
            {
                throw new Exception("Пользователь не найден в бд");
            }
            certificate.User = user;
            _context.Certificates.Add(certificate);
            await Save();
        }

        public async Task<IEnumerable<Certificate>> GetUsersCertificatesFromDB(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("Пользователь не найден в бд");
            }

            var certificates = await _context.Certificates
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return certificates;
        }

        public async Task<UserModel> GetUserFromDB(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("Пользователь не найден в бд");
            }

            return user;
        }

        public async Task<Certificate> GetCertificateFromDb(int certificateId)
        {
            var certificate = await _context.Certificates.FirstOrDefaultAsync(c => c.Id == certificateId);

            if (certificate == null)
            {
                throw new Exception("Справка не найдена в бд");
            }

            return certificate;
        }
    }
}