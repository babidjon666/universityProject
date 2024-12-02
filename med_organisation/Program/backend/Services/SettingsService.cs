using backend.Data;
using backend.interfaces;
using backend.models;

namespace backend.Services
{
    public class SettingsService: ISettingsService
    {
        private readonly ISettingsRepository settingsRepository;

        public SettingsService(ISettingsRepository settingsRepository)
        {
            this.settingsRepository = settingsRepository;
        }

        public async Task CreateSettingsService(Settings settings)
        {
            await settingsRepository.CreateSettingRepository(settings);
        }

        public async Task DeleteSettingsService(int settingsId)
        {
            await settingsRepository.DeleteSettingsRepository(settingsId);
        }
    }
}