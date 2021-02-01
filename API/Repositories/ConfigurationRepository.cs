using System.IO;
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

                case ConfigurationSetting.ImageCarouselNOCs:
                    return GetImageCarouselNOCs(setting, "ImageCarouselNOCConfigLocalPath");

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

        private Configuration GetImageCarouselNOCs(ConfigurationSetting settingName, string configString)
        {
            var sr = new StreamReader(_configuration[configString]);
            var nocs = sr.ReadToEnd();
            sr.Close();

            return new Configuration
            {
                Id = (int)settingName,
                Name = settingName.GetDescription(),
                Value = nocs.Trim() // "2122,2175,2234"
            };
        }

    }
}
