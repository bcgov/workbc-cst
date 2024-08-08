
-- Add the FK back to the tables
ALTER TABLE [dbo].[NOC] WITH CHECK ADD CONSTRAINT [PK_NOC] PRIMARY KEY CLUSTERED ([Id])
GO

ALTER TABLE [dbo].[JobOpening]  WITH CHECK ADD CONSTRAINT [FK_JobOpening_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO

ALTER TABLE [dbo].[CommonJobTitle]  WITH CHECK ADD CONSTRAINT [FK_CommonJobTitle_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO

ALTER TABLE [dbo].[NOC]  WITH CHECK ADD CONSTRAINT [FK_NOC_EducationLevel] FOREIGN KEY([EducationLevelId])
REFERENCES [dbo].[EducationLevel] ([Id])
GO

ALTER TABLE [dbo].[NOCOccupationInterest]  WITH CHECK ADD CONSTRAINT [FK_NOCOccupationInterest_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO

ALTER TABLE [dbo].[NOCOccupationGroup]  WITH CHECK ADD CONSTRAINT [FK_NOCOccupationGroup_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO

ALTER TABLE [dbo].[NOCVideos]  WITH CHECK ADD  CONSTRAINT [FK_NOCVideos_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO


ALTER TABLE [dbo].[NOCOccupationInterest]  WITH CHECK ADD CONSTRAINT [FK_NOCOccupationInterest_OccupationalInterest] FOREIGN KEY([OccupationInterestId])
REFERENCES [dbo].[OccupationalInterest] ([Id])
GO
