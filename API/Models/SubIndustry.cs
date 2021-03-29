using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SearchAllOccupationsToolAPI.Models
{
    [Serializable]
    [Table("SubIndustry")]
    public class SubIndustry
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }

        [JsonIgnore]
        public virtual Industry Industry { get; set; }

        [JsonIgnore]
        public int SortOrder { get; set; }
    }
}