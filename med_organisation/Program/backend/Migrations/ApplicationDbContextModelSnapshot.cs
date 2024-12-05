﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.HasSequence("TestResultSequence");

            modelBuilder.Entity("backend.models.Atributes.Patient", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfIssue")
                        .HasColumnType("datetime2");

                    b.Property<string>("DocumentNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("INN")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IssuedBy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Nationality")
                        .HasColumnType("int");

                    b.Property<string>("PatentTerritory")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Serie")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("backend.models.Attributes.Passport", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("CodeOfState")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOfExpiry")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOfIssue")
                        .HasColumnType("datetime2");

                    b.Property<string>("DocumentNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IssuingAuthority")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Nationality")
                        .HasColumnType("int");

                    b.Property<string>("PlaceOfBirthday")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlaceOfResidence")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Serie")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Sex")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Passports");
                });

            modelBuilder.Entity("backend.models.Profile", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("backend.models.ReferralForTesting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("TestType")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("ReferralForTesting");
                });

            modelBuilder.Entity("backend.models.Request", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("DescriptionOfGoal")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DoctorId")
                        .HasColumnType("int");

                    b.Property<int>("RequestStatus")
                        .HasColumnType("int");

                    b.Property<string>("Time")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("backend.models.Settings", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Deadlines")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Terms")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("backend.models.TestResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValueSql("NEXT VALUE FOR [TestResultSequence]");

                    SqlServerPropertyBuilderExtensions.UseSequence(b.Property<int>("Id"));

                    b.Property<int>("TestType")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("TestResult");

                    b.UseTpcMappingStrategy();
                });

            modelBuilder.Entity("backend.models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleName")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.models.ClinicalBloodTestResult", b =>
                {
                    b.HasBaseType("backend.models.TestResult");

                    b.Property<double>("Basophils")
                        .HasColumnType("float");

                    b.Property<double>("ColorIndex")
                        .HasColumnType("float");

                    b.Property<double>("Eosinophils")
                        .HasColumnType("float");

                    b.Property<double>("ErythrocyteSedimentation")
                        .HasColumnType("float");

                    b.Property<double>("Hemoglobin")
                        .HasColumnType("float");

                    b.Property<double>("Leukocytes")
                        .HasColumnType("float");

                    b.Property<double>("Lymphocytes")
                        .HasColumnType("float");

                    b.Property<double>("Monocytes")
                        .HasColumnType("float");

                    b.Property<double>("Platelets")
                        .HasColumnType("float");

                    b.Property<double>("RedBloobCells")
                        .HasColumnType("float");

                    b.ToTable("ClinicalBloodTestResult", (string)null);
                });

            modelBuilder.Entity("backend.models.ClinicalUrineTestResult", b =>
                {
                    b.HasBaseType("backend.models.TestResult");

                    b.Property<double>("Acidity")
                        .HasColumnType("float");

                    b.Property<bool>("Bilirubin")
                        .HasColumnType("bit");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Density")
                        .HasColumnType("float");

                    b.Property<bool>("Glucose")
                        .HasColumnType("bit");

                    b.Property<double>("Leukocytes")
                        .HasColumnType("float");

                    b.Property<bool>("Nitrites")
                        .HasColumnType("bit");

                    b.Property<double>("Protien")
                        .HasColumnType("float");

                    b.Property<double>("RedBloobCells")
                        .HasColumnType("float");

                    b.Property<double>("Urobilinogen")
                        .HasColumnType("float");

                    b.ToTable("ClinicalUrineTestResult", (string)null);
                });

            modelBuilder.Entity("backend.models.Atributes.Patient", b =>
                {
                    b.HasOne("backend.models.Profile", null)
                        .WithOne("Patient")
                        .HasForeignKey("backend.models.Atributes.Patient", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.models.Attributes.Passport", b =>
                {
                    b.HasOne("backend.models.Profile", null)
                        .WithOne("Passport")
                        .HasForeignKey("backend.models.Attributes.Passport", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.models.Profile", b =>
                {
                    b.HasOne("backend.models.UserModel", null)
                        .WithOne("Profile")
                        .HasForeignKey("backend.models.Profile", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.models.ReferralForTesting", b =>
                {
                    b.HasOne("backend.models.UserModel", "User")
                        .WithMany("ReferralsForTesting")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.models.Request", b =>
                {
                    b.HasOne("backend.models.UserModel", "User")
                        .WithMany("Requests")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.models.TestResult", b =>
                {
                    b.HasOne("backend.models.UserModel", "User")
                        .WithMany("TestResults")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.models.Profile", b =>
                {
                    b.Navigation("Passport");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("backend.models.UserModel", b =>
                {
                    b.Navigation("Profile");

                    b.Navigation("ReferralsForTesting");

                    b.Navigation("Requests");

                    b.Navigation("TestResults");
                });
#pragma warning restore 612, 618
        }
    }
}
