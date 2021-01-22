using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AnnualSalariesController : ApiControllerBase
    {
        private readonly AnnualSalaryRepository _repository;

        public AnnualSalariesController()
        {
            _repository = new AnnualSalaryRepository();
        }

        // GET: api/AnnualSalaries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnnualSalary>>> GetAnnualSalaries()
        {
            return _repository.GetAnnualSalaries();
        }
    }
}
