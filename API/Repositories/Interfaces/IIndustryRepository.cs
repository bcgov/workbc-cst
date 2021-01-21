using System.Collections.Generic;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories.Interfaces
{
    public interface IIndustryRepository
    {
        List<Industry> GetIndustries();
    }
}