--USE [TransferableSkillsTool]
--GO

/****** Object: Table [dbo].[Similarities] Script Date: 9/3/2020 3:16:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE if exists  [dbo].[Similarities];

 
GO
CREATE TABLE [dbo].[Similarities] (
    [Id]    INT           NOT NULL PRIMARY KEY,
    [Value] VARCHAR (MAX) NULL
);


