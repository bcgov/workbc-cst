using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Filters;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class OccupationRepository : IOccupationRepository
    {
        private readonly IOccupationContext _context;
        private readonly GeographicAreasRepository _geographicAreasRepository;
        private readonly IndustryRepository _industryRepository;

        public OccupationRepository(IOccupationContext context, IGeographicAreasContext geographicAreasContext, IIndustryContext industryContext)
        {
            _context = context;
            _geographicAreasRepository = new GeographicAreasRepository(geographicAreasContext);
            _industryRepository = new IndustryRepository(industryContext);
        }

        public Task<List<OccupationListItem>> GetOccupationsAsync(OccupationSearchFilter filter)
        {
            // Always force BC if we have no geographic filter set - and look it up if the UI passes "1"
            if (!filter.GeographicAreaId.HasValue || filter.GeographicAreaId < 0 || filter.GeographicAreaId == 1)
                filter.GeographicAreaId = _geographicAreasRepository.GetBritishColumbiaId();

            // If we want the 'all' option, or we have no Industry filters set, force the 'All' option.
            if (!filter.IndustryIds.Any() || filter.IndustryIds.FirstOrDefault() < 0 || filter.IndustryIds.FirstOrDefault() == 1)
                filter.IndustryIds = new List<int> {_industryRepository.GetAllIndustriesId() };

            if (filter.SubIndustryIds.Any() && filter.SubIndustryIds.FirstOrDefault() > 0)
                filter.IndustryIds = new List<int>();

            var occupations = _context.JobOpenings
                .Include(no => no.Noc)
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.Keywords))
                occupations = occupations.Where(o =>
                    o.Noc.NocCode == filter.Keywords
                    || o.Noc.Description.Contains(filter.Keywords)
                    || o.Noc.CommonJobTitles.Any(jo => jo.JobTitle.Contains(filter.Keywords)));

            if (filter.EducationLevelId >= 0)
                occupations = occupations.Where(o => o.Noc.EducationLevel.Id == filter.EducationLevelId);

            if (filter.FullTimeOrPartTimeId > 0)
                occupations = occupations.Where(o => o.Noc.FullOrPartTime.Id == filter.FullTimeOrPartTimeId);

            if (filter.AnnualSalaryId > 0) 
                occupations = FilterAnnualSalary(filter, occupations);

            if (filter.GeographicAreaId > 0)
            {
                occupations = occupations
                    .Include(no => no.GeographicArea);
                occupations = occupations.Where(o => o.GeographicArea.Id == filter.GeographicAreaId);
            }

            if (filter.IndustryIds.Any())
            {
                occupations = occupations
                    .Include(no => no.Industry);
                occupations = occupations.Where(o => filter.IndustryIds.Contains(o.Industry.Id));
            }

            if (filter.SubIndustryIds.Any())
            {
                occupations = occupations
                    .Include(no => no.SubIndustry);
                occupations = occupations.Where(o => filter.SubIndustryIds.Contains(o.SubIndustry.Id));
            }

            if (filter.OccupationalInterestId > 0)
                occupations = occupations.Where(o => o.Noc.OccupationInterests.Any(og => og.OccupationalInterest.Id == filter.OccupationalInterestId));

            if (filter.OccupationalGroupId > 0)
            {
                occupations = occupations.Where(o => o.Noc.OccupationalGroups
                    .Any(og => og.OccupationalGroup.Id == filter.OccupationalGroupId 
                               && og.GeographicArea.Id == filter.GeographicAreaId));
            }

            return occupations
                .GroupBy(o => new { NocCode = o.Noc.NocCode, NocDescription = o.Noc.Description, NocId = o.Noc.Id })
                .Select(o => new OccupationListItem
                {
                    Id = o.Key.NocId,
                    NOC = o.Key.NocCode,
                    Title = o.Key.NocDescription,
                    JobOpenings = o.Sum(jo => jo.JobOpenings)
                })
                .OrderBy(o => o.NOC)
                .ToListAsync();
        }

        public List<Occupation> GetNocList(string nocs)
        {
            var nocIds = GetNocItems(nocs);
            if (!nocIds.Any())
                return new List<Occupation>();

            var bcGeographicAreaId = _geographicAreasRepository.GetBritishColumbiaId();
            var allIndustriesId = _industryRepository.GetAllIndustriesId();

            var nocList = _context.NOCs
                .Where(n => nocIds.Take(3).Contains(n.NocCode))
                .Take(3) // Limit to three NOCs
                .Select(o => new Occupation
                {
                    Id = o.Id,
                    NOC = o.NocCode,
                    JobBoardNOC = o.JobBoardNocCode ?? o.NocCode, // Return 2021 Job Board NOC if it is set
                    Title = o.Description,
                    Education = o.EducationLevel,
                    Description = o.JobOverviewSummary,
                    Income = o.MedianSalary.HasValue && o.MedianSalary.Value > 0 ? o.MedianSalary.Value.ToString("C0") : "Not available",
                    JobOpenings = o.JobOpenings
                        .Where(jo => jo.GeographicArea.Id == bcGeographicAreaId)
                        .Where(jo => jo.Industry.Id == allIndustriesId)
                        .Sum(jo => jo.JobOpenings),  // Only want the Sum of the BC values for total
                    CareerTrekVideoIds = o.NOCVideos
                        .OrderBy(nv => nv.CareerTrekVideoPosition)
                        .Select(nv => nv.CareerTrekVideoID)
                        .ToList()
                })
                .ToList();

            //foreach (var occupation in nocList)
            //    occupation.Description = GetDescription(occupation.Description);

            return nocList;
        }
        
        private static IQueryable<JobOpening> FilterAnnualSalary(OccupationSearchFilter filter, IQueryable<JobOpening> occupations)
        {
            if (filter.AnnualSalaryId == null)
                return occupations;

            var salaryChoice = (AnnualSalaryValues)filter.AnnualSalaryId;
            switch (salaryChoice)
            {
                case AnnualSalaryValues.LessThan40:
                    occupations = occupations.Where(o => o.Noc.MedianSalary > 0 && o.Noc.MedianSalary < 40000);
                    break;
                case AnnualSalaryValues.Between40And60:
                    occupations = occupations.Where(o => o.Noc.MedianSalary >= 40000 && o.Noc.MedianSalary < 60000);
                    break;
                case AnnualSalaryValues.Between60And80:
                    occupations = occupations.Where(o => o.Noc.MedianSalary >= 60000 && o.Noc.MedianSalary < 80000);
                    break;
                case AnnualSalaryValues.Between80And100:
                    occupations = occupations.Where(o => o.Noc.MedianSalary >= 80000 && o.Noc.MedianSalary < 100000);
                    break;
                case AnnualSalaryValues.Between100And120:
                    occupations = occupations.Where(o => o.Noc.MedianSalary >= 100000 && o.Noc.MedianSalary < 120000);
                    break;
                case AnnualSalaryValues.Between120And140:
                    occupations = occupations.Where(o => o.Noc.MedianSalary >= 120000 && o.Noc.MedianSalary < 140000);
                    break;
                case AnnualSalaryValues.Over140:
                    occupations = occupations.Where(o => o.Noc.MedianSalary >= 140000);
                    break;
            }

            return occupations;
        }

        private string GetDescription(string summary, int chopLength = 250)
        {
            if (string.IsNullOrWhiteSpace(summary))
                return string.Empty;

            return summary.Length > chopLength ? $"{summary.Substring(0, chopLength - 3)}..." : summary;
        }

        private List<string> GetNocItems(string nocs)
        {
            var nocItems = new List<string>();
            if (string.IsNullOrWhiteSpace(nocs))
                return nocItems;

            var parts = nocs.Split(",");
            if (!parts.Any())
                return nocItems;

            // Check each NOC is a number, but put the 0 padded number back in the list
            foreach (var item in parts)
            {
                if (!int.TryParse(item, out var b)) 
                    continue;
                
                if (b > 0)
                    nocItems.Add(b.ToString("D5"));
            }

            return nocItems
                .Distinct()
                .ToList();
        }
    }
}
