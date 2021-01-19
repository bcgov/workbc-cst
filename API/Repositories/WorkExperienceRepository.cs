using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class WorkExperienceRepository : IWorkExperienceRepository
    {
        private IWorkExperienceContext _context;

        public WorkExperienceRepository(IWorkExperienceContext dbContext)
        {
            _context = dbContext;
        }

        public List<WorkExperience> GetWorkExperiences()
        {
            //if (_context.Database.IsSqlServer())
            if (_context.IsSQLServer)
            {
                return _context.WorkExperiences.ToList();
            }
            else
            {
                List<WorkExperience> WorkExperiences = new List<WorkExperience>(){
                    new WorkExperience() {
                        Id = 1,
                        Value = "None"
                    },
                    new WorkExperience() {
                        Id = 2,
                        Value = "< 1 year"
                    },
                    new WorkExperience() {
                        Id = 3,
                        Value = "> 1 year to 4 years"
                    },
                    new WorkExperience() {
                        Id = 4,
                        Value = "> 4 years to 10 years"
                    }
                };
                return WorkExperiences;
            }
            //return await _context.WorkExperiences.ToListAsync();
        }
    }
}
