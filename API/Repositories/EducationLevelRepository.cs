using System.Collections.Generic;
using System.Linq;
using SearchAllOccupationsToolAPI.DbContexts;
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
            if (_context.IsSQLServer)
                return _context.EducationLevels.ToList();
            
            return ContextHelper.GetPlaceHolderData<EducationLevel>("SampleJsonFiles/educationlevels.json");
        }
    }
}
