using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FullTimeOrPartTime : ApiControllerBase
    {
        public FullTimeOrPartTime()
        {
        }

        // GET: api/FullTimeOrPartTime
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartTimeOrFullTime>>> GetFullTimeOrPartTime()
        {
            return GetPlaceHolderData<PartTimeOrFullTime>("SampleJsonFiles/fullorparttime.json");
        }
    }
}
