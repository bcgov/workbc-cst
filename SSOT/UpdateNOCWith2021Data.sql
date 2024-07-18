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
	[noc_level] int,
	[noc_2016] varchar(255)
)


--Update NOC table with NOCCode2021 values from temp table
Update NOC Set JobBoardNOCCode = noc_2021 
From #TempNocs t
where t.noc_2016 LIKE CONCAT('%', NOC.NOCCode , '%')

--Update NOC table with Description,JobOverviewSummary, EducationLevelId from temp table
Update NOC
Set NOCCode = noc_2021 , Description = label_en, JobOverviewSummary = definition_en, EducationLevelId = teer_level
from #TempNocs
where JobBoardNOCCode = noc_2021

--Drop temp table
Drop table #TempNocs

--Check results
Select * from NOC
