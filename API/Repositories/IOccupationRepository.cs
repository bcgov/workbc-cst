using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public interface IOccupationRepository
    {
        List<Occupation> GetNocList(string nocs);
        List<OccupationListItem> GetOccupations(OccupationSearchFilter filter);
    }
}