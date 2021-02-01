using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Controllers
{
    //[Route("api/[controller]")]
    [Route("[controller]")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        private IConfigurationRepository _repo;
        private IConfiguration _configuration;

        public ConfigurationController(IConfiguration configuration)
        {
            _configuration = configuration;
            _repo = new ConfigurationRepository(_configuration);
        }

        // GET: api/Configurations
        [HttpGet]
        public async Task<ActionResult<Configuration>> GetConfigurations([FromQuery] string settingName)
        {
            if (!Enum.TryParse<ConfigurationSetting>(settingName, true, out var attemptedSetting))
                return new Configuration
                {
                    Id = -1,
                    Name = "NotFound",
                    Value = "Setting not found"
                };

            Configuration configuration;
            return _repo.GetConfigurationFor(attemptedSetting);
            
            
            
            switch (attemptedSetting)
            {
                case ConfigurationSetting.ProfileImagesPath:
                    configuration = new Configuration
                    {
                        Id = 1,
                        Name = "ProfileImagesPath",
                        Value = "https://www.workbc.ca/careertransitiontool/HostedImages/Profiles/"
                    };
                    break;

                case ConfigurationSetting.CareerProfileBaseUrl:
                    configuration = new Configuration
                    {
                        Id = 2,
                        Name = "CareerProfileBaseURL",
                        Value = "https://www.workbc.ca/Jobs-Careers/Explore-Careers/Browse-Career-Profile/"
                    };
                    break;

                case ConfigurationSetting.JobOpeningsBaseUrl:
                    configuration = new Configuration
                    {
                        Id = 3,
                        Name = "JobOpeningsBaseURL",
                        Value = "https://www.workbc.ca/jobs-careers/find-jobs/jobs.aspx?searchNOC="
                    };
                    break;

                case ConfigurationSetting.CareerTrekVideoBaseUrl:
                    configuration = new Configuration
                    {
                        Id = 4,
                        Name = "CareerTrekVideoBaseURL",
                        Value = "https://www.youtube.com/watch?v="
                    };
                    break;

                default:
                    configuration = new Configuration
                    {
                        Id = -1,
                        Name = "NotFound",
                        Value = "Setting not found"
                    };
                    break;
            }

            return configuration;
        }
    }
}
