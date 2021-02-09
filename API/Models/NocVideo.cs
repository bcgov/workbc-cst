using System.ComponentModel.DataAnnotations.Schema;

namespace SearchAllOccupationsToolAPI.Models
{
    [Table("NOCVideos")]
    public class NocVideo
    {
        public int Id { get; set; }
        public virtual NOC NOC { get; set; }
        public string CareerTrekVideoID { get; set; }
        public int CareerTrekVideoPosition { get; set; }
    }
}