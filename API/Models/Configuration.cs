﻿using System;
using System.Text.Json.Serialization;

namespace SearchAllOccupationsToolAPI.Models
{
    [Serializable]
    public class Configuration
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }
    }
}
