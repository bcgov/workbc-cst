﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts.Interfaces;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories.Interfaces;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class GeographicAreasRepository : IGeographicAreasRepository
    {
        private readonly IGeographicAreasContext _context;

        public GeographicAreasRepository(IGeographicAreasContext dbContext)
        {
            _context = dbContext;
        }

        public List<GeographicArea> GetGeographicAreas()
        {
            return _context.GeographicAreas
                .AsNoTracking()
                .ToList();
        }

        public int GetBritishColumbiaId()
        {
            var areas = GetGeographicAreas();
            return areas.FirstOrDefault(g => g.Value.ToLower() == "british columbia" || g.Value.ToLower() == "all")?.Id ?? 0;
        }
    }
}
