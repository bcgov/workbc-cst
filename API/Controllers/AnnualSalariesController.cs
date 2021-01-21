using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AnnualSalariesController : ApiControllerBase
    {
        public AnnualSalariesController()
        {
        }

        // GET: api/AnnualSalaries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnnualSalary>>> GetAnnualSalaries()
        {
            return GetAnnualSalaryRanges();
        }
    }
}
