using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts.Interfaces
{
    public interface IOccupationContext : IDbContext
    {
        DbSet<NOC> NOCs { get; set; }
        DbSet<Occupation> Occupations { get; set; }
    }
}