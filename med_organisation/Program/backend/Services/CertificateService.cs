using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.interfaces;
using backend.models;

namespace backend.Services
{
    public class CertificateService: ICertificateService
    {
        private readonly ICertificateRepository certificateRepository;

        public CertificateService(ICertificateRepository certificateRepository)
        {
            this.certificateRepository = certificateRepository;
        }

        public async Task CreateCertificateService(int userId, DateTime date, int doctorId)
        {
            if (userId < 0 || doctorId < 0)
            {
                throw new Exception("Пользователей с id меньше нуля не существует");
            }

            var certificate = new Certificate{
                DateTime = date,
                UserId = userId,
                DoctorId = doctorId
            };

            await certificateRepository.CreateCertificateAtDB(certificate);
        }

        public async Task<IEnumerable<Certificate>> GetUserCertificatesService(int userId)
        {
            if (userId < 0)
            {
                throw new Exception("Пользователя с id меньше нуля не существует");
            }

            return await certificateRepository.GetUsersCertificatesFromDB(userId);
        }
    }
}