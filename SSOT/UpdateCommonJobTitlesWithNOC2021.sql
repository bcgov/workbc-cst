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

--Insert data into CommonJobTitles table from temp table.
Update CommonJobTitle
Set JobTitle = t.commonjobtitle
From #TempTitles t JOIN NOC n
ON t.noctitle = n.NOCCode
JOIN CommonJobTitle c
ON c.NOCId = n.Id

--Delete temp table
Drop table #TempTitles

--Check results
Select * from CommonJobTitle
