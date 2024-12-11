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
        public DbSet<Settings> Settings { get; set; }
        public DbSet<ReferralForTesting> ReferralForTesting { get; set; }
        public DbSet<ClinicalUrineTestResult> ClinicalUrineTestResults { get; set; } 
        public DbSet<ClinicalBloodTestResult> ClinicalBloodTestResults { get; set; } 
        public DbSet<BloodTestForHIVResult> BloodTestForHIVResults { get; set; } 
        public DbSet<BloodTestForSyphilisResult> BloodTestForSyphilisResults { get; set; } 
        public DbSet<UrineAnalysisForDrugsAndPsychotropicsResult> UrineAnalysisForDrugsAndPsychotropicsResults { get; set; } 
        public DbSet<Certificate> Certificates { get; set; } 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Настройка связи между UserModel и Request (1:N)
            modelBuilder.Entity<Request>()
                .HasOne(r => r.User)       
                .WithMany(u => u.Requests) 
                .HasForeignKey(r => r.UserId) 
                .OnDelete(DeleteBehavior.Cascade); 

            modelBuilder.Entity<Certificate>()
                .HasOne(r => r.User)       
                .WithMany(u => u.Certificates) 
                .HasForeignKey(r => r.UserId) 
                .OnDelete(DeleteBehavior.Cascade); 

             modelBuilder.Entity<ReferralForTesting>()
                .HasOne(r => r.User)       
                .WithMany(u => u.ReferralsForTesting) 
                .HasForeignKey(r => r.UserId) 
                .OnDelete(DeleteBehavior.Cascade); 

            modelBuilder.Entity<TestResult>()
                .HasOne(r => r.User)       
                .WithMany(u => u.TestResults) 
                .HasForeignKey(r => r.UserId) 
                .OnDelete(DeleteBehavior.Cascade); 

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

            modelBuilder.Entity<TestResult>().UseTpcMappingStrategy();
            modelBuilder.Entity<ClinicalBloodTestResult>().ToTable("ClinicalBloodTestResult");
            modelBuilder.Entity<ClinicalUrineTestResult>().ToTable("ClinicalUrineTestResult");
            modelBuilder.Entity<BloodTestForHIVResult>().ToTable("BloodTestForHIVResult");
            modelBuilder.Entity<BloodTestForSyphilisResult>().ToTable("BloodTestForSyphilisResult");
            modelBuilder.Entity<UrineAnalysisForDrugsAndPsychotropicsResult>().ToTable("UrineAnalysisForDrugsAndPsychotropicsResult");
        }
    }
}