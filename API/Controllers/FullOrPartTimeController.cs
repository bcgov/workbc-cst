using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FullOrPartTimeController : ApiControllerBase
    {
        private readonly IFullOrPartTimeContext _context;
        private readonly IFullOrPartTimeRepository _repository;

        public FullOrPartTimeController(FullOrPartTimeContext context)
        {
            _context = context;
            _repository = new FullOrPartTimesRepository(context);
        }

        // GET: api/FullOrPartTime
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FullOrPartTime>>> GetFullOrPartTime()
        {
            return _repository.GetFullOrPartTimes();
        }
    }
}
