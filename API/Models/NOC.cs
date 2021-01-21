using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SearchAllOccupationsToolAPI.Models
{
    [Table("NOC")]
    public class NOC
    {
        public int Id { get; set; }
        public string NocCode { get; set; }
        public string Description { get; set; }
        public decimal? MedianSalary { get; set; }
        public virtual EducationLevel EducationLevel { get; set; }
        public virtual FullOrPartTime FullOrPartTime { get; set; }
        public virtual Collection<JobOpening> JobOpenings { get; set; }
        public string JobOverviewSummary { get; set; }
        public string CareerTrekVideoId { get; set; }
    }

    [Table("JobOpening")]
    public class JobOpening
    {
        public int Id { get; set; }
        public virtual NOC Noc { get; set; }
        public virtual GeographicArea GeographicArea { get; set; }
        public virtual Industry Industry { get; set; }
        public int JobOpenings { get; set; }
    }
}