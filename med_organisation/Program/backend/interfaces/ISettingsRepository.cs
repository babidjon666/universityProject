using backend.models;

namespace backend.interfaces
{
    public interface ISettingsRepository
    {
        Task CreateSettingRepository(Settings settings);
        Task DeleteSettingsRepository(int settingsId);
        Task<IEnumerable<Settings>> GetSettingsRepository();
    }
}