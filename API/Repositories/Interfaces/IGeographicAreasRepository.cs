using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories.Interfaces
{
    public interface IGeographicAreasRepository
    {
        List<GeographicArea> GetGeographicAreas();
        int GetBritishColumbiaId();
    }
}