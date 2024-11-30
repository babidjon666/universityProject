using backend.models;
using backend.models.Atributes;
using backend.models.Attributes;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Passport> Passports { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<MedCard> MedCards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Настройка связи между UserModel и Profile (1:1)
            modelBuilder.Entity<UserModel>()
                .HasOne(u => u.Profile)
                .WithOne()
                .HasForeignKey<Profile>(p => p.Id) // Profile.Id будет использоваться как внешний ключ
                .OnDelete(DeleteBehavior.Cascade); // Каскадное удаление профиля при удалении пользователя

            // Настройка связи Profile -> Requests (1:M)
            modelBuilder.Entity<Profile>()
                .HasMany(p => p.Requests)
                .WithOne()
                .OnDelete(DeleteBehavior.Restrict); // Удаление Profile не удаляет Requests

            // Настройка связи Profile -> Passport (1:1)
            modelBuilder.Entity<Profile>()
                .HasOne(p => p.Passport)
                .WithOne()
                .HasForeignKey<Passport>(ps => ps.Id) // Passport.Id будет внешний ключ
                .OnDelete(DeleteBehavior.Cascade);

            // Настройка связи Profile -> Patient (1:1)
            modelBuilder.Entity<Profile>()
                .HasOne(p => p.Patient)
                .WithOne()
                .HasForeignKey<Patient>(pa => pa.Id) // Patient.Id как внешний ключ
                .OnDelete(DeleteBehavior.Cascade);

            // Настройка связи Profile -> MedCard (1:1)
            modelBuilder.Entity<Profile>()
                .HasOne(p => p.MedCard)
                .WithOne()
                .HasForeignKey<MedCard>(mc => mc.Id) // MedCard.Id как внешний ключ
                .OnDelete(DeleteBehavior.Cascade);

            // Дополнительные настройки
            base.OnModelCreating(modelBuilder);
        }
    }
}