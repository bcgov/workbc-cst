using System.Text.Json.Serialization;

namespace SearchAllOccupationsToolAPI.Models
{
    public class AnnualSalary
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("value")]
        public string SalaryText { get; set; }
    }
}