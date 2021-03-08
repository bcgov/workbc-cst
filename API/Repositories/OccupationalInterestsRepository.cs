using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class OccupationalInterestsRepository : IOccupationalInterestsRepository
    {
        private readonly IOccupationalInterestContext _context;

        public OccupationalInterestsRepository(IOccupationalInterestContext dbContext)
        {
            _context = dbContext;
        }

        public List<OccupationalInterest> GetOccupationalInterests()
        {
            return _context.OccupationalInterests
                .AsNoTracking()
                .ToList();
        }
    }
}