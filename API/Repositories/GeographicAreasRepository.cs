using System.Collections.Generic;
using System.Linq;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class GeographicAreasRepository : IGeographicAreasRepository
    {
        private readonly IGeographicAreasContext _context;

        public GeographicAreasRepository(IGeographicAreasContext dbContext)
        {
            _context = dbContext;
        }

        public List<GeographicArea> GetGeographicAreas()
        {
            if (_context.IsSQLServer)
                return _context.GeographicAreas.ToList();

            return ContextHelper.GetPlaceHolderData<GeographicArea>("SampleJsonFiles/geographicareas.json");
        }
    }
}
