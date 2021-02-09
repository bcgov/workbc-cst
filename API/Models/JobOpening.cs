using System.ComponentModel.DataAnnotations.Schema;

namespace SearchAllOccupationsToolAPI.Models
{
    [Table("JobOpening")]
    public class JobOpening
    {
        public int Id { get; set; }
        public virtual NOC Noc { get; set; }
        public virtual GeographicArea GeographicArea { get; set; }
        public virtual Industry Industry { get; set; }
        public virtual SubIndustry SubIndustry { get; set; }
        public int JobOpenings { get; set; }
    }
}