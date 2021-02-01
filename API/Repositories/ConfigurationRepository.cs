using Microsoft.Extensions.Configuration;
using SearchAllOccupationsToolAPI.Extensions;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class ConfigurationRepository : IConfigurationRepository
    {
        private readonly IConfiguration _configuration;

        public ConfigurationRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Configuration GetConfigurationFor(ConfigurationSetting setting)
        {
            switch (setting)
            {
                case ConfigurationSetting.ProfileImagesPath:
                    return GetConfigurationSetting(setting, "SharedImagesProfilesBaseURL");

                case ConfigurationSetting.BackgroundImagesPath:
                    return GetConfigurationSetting(setting, "SharedImagesBackgroundsBaseURL");

                case ConfigurationSetting.CareerProfileBaseUrl:
                    return GetConfigurationSetting(setting, "CareerProfileBaseUrl");

                case ConfigurationSetting.JobOpeningsBaseUrl:
                    return GetConfigurationSetting(setting, "CareerJobOpeningsBaseUrl");
                
                case ConfigurationSetting.CareerTrekVideoBaseUrl:
                    return GetConfigurationSetting(setting, "CareerTrekVideoBaseUrl");

                default:
                    return new Configuration
                    {
                        Id = -1,
                        Name = "NotFound",
                        Value = "Setting not found"
                    };
            }
        }

        private Configuration GetConfigurationSetting(ConfigurationSetting settingName, string configString)
        {
            return new Configuration
            {
                Id = (int)settingName,
                Name = settingName.GetDescription(),
                Value = _configuration[configString]
            };
        }
    }
}
