using System.Text.Json.Serialization;
using backend.Data;
using backend.interfaces;
using backend.Repositories;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Добавляем сервися в контейнер
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Подключение к бд
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Регистрация репозиториев
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IProfileRepository, ProfileRepository>();

// Регистрация сервисов
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IProfileService, ProfileService>();

// Добавление контроллеров
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    });

// Добавление Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder
            .WithOrigins("http://localhost:3000") 
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials(); 
    });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("CorsPolicy");

// Configure endpoints for controllers 
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();