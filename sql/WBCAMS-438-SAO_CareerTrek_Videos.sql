BEGIN TRANSACTION

select count (*)
from NOCVideos

INSERT INTO [dbo].[NOCVideos]
           ([NOCId]
           ,[CareerTrekVideoID]
           ,[CareerTrekVideoPosition])
     VALUES
        ((select ID from NOC where NOCCode = 7321), 'k8klzO8Jaco', 0) -- 175
       ,((select ID from NOC where NOCCode = 7521), '8oj2YxsdmQM', 0) -- 176
       ,((select ID from NOC where NOCCode = 6341), 'P_qh9m4lkcY', 0) -- 177
       ,((select ID from NOC where NOCCode = 2131), 'SmOXVn0NRjk', 0) -- 178
       ,((select ID from NOC where NOCCode = 4032), 'D6QlqkQu5mU', 0) -- 179
       ,((select ID from NOC where NOCCode = 4152), 'vtgOv5ap5IA', 0) -- 180
       ,((select ID from NOC where NOCCode = 2174), '8OoS_PLEMm0', 0) -- 181
       ,((select ID from NOC where NOCCode = 0213), 'GYV76mxDL4Q', 0) -- 182
       ,((select ID from NOC where NOCCode = 4214), 'Itg5PS29BKU', 0) -- 183
       ,((select ID from NOC where NOCCode = 7241), 'Iphb6H8B9W4', 0) -- 184

select count (*)
from NOCVideos

-- ROLLBACK TRANSACTION
 COMMIT TRANSACTION