using System.ComponentModel.DataAnnotations.Schema;

namespace SearchAllOccupationsToolAPI.Models
{
    [Table("CommonJobTitle")]
    public class CommonJobTitle
    {
        public int Id { get; set; }
        public virtual NOC Noc { get; set; }
        public string JobTitle { get; set; }
    }
}