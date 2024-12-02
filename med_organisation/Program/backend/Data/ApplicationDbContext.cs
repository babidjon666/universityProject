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
        public DbSet<Settings> Settings { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Настройка связи между UserModel и Request (1:N)
            modelBuilder.Entity<Request>()
                .HasOne(r => r.User)       // Связь Request -> UserModel
                .WithMany(u => u.Requests) // Обратная связь UserModel -> Requests
                .HasForeignKey(r => r.UserId) // Внешний ключ - поле UserId
                .OnDelete(DeleteBehavior.Cascade); // При удалении пользователя - удалять его запросы


            modelBuilder.Entity<UserModel>()
                .HasOne(u => u.Profile)
                .WithOne()
                .HasForeignKey<Profile>(p => p.Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Profile>()
                .HasOne(p => p.Passport)
                .WithOne()
                .HasForeignKey<Passport>(ps => ps.Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Profile>()
                .HasOne(p => p.Patient)
                .WithOne()
                .HasForeignKey<Patient>(pa => pa.Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Profile>()
                .HasOne(p => p.MedCard)
                .WithOne()
                .HasForeignKey<MedCard>(mc => mc.Id)
                .OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(modelBuilder);
        }
    }
}