using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;

namespace backend.interfaces
{
    public interface ICertificateService
    {
        Task CreateCertificateService(int userId, DateTime date, int doctorId);
        Task<IEnumerable<Certificate>> GetUserCertificatesService(int userId);
    }
}