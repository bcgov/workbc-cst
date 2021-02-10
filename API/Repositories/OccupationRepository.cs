using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts;
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

        public OccupationRepository(IOccupationContext context, IGeographicAreasContext geographicAreasContext)
        {
            _context = context;
            _geographicAreasRepository = new GeographicAreasRepository(geographicAreasContext);
        }

        public Task<List<OccupationListItem>> GetOccupationsAsync(OccupationSearchFilter filter)
        {
            var occupations = _context.NOCs
                .Include(no => no.JobOpenings)
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.Keywords))
            {
                var jobTitles = _context.CommonJobTitles
                    .AsNoTracking()
                    .Where(c => c.JobTitle.Contains(filter.Keywords))
                    .Select(c => c.Noc.Id)
                    .Distinct();

                occupations = occupations.Where(o => o.NocCode.Equals(filter.Keywords) || o.Description.Contains(filter.Keywords) || jobTitles.Contains(o.Id));
            }

            if (filter.EducationLevelId > 0)
                occupations = occupations.Where(o => o.EducationLevel.Id == filter.EducationLevelId);

            if (filter.FullTimeOrPartTimeId > 0)
                occupations = occupations.Where(o => o.FullOrPartTime.Id == filter.FullTimeOrPartTimeId);

            if (filter.AnnualSalaryId > 0)
            {
                var salaryChoice = (AnnualSalaryValues)filter.AnnualSalaryId;

                switch (salaryChoice)
                {
                    case AnnualSalaryValues.LessThan20:
                        occupations = occupations.Where(o => o.MedianSalary < 20000);
                        break;
                    case AnnualSalaryValues.Between20And40:
                        occupations = occupations.Where(o => o.MedianSalary >= 20000 && o.MedianSalary < 40000);
                        break;
                    case AnnualSalaryValues.Between40And60:
                        occupations = occupations.Where(o => o.MedianSalary >= 40000 && o.MedianSalary < 60000);
                        break;
                    case AnnualSalaryValues.Between60And80:
                        occupations = occupations.Where(o => o.MedianSalary >= 60000 && o.MedianSalary < 80000);
                        break;
                    case AnnualSalaryValues.Between80And100:
                        occupations = occupations.Where(o => o.MedianSalary >= 80000 && o.MedianSalary < 100000);
                        break;
                    case AnnualSalaryValues.Between100And120:
                        occupations = occupations.Where(o => o.MedianSalary >= 100000 && o.MedianSalary < 120000);
                        break;
                    case AnnualSalaryValues.Between120And140:
                        occupations = occupations.Where(o => o.MedianSalary >= 120000 && o.MedianSalary < 140000);
                        break;
                    case AnnualSalaryValues.Over140:
                        occupations = occupations.Where(o => o.MedianSalary >= 140000);
                        break;
                }
            }

            // Always force BC if we have no geographic filter set
            if (!filter.GeographicAreaId.HasValue || filter.GeographicAreaId < 0)
                filter.GeographicAreaId = _geographicAreasRepository.GetBritishColumbiaId();

            if (filter.GeographicAreaId > 0)
            {
                occupations = occupations
                    .Include(no => no.JobOpenings)
                    .ThenInclude(jo => jo.GeographicArea);
                occupations = occupations.Where(o => o.JobOpenings.Any(jo => jo.GeographicArea.Id == filter.GeographicAreaId));
                // NOCOccupationGroup also has a Geographic Area. Do we filter?
            }

            if (filter.IndustryIds.Any())
            {
                occupations = occupations
                    .Include(no => no.JobOpenings)
                    .ThenInclude(jo => jo.Industry);
                occupations = occupations.Where(o => o.JobOpenings.Any(jo => filter.IndustryIds.Contains(jo.Industry.Id)));
            }

            if (filter.SubIndustryIds.Any())
            {
                occupations = occupations
                    .Include(no => no.JobOpenings)
                    .ThenInclude(jo => jo.SubIndustry);
                occupations = occupations.Where(o => o.JobOpenings.Any(jo => filter.SubIndustryIds.Contains(jo.SubIndustry.Id)));
            }

            if (filter.OccupationalInterestId > 0)
                occupations = occupations.Where(o => o.OccupationInterests.Any(og => og.OccupationalInterest.Id == filter.OccupationalInterestId));

            if (filter.OccupationalGroupId > 0)
                occupations = occupations.Where(o => o.OccupationalGroups.Any(og => og.OccupationalGroup.Id == filter.OccupationalGroupId));

            return occupations.Select(o => new OccupationListItem
                {
                    Id = o.Id,
                    JobOpenings = JobOpenings(o, filter),  // This might not be filtered down correctly or reflecting filters that restrict it
                    NOC = o.NocCode,
                    NOCAndTitle = $"{o.Description} ({o.NocCode})"
                })
                .ToListAsync();
        }

        private static int JobOpenings(NOC o, OccupationSearchFilter filter)
        {
            var occ = o.JobOpenings.AsQueryable();

            if (filter.GeographicAreaId > 0)
                occ = occ.Where(oi => oi.GeographicArea.Id == filter.GeographicAreaId.Value);

            if (filter.IndustryIds.Any()) 
                occ = occ.Where(oi => filter.IndustryIds.Contains(oi.Industry.Id));

            if (filter.SubIndustryIds.Any()) 
                occ = occ.Where(oi => filter.SubIndustryIds.Contains(oi.SubIndustry.Id));

            return occ.Sum(oi => oi.JobOpenings);
        }

        public List<Occupation> GetNocList(string nocs)
        {
            var nocIds = GetNocItems(nocs);
            if (!nocIds.Any())
                return new List<Occupation>();

            if (!_context.IsSQLServer)
            {
                var occupations = ContextHelper.GetPlaceHolderData<Occupation>("SampleJsonFiles/occupations.json");
                return occupations.Where(n => nocIds.Contains(n.NOC)).ToList();
            }

            var bcGeographicAreaId = _geographicAreasRepository.GetBritishColumbiaId();

            var nocList = _context.NOCs
                .Where(n => nocIds.Take(3).Contains(n.NocCode))
                .Take(3) // Limit to three NOCs
                .Select(o => new Occupation
                {
                    Id = o.Id,
                    NOC = o.NocCode,
                    Title = o.Description,
                    Education = o.EducationLevel,
                    Description = o.JobOverviewSummary,
                    Income = o.MedianSalary.HasValue ? o.MedianSalary.Value.ToString("C0") : string.Empty,
                    JobOpenings = o.JobOpenings.Where(jo => jo.GeographicArea.Id == bcGeographicAreaId).Sum(jo => jo.JobOpenings),  // Only want the Sum of the BC values for total
                    CareerTrekVideoIds = o.NOCVideos.OrderBy(nv => nv.CareerTrekVideoPosition).Select(nv => nv.CareerTrekVideoID).ToList()
                })
                .ToList();

            foreach (var occupation in nocList) 
                occupation.Description = GetDescription(occupation.Description);

            return nocList;
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
                    nocItems.Add(b.ToString("D4"));
            }

            return nocItems
                .Distinct()
                .ToList();
        }
    }
}