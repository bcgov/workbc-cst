using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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
            return _context.OccupationalGroups
                .AsNoTracking()
                .Where(o => o.Value != "All Occupations")
                .ToList();
        }
    }
}