using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SearchAllOccupationsToolAPI.Models;
using SearchAllOccupationsToolAPI.Repositories;

namespace SearchAllOccupationsToolAPI.Controllers.OldCrap
{
    //[Route("api/[controller]")]
    [Route("[controller]")]
    [ApiController]
    public class OccupationListItemsController : ControllerBase
    {
        private readonly OccupationListItemContext _context;
        private IOccupationListItemRepository _repo;

        public OccupationListItemsController(OccupationListItemContext context)
        {
            _context = context;
            _repo = new OccupationListItemRepository(context);
        }

        //private List<OccupationListItem> GetOccupationListItemsPrivate()
        //{
        //    if (_context.Database.IsSqlServer())
        //    {
        //        return _context.OccupationListItems.FromSqlRaw(@"select 
        //            --top 10 
	       //         Id,
	       //         replace(replace(NOC, char(10),''), char(13),'') as NOC,
	       //         replace(replace(NOC, char(10),''), char(13),'') + ' - ' + replace(replace(Title, char(10),''), char(13),'') as NOCAndTitle
        //        from TransferableSkillsTool..Occupations").ToList();
        //    }
        //    else
        //    {
        //        List<OccupationListItem> occupationListItems = new List<OccupationListItem>(){
        //        new OccupationListItem() {
        //            Id = 1,
        //            NOC = "0011",
        //            NOCAndTitle = "0011 - Legislators"
        //        },
        //        new OccupationListItem() {
        //            Id = 2,
        //            NOC = "0012",
        //            NOCAndTitle = "0012 - Senior government managers and officials"
        //        },
        //        new OccupationListItem() {
        //            Id = 3,
        //            NOC = "0013",
        //            NOCAndTitle = "0013 - Senior managers - financial, communications and other business services"
        //        } };
        //        return occupationListItems;

        //    }

        //}

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OccupationListItem>>> GetOccupationListItems([FromQuery] string partialNocOrTitle)
        {
            return _repo.GetOccupationListItems(partialNocOrTitle);
            //List<OccupationListItem> items = GetOccupationListItemsPrivate();
            ////var occupations = GetOccupationsPrivate(false);
            //if (partialNocOrTitle == null)
            //    return items;
            //else
            //    return items.FindAll(x => x.NOCAndTitle.ToUpper().Contains(partialNocOrTitle.ToUpper()));
            ////return await _context.OccupationListItems.ToListAsync();
        }

        #region REMOVED
        //// GET: api/OccupationListItems
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<OccupationListItem>>> GetOccupationListItems()
        //{
        //    List<OccupationListItem> items = GetOccupationListItemsPrivate();
        //    return items;
        //    //    List<OccupationListItem> occupationListItems = new List<OccupationListItem>(){
        //    //        new OccupationListItem() {
        //    //            Id = 1,
        //    //            NOC = "0011",
        //    //            NOCAndTitle = "0011 - Legislators"
        //    //        },
        //    //        new OccupationListItem() {
        //    //            Id = 2,
        //    //            NOC = "0012",
        //    //            NOCAndTitle = "0012 - Senior government managers and officials"
        //    //        },
        //    //        new OccupationListItem() {
        //    //            Id = 3,
        //    //            NOC = "0013",
        //    //            NOCAndTitle = "0013 - Senior managers - financial, communications and other business services"
        //    //        } 
        //    //    };
        //    //    return occupationListItems;
        //    //return await _context.OccupationListItems.ToListAsync();
        //}

        //// GET: api/OccupationListItems/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<OccupationListItem>> GetOccupationListItem(int id)
        //{
        //    var occupationListItem = await _context.OccupationListItems.FindAsync(id);

        //    if (occupationListItem == null)
        //    {
        //        return NotFound();
        //    }

        //    return occupationListItem;
        //}

        //// PUT: api/OccupationListItems/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutOccupationListItem(int id, OccupationListItem occupationListItem)
        //{
        //    if (id != occupationListItem.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(occupationListItem).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!OccupationListItemExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/OccupationListItems
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        //public async Task<ActionResult<OccupationListItem>> PostOccupationListItem(OccupationListItem occupationListItem)
        //{
        //    _context.OccupationListItems.Add(occupationListItem);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetOccupationListItem", new { id = occupationListItem.Id }, occupationListItem);
        //}

        //// DELETE: api/OccupationListItems/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<OccupationListItem>> DeleteOccupationListItem(int id)
        //{
        //    var occupationListItem = await _context.OccupationListItems.FindAsync(id);
        //    if (occupationListItem == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.OccupationListItems.Remove(occupationListItem);
        //    await _context.SaveChangesAsync();

        //    return occupationListItem;
        //}

        //private bool OccupationListItemExists(int id)
        //{
        //    return _context.OccupationListItems.Any(e => e.Id == id);
        //}
        #endregion
    }
}
