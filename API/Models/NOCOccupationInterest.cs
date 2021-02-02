using System.ComponentModel.DataAnnotations.Schema;

namespace SearchAllOccupationsToolAPI.Models
{
    [Table("NOCOccupationInterest")]
    public class NOCOccupationInterest
    {
        public int Id { get; set; }
        public virtual NOC NOC { get; set; }
        [ForeignKey("OccupationInterestId")]
        public virtual OccupationalInterest OccupationalInterest { get; set; }
        // OccupationInterestOption (also has an OccupationInterestOption [Primary/Secondary/Tertiary], but I don't think we care about it)
    }
}