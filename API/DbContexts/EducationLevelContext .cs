using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public class EducationLevelContext : DbContext, IEducationLevelContext
    {
        public EducationLevelContext(DbContextOptions<EducationLevelContext> options)
            : base(options)
        {
        }
        public DbContext Instance => this;

        public DbSet<EducationLevel> EducationLevels { get; set; }

        public bool IsSQLServer { 
            get { return this.Database.IsSqlServer(); }
            set { return; }
        }
    }
}
