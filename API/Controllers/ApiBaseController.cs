using System;
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Controllers
{
    public class ApiControllerBase : ControllerBase
    {
        public List<T> GetPlaceHolderData<T>(string sampleFile) where T : class
        {
            var sample = System.IO.File.ReadAllText(sampleFile);
            return JsonSerializer.Deserialize<List<T>>(sample, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public List<AnnualSalary> GetAnnualSalaryRanges()
        {
            var salaries = new List<AnnualSalary>
            {
                new AnnualSalary { Id = 0, SalaryText = "All" },
                new AnnualSalary { Id = 1, SalaryText = "Less than $20,000" },
                new AnnualSalary { Id = 2, SalaryText = "$20,000 to $40,000" },
                new AnnualSalary { Id = 3, SalaryText = "$40,000 to $60,000" },
                new AnnualSalary { Id = 4, SalaryText = "$60,000 to $80,000" },
                new AnnualSalary { Id = 5, SalaryText = "$80,000 to $100,000" },
                new AnnualSalary { Id = 6, SalaryText = "$100,000 to $120,000" },
                new AnnualSalary { Id = 7, SalaryText = "$120,000 to $140,000" },
                new AnnualSalary { Id = 8, SalaryText = "Over $140,000" }
            };

            return salaries;
        }
    }
}