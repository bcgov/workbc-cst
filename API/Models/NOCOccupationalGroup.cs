using System.ComponentModel.DataAnnotations.Schema;

namespace SearchAllOccupationsToolAPI.Models
{
    [Table("NOCOccupationGroup")]
    public class NOCOccupationalGroup
    {
        public int Id { get; set; }
        public virtual NOC NOC { get; set; }
        public virtual OccupationalGroup OccupationalGroup { get; set; }
        public virtual GeographicArea GeographicArea { get; set; }
    }
}