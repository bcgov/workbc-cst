using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class OccupationalGroupsRepository : IOccupationalGroupRepository
    {
        private readonly IOccupationalGroupContext _context;

        public OccupationalGroupsRepository(IOccupationalGroupContext dbContext)
        {
            _context = dbContext;
        }

        public List<OccupationalGroup> GetOccupationalGroups()
        {
            if (_context.IsSQLServer)
                return _context.OccupationalGroups
                    .AsNoTracking()
                    .Where(o => o.Value != "All Occupations")
                    .ToList();

            return ContextHelper.GetPlaceHolderData<OccupationalGroup>("SampleJsonFiles/occupationalgroups.json");
        }
    }
}