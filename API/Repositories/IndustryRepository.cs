using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class IndustryRepository : IIndustryRepository
    {
        private readonly IIndustryContext _context;

        public IndustryRepository(IIndustryContext dbContext)
        {
            _context = dbContext;
        }

        public List<Industry> GetIndustries()
        {
            if (_context.IsSQLServer)
            {
                var industries = _context.Industries
                    .Include(i => i.SubIndustries)
                    .OrderBy(i => i.Value)
                    .ToList();


                return industries;
            }

            return ContextHelper.GetPlaceHolderData<Industry>("SampleJsonFiles/industries.json");
        }

        private List<string> FakeSubs = new List<string>
        {
"Accommodation services",
"Air transportation",
"Ambulatory health care services",
"Amusement, gambling and recreation industries",
"Architectural, engineering and related services",
"Broadcasting, data processing, and information",
"Business, building and other support services",
"Community colleges",
"Computer systems design and related services",
"Construction",
"Elementary and secondary schools",
"Fabricated metal product manufacturing",
"Farms",
"Federal government public administration",
"Finance",
"Fishing, hunting and trapping",
"Food services and drinking places",
"Food, beverage and tobacco manufacturing",
"Forestry and logging",
"Health and personal care stores",
"Heritage institutions",
"Hospitals",
"Industry",
"Insurance carriers and related activities",
"Legal, accounting, design, research, and advertising services",
"Local and Indigenous public administration",
"Machinery manufacturing",
"Management, scientific and technical consulting services",
"Mining     ",
"Motion picture and sound recording industries",
"Motor vehicle and parts dealers",
"Nursing and residential care facilities",
"Oil and gas extraction",
"Other manufacturing",
"Other retail trade (excluding cars and personal care)",
"Paper manufacturing",
"Performing arts, spectator sports and related industries",
"Postal service, couriers and messengers",
"Primary metal manufacturing",
"Private and trades education",
"Provincial and territorial public administration",
"Publishing industries",
"Rail transportation",
"Real estate rental and leasing",
"Repair, personal and non-profit services",
"Ship and boat building",
"Social assistance",
"Support activities for agriculture and forestry",
"Support activities for mining and oil and gas extraction",
"Support activities for transportation",
"Telecommunications",
"Transit, sightseeing, and pipeline transportation",
"Transportation equipment manufacturing (excluding shipbuilding)",
"Truck transportation",
"Universities",
"Utilities",
"Warehousing and storage",
"Water transportation",
"Wholesale trade",
"Wood product manufacturing",

        };

        
    }

    

}