using System.ComponentModel.DataAnnotations.Schema;
using backend.enums;
using backend.models.Atributes;
using backend.models.Attributes;

namespace backend.models
{
    public class Profile // класс для профиля
    {
        public int Id { get; set; }
        public Patient? Patient { get; set; } 
        public Passport? Passport { get; set; } 
    }
}