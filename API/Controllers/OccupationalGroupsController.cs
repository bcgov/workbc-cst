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
    public class OccupationalGroups : ApiControllerBase
    {
        public OccupationalGroups()
        {
        }

        // GET: api/OccupationalGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OccupationalGroup>>> GetOccupationalGroups()
        {
            return GetPlaceHolderData<OccupationalGroup>("SampleJsonFiles/occupationalgroups.json");
        }
    }
}
