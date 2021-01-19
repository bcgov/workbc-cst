using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public class OccupationListItemContext : DbContext, IOccupationListItemContext
    {
        public OccupationListItemContext(DbContextOptions<OccupationListItemContext> options)
            : base(options)
        {
        }

        public DbContext Instance => this;

        public DbSet<OccupationListItem> OccupationListItems { get; set; }

        public bool IsSQLServer
        {
            get { return this.Database.IsSqlServer(); }
            set { return; }
        }

        public List<OccupationListItem> FromSQLRaw(string rawSQL, params object[] parameters)
        {
            return this.OccupationListItems.FromSqlRaw(rawSQL, parameters).ToList();
        }
    }
}
