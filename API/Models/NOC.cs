using System.Collections.Generic;
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
        public string JobOverviewSummary { get; set; }
        public string CareerTrekVideoId { get; set; }

        public virtual ICollection<JobOpening> JobOpenings { get; set; }
        public virtual ICollection<CommonJobTitle> CommonJobTitles { get; set; }
        public virtual ICollection<NOCOccupationalGroup> OccupationalGroups { get; set; }
        public virtual ICollection<NOCOccupationInterest> OccupationInterests { get; set; }
    }

    [Table("NOCOccupationGroup")]
    public class NOCOccupationalGroup
    {
        public int Id { get; set; }
        public virtual NOC NOC { get; set; }
        public virtual OccupationalGroup OccupationalGroup { get; set; }
        public virtual GeographicArea GeographicArea { get; set; }
    }

    [Table("NOCOccupationInterest")]
    public class NOCOccupationInterest
    {
        public int Id { get; set; }
        public virtual NOC NOC { get; set; }
        [ForeignKey("OccupationInterestId")]
        public virtual OccupationalInterest OccupationalInterest { get; set; }
        // OccupationInterestOption (also has an OccupationInterestOption [Primary/Secondary/Tertiary], but I don't think we care about it)
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

    [Table("CommonJobTitle")]
    public class CommonJobTitle
    {
        public int Id { get; set; }
        public virtual NOC Noc { get; set; }
        public string JobTitle { get; set; }
    }
}