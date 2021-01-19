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

namespace SearchAllOccupationsToolAPI.Controllers
{
    //[Route("api/[controller]")]
    [Route("[controller]")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        private IConfigurationRepository _repo;

        private IConfiguration _configuration;

        public ConfigurationController( //SalaryContext context, 
            IConfiguration configuration)
        {
            //_context = context;
            _configuration = configuration;
            _repo = new ConfigurationRepository(_configuration);
        }

        // GET: api/Configurations
        [HttpGet]
        public async Task<ActionResult<Configuration>> GetConfigurations([FromQuery] string settingName)
        {
            Configuration configuration;
            switch (settingName.ToLower())
            {
                case "profileimagespath":
                    configuration = new Configuration
                    {
                        Id = 1,
                        Name = "ProfileImagesPath",
                        Value = "https://www.workbc.ca/careertransitiontool/HostedImages/Profiles/"
                    };
                    break;

                case "careerprofilebaseurl":
                    configuration = new Configuration
                    {
                        Id = 2,
                        Name = "CareerProfileBaseURL",
                        Value = "https://www.workbc.ca/Jobs-Careers/Explore-Careers/Browse-Career-Profile/"
                    };
                    break;

                case "jobopeningsbaseurl":
                    configuration = new Configuration
                    {
                        Id = 3,
                        Name = "JobOpeningsBaseURL",
                        Value = "https://www.workbc.ca/jobs-careers/find-jobs/jobs.aspx?searchNOC="
                    };
                    break;

                case "careertrekvideobaseurl":
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
