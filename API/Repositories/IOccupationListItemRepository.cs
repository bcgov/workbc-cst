using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public interface IOccupationListItemRepository
    {
        List<OccupationListItem> GetOccupationListItems(string partialNocOrTitle);
    }
}