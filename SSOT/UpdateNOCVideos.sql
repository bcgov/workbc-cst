--Load file contents into a temp table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_cst\SSOT\ssot_career_trek_videos.json', SINGLE_CLOB) import
SELECT * Into #TempVideos
FROM OPENJSON (@JSON)
WITH 
(
    [noc_2021] varchar(10), 
    [youtube_link] varchar(max)
)

Alter table #TempVideos
Add NOCCodeId varchar(10);

Alter table #TempVideos
Add VideoId varchar(max); 

Update #TempVideos
Set NOCCodeId = n.Id
From #TempVideos t JOIN NOC n
ON t.noc_2021 = n.NOCCode

--Select characters after / including /
Update #TempVideos
Set VideoId = RIGHT(youtube_link,charindex('/',reverse(youtube_link),1)-1)
From #TempVideos

--Update NOCId in NOCVideos table based on VideoId.
Update NOCVideos
Set NOCId =  noc_2021 from #TempVideos
where CareerTrekVideoID = VideoId

--Delete temp table
Drop table #TempVideos

--Check results
Select * from NOCVideos