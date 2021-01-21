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
    public class IndustriesController : ApiControllerBase
    {
        private readonly IIndustryContext _context;
        private readonly IIndustryRepository _repository;
        
        public IndustriesController(IndustryContext context)
        {
            _context = context;
            _repository = new IndustryRepository(context);
        }

        // GET: api/Industries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Industry>>> GetIndustries()
        {
            return _repository.GetIndustries();
        }
    }
}
