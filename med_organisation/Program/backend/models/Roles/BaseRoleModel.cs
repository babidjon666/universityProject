using backend.enums;

namespace backend.models
{
    public class BaseRoleModel // родительский класс для ролей 
    {
        public int Id { get; set; }
        public RoleName RoleName { get; set; } 
    }
}