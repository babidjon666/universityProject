using backend.enums;

namespace backend.models.Atributes
{
    public class Patient // патент
    {
        public int Id { get; set; }
        public string DocumentNumber { get; set; } = string.Empty; // номер документа
        public string Serie { get; set; } = string.Empty; // серия документа
        public string INN { get; set; } = string.Empty; // ИНН
        public string PatentTerritory { get; set; } = string.Empty; // территория патента
        public string IssuedBy { get; set; } = string.Empty; // кем выдан 
        public Nationality Nationality { get; set; } // национальность
        public DateTime DateOfIssue { get; set; } // дата выдачи
    }
}