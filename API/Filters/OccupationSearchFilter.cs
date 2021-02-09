using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Extensions;

namespace SearchAllOccupationsToolAPI.Filters
{
    public class OccupationSearchFilter
    {
        public string Keywords { get; set; }
        public int? GeographicAreaId { get; set; }
        public int? EducationLevelId { get; set; }
        public int? OccupationalInterestId { get; set; }
        public int? OccupationalGroupId { get; set; }
        public int? FullTimeOrPartTimeId { get; set; }
        public int? AnnualSalaryId { get; set; }

        [BindProperty(BinderType = typeof(IntegerListModelBinder))]
        public IEnumerable<int> IndustryIds { get; set; }

        [BindProperty(BinderType = typeof(IntegerListModelBinder))]
        public IEnumerable<int> SubIndustryIds { get; set; }
    }
}