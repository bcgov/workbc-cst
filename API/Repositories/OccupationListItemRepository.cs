using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SearchAllOccupationsToolAPI.DbContexts;
using SearchAllOccupationsToolAPI.Models;

namespace SearchAllOccupationsToolAPI.Repositories
{
    public class OccupationListItemRepository : IOccupationListItemRepository
    {
        private IOccupationListItemContext _context;

        public OccupationListItemRepository(IOccupationListItemContext dbContext)
        {
            _context = dbContext;
        }


        private List<OccupationListItem> GetOccupationListItemsPrivate()
        {
            if (_context.IsSQLServer)
            {
                return _context.FromSQLRaw(@"select 
                    --top 10 
	                Id,
	                replace(replace(NOC, char(10),''), char(13),'') as NOC,
	                replace(replace(NOC, char(10),''), char(13),'') + ' - ' + replace(replace(Title, char(10),''), char(13),'') as NOCAndTitle
                from Occupations").ToList();
            }
            else
            {
                List<OccupationListItem> occupationListItems = new List<OccupationListItem>(){
                new OccupationListItem() {
                    Id = 1,
                    NOC = "0011",
                    NOCAndTitle = "0011 - Legislators"
                },
                new OccupationListItem() {
                    Id = 2,
                    NOC = "0012",
                    NOCAndTitle = "0012 - Senior government managers and officials"
                },
                new OccupationListItem() {
                    Id = 3,
                    NOC = "0013",
                    NOCAndTitle = "0013 - Senior managers - financial, communications and other business services"
                } };
                return occupationListItems;

            }

        }

        public List<OccupationListItem> GetOccupationListItems(string partialNocOrTitle)
        {
            List<OccupationListItem> items = GetOccupationListItemsPrivate();
            //var occupations = GetOccupationsPrivate(false);
            if (partialNocOrTitle == null)
            {
                return items;
            }
            else
            {
                if (Int32.TryParse(partialNocOrTitle, out int nocOnly))
                {
                    return items.FindAll(x => x.NOCAndTitle.ToUpper().StartsWith(partialNocOrTitle));
                }
                else
                {
                    return items.FindAll(x => x.NOCAndTitle.ToUpper().Contains(partialNocOrTitle.ToUpper()));
                }
            }
            //return await _context.OccupationListItems.ToListAsync();
        }
    }
}
