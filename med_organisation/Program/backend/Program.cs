using System.Text.Json.Serialization;
using backend.Data;
using backend.interfaces;
using backend.Repositories;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Указываем порты для HTTP и HTTPS
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000);  // Порт для HTTP
    options.ListenAnyIP(5001, listenOptions => // Порт для HTTPS
    {
        listenOptions.UseHttps();  // Используем HTTPS
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Регистрация сервисов
builder.Services.AddScoped<IAuthService, AuthService>();

// Регистрация репозиториев
builder.Services.AddScoped<IAuthRepository, AuthRepository>();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); // Редирект с HTTP на HTTPS
app.UseRouting();

app.Run();
