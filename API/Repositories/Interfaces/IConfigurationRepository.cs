using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories.Interfaces
{
    public interface IConfigurationRepository
    { 
        Configuration GetConfigurationFor(ConfigurationSetting setting);
    }
}