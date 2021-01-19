using System;
using System.Text.Json.Serialization;

namespace SearchAllOccupationsToolAPI.Models
{
    [Serializable]
    public class OccupationListItem
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("noc")]
        public string NOC { get; set; }

        [JsonPropertyName("nocAndTitle")]
        public string NOCAndTitle { get; set; }

        [JsonPropertyName("jobOpenings")]
        public int JobOpenings { get; set; }
    }
}
