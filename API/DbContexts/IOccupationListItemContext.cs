using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public interface IOccupationListItemContext : IDbContext
    {
        DbSet<OccupationListItem> OccupationListItems { get; set; }
        DbContext Instance { get; }
        public List<OccupationListItem> FromSQLRaw(string rawSQL, params object[] parameters);

    }
}