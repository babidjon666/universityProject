using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;

namespace backend.interfaces
{
    public interface ICertificateRepository
    {
        Task CreateCertificateAtDB(Certificate certificate);
        Task<IEnumerable<Certificate>> GetUsersCertificatesFromDB(int userId);
        Task<UserModel> GetUserFromDB(int userId);
        Task<Certificate> GetCertificateFromDb(int certificateId);
    }
}