using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.DbContexts
{
    public class GeographicAreasContext : DbContext, IGeographicAreasContext
    {
        public DbContext Instance => this;
        public DbSet<GeographicArea> GeographicAreas { get; set; }

        public GeographicAreasContext(DbContextOptions<GeographicAreasContext> options)
            : base(options)
        {
        }
    }
}