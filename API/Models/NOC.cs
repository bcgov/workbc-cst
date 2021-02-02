using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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
        public string JobOverviewSummary { get; set; }
        public string CareerTrekVideoId { get; set; }

        public virtual ICollection<JobOpening> JobOpenings { get; set; }
        public virtual ICollection<CommonJobTitle> CommonJobTitles { get; set; }
        public virtual ICollection<NOCOccupationalGroup> OccupationalGroups { get; set; }
        public virtual ICollection<NOCOccupationInterest> OccupationInterests { get; set; }
    }
}