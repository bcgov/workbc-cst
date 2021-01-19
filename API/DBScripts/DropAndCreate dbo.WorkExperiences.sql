--USE [TransferableSkillsTool]
--GO

/****** Object: Table [dbo].[WorkExperiences] Script Date: 9/3/2020 3:16:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE if exists [dbo].[WorkExperiences];


GO
CREATE TABLE [dbo].[WorkExperiences] (
    [Id]    INT           NOT NULL PRIMARY KEY,
    [Value] VARCHAR (MAX) NULL
);


