using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public interface IOccupationContext : IDbContext
    {
        DbSet<Occupation> Occupations { get; set; }

        DbContext Instance { get; }

        public List<Occupation> FromSQLRaw(string rawSQL, params object[] parameters);
    }
}