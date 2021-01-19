using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public interface IConfigurationRepository
    { 
        List<Configuration> GetConfigurations();
        List<Configuration> GetConfigurations(string settingName); 
    }
}