using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.IO;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class ConfigurationRepository : IConfigurationRepository
    {
        //private IConfigurationContext _context;
        private readonly IConfiguration _configuration;

        public ConfigurationRepository(//IConfigurationContext dbContext, 
            IConfiguration configuration)
        {
            //_context = dbContext;
            _configuration = configuration;
        }

        public List<Configuration> GetConfigurations()
        {
            List<Configuration> configurations = new List<Configuration>();
            configurations.Add(GetImageCarouselNOCs());
            configurations.Add(GetProfileImagesPath());
            configurations.Add(GetBackgroundImagesPath());
            return configurations;
        }

        public List<Configuration> GetConfigurations(string settingName)
        {
            //string a = _configuration["UseSQL"];
            //List<Configuration> configurations = GetConfigurations();
            //return configurations.FindAll(x => x.Name == settingName);

            if(settingName.ToLower() == "ImageCarouselNOCs".ToLower())
            {
                return new List<Configuration> { GetImageCarouselNOCs() };
            }

            if(settingName.ToLower() == "ProfileImagesPath".ToLower())
            {
                return new List<Configuration> { GetProfileImagesPath() };
            }

            if (settingName.ToLower() == "BackgroundImagesPath".ToLower())
            {
                return new List<Configuration> { GetBackgroundImagesPath() };
            }

            return new List<Configuration>();
        }

        private Configuration GetImageCarouselNOCs()
        {
            System.IO.StreamReader sr = new StreamReader(_configuration["ImageCarouselNOCConfigLocalPath"]);
            string nocs = sr.ReadToEnd();
            sr.Close();

            return new Configuration()
            {
                Id = 1,
                Name = "ImageCarouselNOCs",
                Value = nocs.Trim() //"2122,2175,2234"
            };
        }

        private Configuration GetProfileImagesPath()
        {
            return new Configuration()
            {
                Id = 2,
                Name = "ProfileImagesPath",
                //Value = "https://www.workbc.ca/careertransitiontool/HostedImages/Profiles/"
                Value = _configuration["SharedImagesProfilesBaseURL"]
            };
        }

        private Configuration GetBackgroundImagesPath()
        {
            return new Configuration()
            {
                Id = 3,
                Name = "BackgroundImagesPath",
                //Value = "https://www.workbc.ca/careertransitiontool/HostedImages/Backgrounds/"
                Value = _configuration["SharedImagesBackgroundsBaseURL"]
            };
        }
    }
}
