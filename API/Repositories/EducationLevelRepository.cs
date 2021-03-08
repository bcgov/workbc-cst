using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class EducationLevelRepository : IEducationLevelRepository
    {
        private readonly IEducationLevelContext _context;

        public EducationLevelRepository(IEducationLevelContext dbContext)
        {
            _context = dbContext;
        }

        public List<EducationLevel> GetEducationLevels()
        {
            return _context.EducationLevels
                .AsNoTracking()
                .ToList();
        }
    }
}
