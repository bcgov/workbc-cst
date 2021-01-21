using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EducationLevelsController : ApiControllerBase
    {
        private readonly EducationLevelContext _context;
        private readonly IEducationLevelRepository _repository;

        public EducationLevelsController(EducationLevelContext context)
        {
            _context = context;
            _repository = new EducationLevelRepository(context);
        }

        // GET: api/EducationLevels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EducationLevel>>> GetEducationLevels()
        {
            return _repository.GetEducationLevels();
        }
    }
}
