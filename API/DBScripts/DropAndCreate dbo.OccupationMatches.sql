--USE [TransferableSkillsTool]
--GO

/****** Object: Table [dbo].[OccupationMatches] Script Date: 8/31/2020 1:19:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE  if exists [dbo].[OccupationMatches];
 

CREATE TABLE [dbo].[OccupationMatches]
(
	[Id] INT NOT NULL PRIMARY KEY,
	CurrentOccupationId int,
	MatchedOccupationId int,
	SimilarityId int,
	FOREIGN KEY (CurrentOccupationId) REFERENCES Occupations(Id),
	FOREIGN KEY (MatchedOccupationId) REFERENCES Occupations(Id),
	FOREIGN KEY (SimilarityId) REFERENCES Similarities(Id)
)
