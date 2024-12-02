using backend.Data;
using backend.interfaces;
using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class SettingsRepository : BaseRepository, ISettingsRepository
    {
        public SettingsRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CreateSettingRepository(Settings settings)
        {
            _context.Settings.Add(settings);
            await Save();
        }

        public async Task DeleteSettingsRepository(int settingsId)
        {
            var settings = await _context.Settings.FindAsync(settingsId);
            
            if (settings != null)
            {
                _context.Settings.Remove(settings);
                await Save();
            }
            else
            {
                throw new KeyNotFoundException($"Setting with ID {settingsId} not found.");
            }
        }

        public async Task<IEnumerable<Settings>> GetSettingsRepository()
        {
            return await _context.Settings.ToListAsync();
        }
    }
}