using System.Collections.Generic;
using System.Threading.Tasks;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories.Interfaces
{
    public interface IOccupationRepository
    {
        List<Occupation> GetNocList(string nocs);
        Task<List<OccupationListItem>> GetOccupationsAsync(OccupationSearchFilter filter);
    }
}