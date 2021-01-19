using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EducationLevelsController : ApiControllerBase
    {
        public EducationLevelsController()
        {
        }

        // GET: api/EducationLevels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EducationLevel>>> GetEducationLevels()
        {
            return GetPlaceHolderData<EducationLevel>("SampleJsonFiles/educationlevels.json");
        }
    }
}
