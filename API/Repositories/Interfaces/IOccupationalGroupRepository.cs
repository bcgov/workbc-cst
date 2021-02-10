using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories.Interfaces
{
    public interface IOccupationalGroupRepository
    {
        List<OccupationalGroup> GetOccupationalGroups();
    }
}