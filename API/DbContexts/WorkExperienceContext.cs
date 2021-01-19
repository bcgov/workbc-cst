using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public class WorkExperienceContext : DbContext, IWorkExperienceContext
    {
        public WorkExperienceContext(DbContextOptions<WorkExperienceContext> options)
            : base(options)
        {
        }

        public DbContext Instance => this;

        public DbSet<WorkExperience> WorkExperiences { get; set; }
        public bool IsSQLServer
        {
            get { return this.Database.IsSqlServer(); }
            set { return; }
        }
    }
}
