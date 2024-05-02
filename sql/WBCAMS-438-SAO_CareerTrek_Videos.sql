BEGIN TRANSACTION

select count (*)
from NOCVideos

INSERT INTO [dbo].[NOCVideos]
           ([NOCId]
           ,[CareerTrekVideoID]
           ,[CareerTrekVideoPosition])
     VALUES
        ((select ID from NOC where NOCCode = 7321), 'k8klzO8Jaco', (SELECT
    ISNULL(MIN(CareerTrekVideoPosition), 1) - 1 FROM NOCVideos WHERE NOCId = (select id from NOC where NOCCode = 7321))) -- 175
       
       ,((select ID from NOC where NOCCode = 7521), '8oj2YxsdmQM', (SELECT
    ISNULL(MIN(CareerTrekVideoPosition), 1) - 1 FROM NOCVideos WHERE NOCId = (select id from NOC where NOCCode = 7521))) -- 176
       
       ,((select ID from NOC where NOCCode = 6341), 'P_qh9m4lkcY', (SELECT
    ISNULL(MIN(CareerTrekVideoPosition), 1) - 1 FROM NOCVideos WHERE NOCId = (select id from NOC where NOCCode = 6341))) -- 177
       
       ,((select ID from NOC where NOCCode = 2131), 'SmOXVn0NRjk', (SELECT
    ISNULL(MIN(CareerTrekVideoPosition), 1) - 1 FROM NOCVideos WHERE NOCId = (select id from NOC where NOCCode = 2131))) -- 178
                                                    
       ,((select ID from NOC where NOCCode = 4032), 'D6QlqkQu5mU', (SELECT
    ISNULL(MIN(CareerTrekVideoPosition), 1) - 1 FROM NOCVideos WHERE NOCId = (select id from NOC where NOCCode = 4032))) -- 179
                                                    
       ,((select ID from NOC where NOCCode = 4152), 'vtgOv5ap5IA', (SELECT
    ISNULL(MIN(CareerTrekVideoPosition), 1) - 1 FROM NOCVideos WHERE NOCId = (select id from NOC where NOCCode = 4152))) -- 180
                                                    
       ,((select ID from NOC where NOCCode = 2174), '8OoS_PLEMm0', (SELECT
    ISNULL(MIN(CareerTrekVideoPosition), 1) - 1 FROM NOCVideos WHERE NOCId = (select id from NOC where NOCCode = 2174))) -- 181
                                                    
       ,((select ID from NOC where NOCCode = 0213), 'GYV76mxDL4Q', (SELECT
    ISNULL(MIN(CareerTrekVideoPosition), 1) - 1 FROM NOCVideos WHERE NOCId = (select id from NOC where NOCCode = 0213))) -- 182
       
    ,((select ID from NOC where NOCCode = 4214), 'Itg5PS29BKU', (SELECT
    ISNULL(MIN(CareerTrekVideoPosition), 1) - 1 FROM NOCVideos WHERE NOCId = (select id from NOC where NOCCode = 4214))) -- 183
                                                    
       ,((select ID from NOC where NOCCode = 7241), 'Iphb6H8B9W4', (SELECT
    ISNULL(MIN(CareerTrekVideoPosition), 1) - 1 FROM NOCVideos WHERE NOCId = (select id from NOC where NOCCode = 7241))) -- 184

select count (*)
from NOCVideos

-- ROLLBACK TRANSACTION
 COMMIT TRANSACTION