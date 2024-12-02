namespace backend.models
{
    public class Settings // класс условий
    {
        public int Id { get; set; }
        public string Deadlines { get; set; } = string.Empty;
        public string Terms { get; set; } = string.Empty;
    }
}