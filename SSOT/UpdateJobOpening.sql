--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_cst\SSOT\ssot_career_search_openings.json', SINGLE_CLOB) import
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

--Update JobOpening table from temp table.
Update JobOpening
Set GeographicAreaId = t.GeoAreaId
From #TempGroups t JOIN JobOpening j
ON t.NOCCodeId = j.NOCId

--Update JobOpening table from temp table.
Update JobOpening
Set JobOpenings = t.job_openings
From #TempGroups t JOIN JobOpening j
ON t.NOCCodeId = j.NOCId

--Update JobOpening table from temp table.
Update JobOpening
Set IndustryId = t.IndustryId
From #TempGroups t JOIN JobOpening j
ON t.NOCCodeId = j.NOCId

--Update JobOpening table from temp table.
Update JobOpening
Set SubIndustryId = t.SubIndustryId
From #TempGroups t JOIN JobOpening j
ON t.NOCCodeId = j.NOCId

--Delete temp table
Drop table #TempGroups

--Check results
Select * from JobOpening
