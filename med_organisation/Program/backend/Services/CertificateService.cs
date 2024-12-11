using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.interfaces;
using backend.models;
using Pomelo.EntityFrameworkCore.MySql.Storage.Internal;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

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

        public async Task<byte[]> GeneratePDFService(int certificateId)
        {
            var certificate = await certificateRepository.GetCertificateFromDb(certificateId);
            var client = await certificateRepository.GetUserFromDB(certificate.UserId);
            var doctor = await certificateRepository.GetUserFromDB(certificate.DoctorId);

            var pdf = GeneratePDF(client, doctor, certificate);

            return pdf;
        }

        private byte[] GeneratePDF(UserModel client, UserModel doctor, Certificate certificate)
        {
            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.DefaultTextStyle(x => x.FontSize(14));

                    // Header
                    page.Header()
                        .AlignCenter()
                        .Text("Certificate of absence confirming the absence of drug addiction and infectious diseases")
                        .SemiBold().FontSize(24).FontColor(Colors.Blue.Medium);

                    // Content
                    page.Content()
                        .PaddingVertical(1, Unit.Centimetre)
                        .Column(col =>
                        {
                            col.Item()
                                .Table(table =>
                                {
                                    table.ColumnsDefinition(columns =>
                                    {
                                        columns.RelativeColumn();
                                        columns.RelativeColumn();
                                    });

                                    table.Cell().Row(1).Column(1).Element(CellStyle).Text("Patient:");
                                    table.Cell().Row(1).Column(2).Element(CellStyle).Text($"{client.Name} {client.Surname}");

                                    table.Cell().Row(2).Column(1).Element(CellStyle).Text("Doctor:");
                                    table.Cell().Row(2).Column(2).Element(CellStyle).Text($"{doctor.Name} {doctor.Surname}");

                                    table.Cell().Row(3).Column(1).Element(CellStyle).Text("Date of issue:");
                                    table.Cell().Row(3).Column(2).Element(CellStyle).Text($"{certificate.DateTime:dd.MM.yyyy}");
                                });

                            col.Item()
                                .PaddingTop(1, Unit.Centimetre)
                                .Text("Additional information:")
                                .SemiBold();

                            col.Item()
                                .Text($"Patient {client.Name} {client.Surname} underwent a medical examination by a doctor {doctor.Name} {doctor.Surname} as of date {certificate.DateTime:dd.MM.yyyy}. The certificate is valid for submission to organizations and institutions.")
                                .FontSize(12);
                        });
                });
            })
            .GeneratePdf();
        }

        static IContainer CellStyle(IContainer container)
        {
            return container.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).PaddingVertical(5);
        }
    }
}