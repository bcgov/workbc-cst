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
    public class OccupationsController : ControllerBase
    {
        private readonly OccupationContext _context;
        private readonly WorkExperienceContext _workExperienceContext;
        private readonly SalaryContext _salaryRangeContext;
        private readonly EducationLevelContext _educationLevelContext;
        private readonly OccupationMatchContext _occupationMatchContext;
        private readonly SimilarityContext _similarityContext;

        private IOccupationRepository _repo;

        public OccupationsController(OccupationContext context, 
            WorkExperienceContext workExperienceContext,
            SalaryContext salaryContext,
            EducationLevelContext educationLevelContext,
            OccupationMatchContext occupationMatchContext,
            SimilarityContext similarityContext)
        {
            _context = context;
            _workExperienceContext = workExperienceContext;
            _salaryRangeContext = salaryContext;
            _educationLevelContext = educationLevelContext;
            _occupationMatchContext = occupationMatchContext;
            _similarityContext = similarityContext;

            _repo = new OccupationRepository(_context,
                _workExperienceContext,
                _salaryRangeContext,
                _educationLevelContext,
                _occupationMatchContext,
                _similarityContext);
        }

        // GET: api/Occupations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Occupation>>> GetOccupations([FromQuery] string NOC,
            [FromQuery] int? similarityId,
            [FromQuery] int? educationLevelId,
            [FromQuery] int? salaryId,
            [FromQuery] int? workExperienceId)
        {
            return _repo.GetOccupations(NOC,
                similarityId,
                educationLevelId,
                salaryId,
                workExperienceId);
            //if (NOC != null)
            //{
            //    return await FindMatchingOccupations(NOC, similarityId, educationLevelId, salaryId, workExperienceId);
            //}
            //else
            //{
            //    return GetOccupationsPrivate(false, NOC);
            //}

            #region REMOVED
            //List<Occupation> occupations = new List<Occupation>(){
            //    new Occupation() {
            //        Id = 1,
            //        NOC = "0011",
            //        Title = "Legislators"
            //    },
            //    new Occupation() {
            //        Id = 1,
            //        NOC = "0012",
            //        Title = "Senior government managers and officials"
            //    },
            //    new Occupation() {
            //        Id = 3,
            //        NOC = "0013",
            //        Title = "Senior managers - financial, communications and other business services"
            //    }
            //};
            //return occupations;
            //return await _context.Occupations.ToListAsync();
            #endregion
        }

        //private List<Occupation> GetOccupationsPrivate(bool returnMatches, string NOC)
        //{
        //    if (_context.Database.IsSqlServer())
        //    {
        //        //Get WorkExperiences Lookup List
        //        List<Occupation> occupations = _context.Occupations.ToList();
        //        List<WorkExperience> localWorkExperiencesList = _workExperienceContext.WorkExperiences.ToList();
        //        List<Salary> localSalaryRangesList = _salaryRangeContext.Salaries.ToList();
        //        List<EducationLevel> localEducationLevelsList = _educationLevelContext.EducationLevels.ToList();
        //        List<Similarity> localSimilaritiesList = _similarityContext.Similarities.ToList();

        //        foreach (var occupation in occupations)
        //        {
        //            occupation.WorkExperience = localWorkExperiencesList.FindAll(x => x.Id == occupation.WorkExperienceId).FirstOrDefault();
        //            occupation.SalaryRange = localSalaryRangesList.FindAll(x => x.Id == occupation.SalaryRangeId).FirstOrDefault();
        //            occupation.Education = localEducationLevelsList.FindAll(x => x.Id == occupation.EducationId).FirstOrDefault();
        //            var occupationId = new SqlParameter("occupationId", occupation.Id);

        //            List<OccupationMatch> localOccupationMatchesList = _occupationMatchContext.OccupationMatches.FromSqlRaw(@"select 
	       //                 MatchedOccupation.Id,
	       //                 OM.SimilarityId,
	       //                 MatchedOccupation.NOC,
	       //                 MatchedOccupation.Title,
	       //                 MatchedOccupation.EducationId,
	       //                 MatchedOccupation.WorkExperienceId,
	       //                 MatchedOccupation.Income,
	       //                 MatchedOccupation.SalaryRangeId
        //                from OccupationMatches OM
        //                inner join Occupations MatchedOccupation on OM.MatchedOccupationId = MatchedOccupation.Id
        //                where 
	       //                 OM.CurrentOccupationId = @occupationId", occupationId).ToList();

                    
        //            foreach(var matchedOccupation in localOccupationMatchesList)
        //            {
        //                matchedOccupation.WorkExperience = localWorkExperiencesList.FindAll(x => x.Id == matchedOccupation.WorkExperienceId).FirstOrDefault();
        //                matchedOccupation.SalaryRange = localSalaryRangesList.FindAll(x => x.Id == matchedOccupation.SalaryRangeId).FirstOrDefault();
        //                matchedOccupation.Education = localEducationLevelsList.FindAll(x => x.Id == matchedOccupation.EducationId).FirstOrDefault();
        //                matchedOccupation.Similarity = localSimilaritiesList.FindAll(x => x.Id == matchedOccupation.SimilarityId).FirstOrDefault();
        //            }
        //            occupation.OccupationMatches = localOccupationMatchesList;
        //        }
        //        return _context.Occupations.ToList();
        //    }
        //    else
        //    {
        //        List<Occupation> occupations;
        //        if (!returnMatches)
        //        {
        //            occupations = new List<Occupation>(){
        //        new Occupation() {
        //            Id = 1,
        //            NOC = "0011",
        //            Title = "Legislators",
        //            EducationId = 4,
        //            Education = new EducationLevel(){ Id = 4, Value = "Degree" },
        //            WorkExperienceId = 4,
        //            WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
        //            Income = "59,545",
        //            SalaryRangeId = 2,
        //            SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"}
        //        }                
        //        };
        //        }
        //        else
        //        {
        //            occupations = new List<Occupation>(){
        //        new Occupation() {
        //            Id = 1,
        //            NOC = "0011",
        //            Title = "Legislators",
        //            EducationId = 4,
        //            Education = new EducationLevel(){ Id = 4, Value = "Degree" },
        //            WorkExperienceId = 4,
        //            WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
        //            Income = "59,545",
        //            SalaryRangeId = 2,
        //            SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"},
        //            OccupationMatches = new List<OccupationMatch>()
        //            {
        //                //Exclude the current occupation from the results

        //                //new OccupationMatch()
        //                //{
        //                //    Id = 1,
        //                //    Similarity = new Similarity(){Id = 1, Value = "High"},
        //                //    NOC = "0011",
        //                //    Title = "Legislators",
        //                //    Education = new EducationLevel(){ Id = 4, Value = "Degree" },
        //                //    WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
        //                //    Income = "59,545",
        //                //    SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"}
        //                //},
        //                new OccupationMatch()
        //                {
        //                    Id = 2,
        //                    SimilarityId = 3,
        //                    Similarity = new Similarity(){Id = 3, Value = "High"},
        //                    NOC = "0012",
        //                    Title = "Senior government managers and officials",
        //                    EducationId = 4,
        //                    Education = new EducationLevel(){ Id = 4, Value = "Degree" },
        //                    WorkExperienceId = 4,
        //                    WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
        //                    Income = "108,727",
        //                    SalaryRangeId = 5,
        //                    SalaryRange = new Salary(){ Id = 5, Value = "> 100k"}
        //                },
        //                new OccupationMatch()
        //                {
        //                    Id = 3,
        //                    SimilarityId = 3,
        //                    Similarity = new Similarity(){Id = 3, Value = "High"},
        //                    NOC = "0013",
        //                    Title = "Senior managers - financial, communications and other business services",
        //                    EducationId = 4,
        //                    Education = new EducationLevel(){ Id = 4, Value = "Degree" },
        //                    WorkExperienceId = 4,
        //                    WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
        //                    Income = "119,882",
        //                    SalaryRangeId = 5,
        //                    SalaryRange = new Salary(){ Id = 5, Value = "> 100k"}
        //                },
        //                new OccupationMatch()
        //                {
        //                    Id = 4,
        //                    SimilarityId = 3,
        //                    Similarity = new Similarity(){Id = 3, Value = "High"},
        //                    NOC = "0014",
        //                    Title = "Senior managers - health, education, social and community services and membership organizations",
        //                    EducationId = 4,
        //                    Education = new EducationLevel(){ Id = 4, Value = "Degree" },
        //                    WorkExperienceId = 3,
        //                    WorkExperience = new WorkExperience(){ Id = 3, Value = "> 1 year to 4 years" },
        //                    Income = "96,077",
        //                    SalaryRangeId = 4,
        //                    SalaryRange = new Salary(){ Id = 4, Value = "$80k-$100k"}
        //                },
        //                new OccupationMatch()
        //                {
        //                    Id = 14,
        //                    SimilarityId = 3,
        //                    Similarity = new Similarity(){Id = 3, Value = "High"},
        //                    NOC = "0125",
        //                    Title = "Other business services managers",
        //                    EducationId = 3,
        //                    Education = new EducationLevel(){ Id = 3, Value = "Diploma/Certificate" },
        //                    WorkExperienceId = 4,
        //                    WorkExperience = new WorkExperience(){ Id = 4, Value = "> 4 years to 10 years" },
        //                    Income = "59,114",
        //                    SalaryRangeId = 2,
        //                    SalaryRange = new Salary(){ Id = 2, Value = "$40k-$60k"}
        //                }
        //            }
        //        }
        //        };
        //        }
        //        return occupations;
        //    }
        //}

        //// GET: api/Occupations
        //[HttpGet]
        //private async Task<ActionResult<IEnumerable<Occupation>>> FindMatchingOccupations(
        //    string NOC,
        //    int? similarityId,
        //    int? educationLevelId,
        //    int? salaryId,
        //    int? workExperienceId
        //    )
        //{
        //    var occupations = GetOccupationsPrivate(true, NOC);
        //    occupations = occupations.FindAll(x => x.NOC == NOC);
        //    if (similarityId != null)
        //    {
        //        //Get the Similarity TExt for this Id
        //        //SearchAllOccupationsToolAPI.Controllers.GetSimilarities();

        //        occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.Similarity.Id == similarityId);
        //    }
        //    if(educationLevelId != null)
        //    {
        //        occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.Education.Id == educationLevelId);
        //    }
        //    if (workExperienceId != null)
        //    {
        //        occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.WorkExperience.Id == workExperienceId);
        //    }           

        //    return occupations;

        //    #region REMOVED
        //    //if (!String.IsNullOrEmpty(educationLevelId))
        //    //{
        //    //    occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.Education == educationLevel);
        //    //}
        //    //if (!String.IsNullOrEmpty(salaryId))
        //    //{
        //    //    occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.Income == salary);
        //    //}
        //    //if (!String.IsNullOrEmpty(workExperienceId))
        //    //{
        //    //    occupations[0].OccupationMatches = occupations[0].OccupationMatches.FindAll(y => y.WorkExperience == workExperience);
        //    //}

        //    //return occupations.FindAll(x => x.NOC == NOC).FindAll(x => x.OccupationMatches.FindAll(y => y.Similarity == similarity));

        //    //List<Occupation> occupations = new List<Occupation>(){
        //    //    new Occupation() {
        //    //        Id = 1,
        //    //        NOC = "0011",
        //    //        Title = "Legislators"
        //    //    },
        //    //    new Occupation() {
        //    //        Id = 1,
        //    //        NOC = "0012",
        //    //        Title = "Senior government managers and officials"
        //    //    },
        //    //    new Occupation() {
        //    //        Id = 3,
        //    //        NOC = "0013",
        //    //        Title = "Senior managers - financial, communications and other business services"
        //    //    }
        //    //};
        //    //return occupations;
        //    //return await _context.Occupations.ToListAsync();
        //    #endregion
        //}

        #region REMOVED


        //// GET: api/Occupations/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Occupation>> GetOccupation(int id)
        //{
        //    var occupations = GetOccupationsPrivate(true);
        //    return occupations.Find(x => x.Id == id);
        //    //var occupation = await _context.Occupations.FindAsync(id);

        //    //if (occupation == null)
        //    //{
        //    //    return NotFound();
        //    //}

        //    //return occupation;
        //}

        //// GET: api/Occupations
        //[HttpGet]
        //private async Task<ActionResult<IEnumerable<Occupation>>> QuickFindOccupations([FromQuery]string partialTitle)
        //{
        //    var occupations = GetOccupationsPrivate(false);
        //    return occupations.FindAll(x => x.Title.Contains(partialTitle));

        //    //List<Occupation> occupations = new List<Occupation>(){
        //    //    new Occupation() {
        //    //        Id = 1,
        //    //        NOC = "0011",
        //    //        Title = "Legislators"
        //    //    },
        //    //    new Occupation() {
        //    //        Id = 1,
        //    //        NOC = "0012",
        //    //        Title = "Senior government managers and officials"
        //    //    },
        //    //    new Occupation() {
        //    //        Id = 3,
        //    //        NOC = "0013",
        //    //        Title = "Senior managers - financial, communications and other business services"
        //    //    }
        //    //};
        //    //return occupations;
        //    //return await _context.Occupations.ToListAsync();
        //}

        // PUT: api/Occupations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutOccupation(int id, Occupation occupation)
        //{
        //    if (id != occupation.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(occupation).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!OccupationExists(id))
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

        //// POST: api/Occupations
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        //public async Task<ActionResult<Occupation>> PostOccupation(Occupation occupation)
        //{
        //    _context.Occupations.Add(occupation);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetOccupation", new { id = occupation.Id }, occupation);
        //}

        //// DELETE: api/Occupations/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<Occupation>> DeleteOccupation(int id)
        //{
        //    var occupation = await _context.Occupations.FindAsync(id);
        //    if (occupation == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Occupations.Remove(occupation);
        //    await _context.SaveChangesAsync();

        //    return occupation;
        //}

        //private bool OccupationExists(int id)
        //{
        //    return _context.Occupations.Any(e => e.Id == id);
        //}
        #endregion
    }
}
