--USE [TransferableSkillsTool]
--GO

/****** Object: Table [dbo].[Salaries] Script Date: 9/3/2020 3:16:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE if exists  [dbo].[Salaries];


GO
CREATE TABLE [dbo].[Salaries] (
    [Id]    INT           NOT NULL PRIMARY KEY,
    [Value] VARCHAR (MAX) NULL
);
 

