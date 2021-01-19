using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public class OccupationContext : DbContext, IOccupationContext
    {
        public OccupationContext(DbContextOptions<OccupationContext> options)
            : base(options)
        {
        }

        public DbContext Instance => this;

        public DbSet<Occupation> Occupations { get; set; }

        public bool IsSQLServer
        {
            get { return this.Database.IsSqlServer(); }
            set { return; }
        }

        public List<Occupation> FromSQLRaw(string rawSQL, params object[] parameters)
        {
            return this.Occupations.FromSqlRaw(rawSQL, parameters).ToList();
        }
    }
}
