BEGIN TRANSACTION

select count (*)
from NOCVideos

delete from NocVideos
where CareerTrekVideoId in (
	 '2uBZhsMRmrc' -- 166
	,'0OdAhEoNp9E' -- 167
	,'upD9AaYOcUo' -- 168
	,'KfGd0MlS71E' -- 169
	,'zhCAWGHIZSM' -- 170
	,'lZU3XmxNgAc' -- 171
	,'VgEZ7jSAah0' -- 172 new
	,'GAPtyedPQAE' -- 172 old
	,'7ZXRvtCZvZI' -- 173
	,'VM90uPJS1x4' -- 174 old
	,'mI2Swv-T610' -- 174 new
)

select count (*)
from NOCVideos

INSERT INTO [dbo].[NOCVideos]
           ([NOCId]
           ,[CareerTrekVideoID]
           ,[CareerTrekVideoPosition])
     VALUES
            ((select ID from NOC where NOCCode = 3232), '2uBZhsMRmrc', 0) -- 166
		   ,((select ID from NOC where NOCCode = 3141), '0OdAhEoNp9E', 0) -- 167
		   ,((select ID from NOC where NOCCode = 2242), 'upD9AaYOcUo', 0) -- 168
		   ,((select ID from NOC where NOCCode = 7315), 'KfGd0MlS71E', 0) -- 169
		   ,((select ID from NOC where NOCCode = 3132), 'zhCAWGHIZSM', 0) -- 170
		   ,((select ID from NOC where NOCCode = 0423), 'lZU3XmxNgAc', 0) -- 171
		   ,((select ID from NOC where NOCCode = 2152), 'VgEZ7jSAah0', 0) -- 172 new
		   ,((select ID from NOC where NOCCode = 9243), '7ZXRvtCZvZI', 0) -- 173
		   ,((select ID from NOC where NOCCode = 3114), 'mI2Swv-T610', 0) -- 174 new

select count (*)
from NOCVideos

-- ROLLBACK TRANSACTION
 COMMIT TRANSACTION