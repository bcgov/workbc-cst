using System.Text.Json.Serialization;

namespace SearchAllOccupationsToolAPI.Models
{
    public class Occupation
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        
        [JsonPropertyName("noc")]
        public string NOC { get; set; }
        
        [JsonPropertyName("title")]
        public string Title { get; set; }
        
        [JsonPropertyName("education")]
        public EducationLevel Education { get; set; }
        
        [JsonPropertyName("workExperience")]
        public WorkExperience WorkExperience { get; set; }

        [JsonPropertyName("income")]
        public string Income { get; set; }
        
        [JsonPropertyName("jobOpenings")]
        public int JobOpenings { get; set; }
    }
}
