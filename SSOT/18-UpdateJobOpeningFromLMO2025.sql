--Drop the foreign keys and primary keys on Id column in JobOpening table.
ALTER TABLE JobOpening
DROP CONSTRAINT FK_JobOpening_NOC;

--Delete the existing data in Job Openings table.
delete from JobOpening

--Insert the new LMO data in Job Openings table.
--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_cst_new\SSOT\ssot_career_search_openings.json', SINGLE_CLOB) import
SELECT * Into #TempGroups
FROM OPENJSON (@JSON)
WITH 
(
    [noc_2021] varchar(10), 
    [job_openings] varchar(255),
    [region] varchar(255),
    [industry_agg] varchar(255),
    [industry_sub] varchar(255)
)

Alter table #TempGroups
Add NOCCodeId varchar(10);

Alter table #TempGroups
Add GeoAreaId int; 

Alter table #TempGroups
Add IndustryId int; 

Alter table #TempGroups
Add SubIndustryId int; 

--Update the region to align with the code.
Update #TempGroups
SET region = 'All'
where region = 'British Columbia'

--Update the industry adn sub-industry to align with the code.
Update #TempGroups
SET industry_agg = 'All'
where industry_agg = 'All Industries'

--Update the industry adn sub-industry to align with the code.
Update #TempGroups
SET industry_sub = 'All'
where industry_sub = 'All Industries'


Update #TempGroups
Set NOCCodeId = n.Id
From #TempGroups t JOIN NOC n
ON t.noc_2021 = n.NOCCode

Update #TempGroups
Set GeoAreaId = g.Id
From #TempGroups t JOIN GeographicArea g
ON t.region = g.Value

Update #TempGroups
Set IndustryId = i.Id
From #TempGroups t JOIN Industry i
ON t.industry_agg = i.Value

Update #TempGroups
Set SubIndustryId = s.Id
From #TempGroups t JOIN SubIndustry s
ON t.industry_sub = s.Value

--Resetting table's id column
DBCC CHECKIDENT ('dbo.JobOpening', RESEED, 0);

--Insert data into JobOpening table from temp table.
INSERT INTO JobOpening(NOCId, GeographicAreaId, JobOpenings, IndustryId, SubIndustryId) 
Select NOCCodeId, GeoAreaId, job_openings, IndustryId, SubIndustryId from #TempGroups;

--Delete temp table
Drop table #TempGroups

--Add the constraint back
ALTER TABLE [dbo].[JobOpening]  WITH CHECK ADD CONSTRAINT [FK_JobOpening_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO

--Check results
Select * from JobOpening
