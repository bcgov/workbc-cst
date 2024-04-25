BEGIN TRANSACTION

select count (*)
from NOCVideos

INSERT INTO [dbo].[NOCVideos]
           ([NOCId]
           ,[CareerTrekVideoID]
           ,[CareerTrekVideoPosition])
     VALUES
        ((select ID from NOC where NOCCode = 7321), 'k8klzO8Jaco', 1) -- 175
		   ,((select ID from NOC where NOCCode = 7521), '8oj2YxsdmQM', 1) -- 176
		   ,((select ID from NOC where NOCCode = 6341), 'P_qh9m4lkcY', 1) -- 177
		   ,((select ID from NOC where NOCCode = 2131), 'SmOXVn0NRjk', 1) -- 178
		   ,((select ID from NOC where NOCCode = 4032), 'D6QlqkQu5mU', 0) -- 179
		   ,((select ID from NOC where NOCCode = 4152), 'vtgOv5ap5IA', 1) -- 180
		   ,((select ID from NOC where NOCCode = 2174), '8OoS_PLEMm0', 1) -- 181
		   ,((select ID from NOC where NOCCode = 0213), 'GYV76mxDL4Q', 0) -- 182
		   ,((select ID from NOC where NOCCode = 4214), 'Itg5PS29BKU', 1) -- 183
		   ,((select ID from NOC where NOCCode = 7241), 'Iphb6H8B9W4', 1) -- 184

select count (*)
from NOCVideos

-- ROLLBACK TRANSACTION
 COMMIT TRANSACTION