--USE [TransferableSkillsTool]
--GO

/****** Object: Table [dbo].[EducationLevels] Script Date: 9/3/2020 3:13:24 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


DROP TABLE if exists [EducationLevels] 

GO
CREATE TABLE [dbo].[EducationLevels] (
    [Id]    INT           NOT NULL primary key,
    [Value] VARCHAR (MAX) NULL
);


