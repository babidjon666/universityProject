using backend.models;

namespace backend.interfaces
{
    public interface ISettingsService
    {
        Task CreateSettingsService(Settings settings);
        Task DeleteSettingsService(int settingsId);
    }
}