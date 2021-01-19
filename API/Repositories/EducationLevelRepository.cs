using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class EducationLevelRepository : IEducationLevelRepository
    {
        private IEducationLevelContext _context;

        public EducationLevelRepository(IEducationLevelContext dbContext)
        {
            _context = dbContext;
        }

        public List<EducationLevel> GetEducationLevels()
        {
            //if (_context.Database.IsSqlServer())
            if (_context.IsSQLServer)
            {
                return _context.EducationLevels.ToList();
            }
            else
            {
                List<EducationLevel> educationLevels = new List<EducationLevel>(){
                new EducationLevel() {
                    Id = 1,
                    Value = "Less than High School"
                },
                new EducationLevel() {
                    Id = 2,
                    Value = "High School"
                },
                new EducationLevel() {
                    Id = 3,
                    Value = "Diploma/Certificate"
                },
                new EducationLevel() {
                    Id = 4,
                    Value = "Degree"
                }
            };
                return educationLevels;
            }
            //return await _context.EducationLevels.ToListAsync();
        }
    }
}
