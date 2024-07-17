--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_cst\SSOT\titles.json', SINGLE_CLOB) import
SELECT * Into #TempTitles
FROM OPENJSON (@JSON)
WITH 
(
    [noctitle] varchar(10), 
	[commonjobtitle] varchar(500)
)

--Resetting the id column of CommonJobTitles table
DBCC CHECKIDENT ('dbo.CommonJobTitle', RESEED, 0);

--Insert data into CommonJobTitles table from temp table.
Insert into CommonJobTitle (NOCId, JobTitle)
Select noctitle, commonjobtitle
From #TempTitles

--Delete temp table
Drop table #TempTitles

--Check results
Select * from CommonJobTitle
