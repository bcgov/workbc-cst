namespace SearchAllOccupationsToolAPI.Models
{
    public class OccupationSearchFilter
    {
        public string Keywords { get; set; }
        public int? GeographicAreaId { get; set; }
        public int? EducationLevelId { get; set; }
        public int? OccupationalInterestId { get; set; }
        public int? IndustryId { get; set; }
        public int? occupationalGroupId { get; set; }
        public int? FullTimeOrPartTimeId { get; set; }
        public int? annualSalaryId { get; set; }
    }
}