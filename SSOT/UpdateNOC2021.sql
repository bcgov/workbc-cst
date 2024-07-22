--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_cst\SSOT\nocs.json', SINGLE_CLOB) import
SELECT * Into #TempNocs
FROM OPENJSON (@JSON)
WITH 
(
    [noc_2021] varchar(255), 
    [label_en] varchar(max),
	[definition_en] varchar(max),
	[teer_level] int,
	[noc_level] int
)

--Resetting NOC table's id column
DBCC CHECKIDENT ('dbo.NOC', RESEED, 0);

--Insert records into NOC table with Description,JobOverviewSummary, EducationLevelId from temp table
INSERT INTO NOC(NOCCode, Description, JobOverviewSummary, EducationLevelId, JobBoardNOCCode) 
Select noc_2021, label_en, definition_en, teer_level, noc_2021 from #TempNocs
where noc_level =5;

--Drop temp table
Drop table #TempNocs

--Check results
Select * from NOC


