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

Alter table #TempTitles
Add NOCCodeId varchar(10);

Update #TempTitles
Set NOCCodeId = n.Id
From #TempTitles t JOIN NOC n
ON t.noctitle = n.NOCCode

--Resetting table's id column
DBCC CHECKIDENT ('dbo.CommonJobTitle', RESEED, 0);

--Insert data into CommonJobTitle table from temp table.
INSERT INTO CommonJobTitle(NOCId, JobTitle) 
Select NOCCodeId, commonjobtitle from #TempTitles;

--Delete temp table
Drop table #TempTitles

--Check results
Select * from CommonJobTitle
