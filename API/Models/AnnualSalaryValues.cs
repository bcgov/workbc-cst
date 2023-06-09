﻿using System.ComponentModel;

namespace SearchAllOccupationsToolAPI.Models
{
    public enum AnnualSalaryValues
    {
        [Description("Less than $20,000")]
        LessThan20 = 1,

        [Description("$20,000 – $40,000")]
        Between20And40 = 2,

        [Description("$40,000 – $60,000")]
        Between40And60 = 3,

        [Description("$60,000 – $80,000")]
        Between60And80 = 4,

        [Description("$80,000 – $100,000")]
        Between80And100 = 5,

        [Description("$100,000 – $120,000")]
        Between100And120 = 6,

        [Description("$120,000 – $140,000")]
        Between120And140 = 7,

        [Description("Over $140,000")]
        Over140 = 8,
    }
}