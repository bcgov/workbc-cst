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
        public async Task<ActionResult<Configuration>> GetConfigurations([FromQuery] ConfigurationSetting settingName)
        {
            return _repo.GetConfigurationFor(settingName);
        }
    }
}
