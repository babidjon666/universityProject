namespace backend.models
{
    public class UserModel // класс пользователя
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Login { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public required BaseRoleModel Role { get; set; }
    }
}