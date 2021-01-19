--USE [TransferableSkillsTool]
--GO

/****** Object: Table [dbo].[Occupations] Script Date: 8/31/2020 1:26:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE if exists [dbo].[Occupations];


GO 
create TABLE [dbo].[Occupations] (
    [Id]               INT           NOT NULL PRIMARY KEY,
    [NOC]              VARCHAR (MAX) NULL,
    [Title]            VARCHAR (MAX) NULL,
    [EducationId] INT           NULL,
    [WorkExperienceId] INT           NULL,
    [Income]     VARCHAR (MAX)           NULL,
    [SalaryRangeId] INT           NULL,
	
	FOREIGN KEY ([EducationId]) REFERENCES EducationLevels(Id),
	FOREIGN KEY ([WorkExperienceId]) REFERENCES WorkExperiences(Id),    
	FOREIGN KEY ([SalaryRangeId]) REFERENCES Salaries(Id)
);


