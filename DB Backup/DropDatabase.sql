ALTER TABLE [dbo].[SubIndustry] DROP CONSTRAINT [FK_SubIndustry_Industry]
GO
ALTER TABLE [dbo].[NOCVideos] DROP CONSTRAINT [FK_NOCVideos_NOC]
GO
ALTER TABLE [dbo].[NOCOccupationInterest] DROP CONSTRAINT [FK_NOCOccupationInterest_OccupationInterestOption]
GO
ALTER TABLE [dbo].[NOCOccupationInterest] DROP CONSTRAINT [FK_NOCOccupationInterest_OccupationalInterest]
GO
ALTER TABLE [dbo].[NOCOccupationInterest] DROP CONSTRAINT [FK_NOCOccupationInterest_NOC]
GO
ALTER TABLE [dbo].[NOCOccupationGroup] DROP CONSTRAINT [FK_NOCOccupationGroup_OccupationGroup]
GO
ALTER TABLE [dbo].[NOCOccupationGroup] DROP CONSTRAINT [FK_NOCOccupationGroup_NOC]
GO
ALTER TABLE [dbo].[NOCOccupationGroup] DROP CONSTRAINT [FK_NOCOccupationGroup_GeographicArea]
GO
ALTER TABLE [dbo].[NOC] DROP CONSTRAINT [FK_NOC_FullOrPartTime]
GO
ALTER TABLE [dbo].[NOC] DROP CONSTRAINT [FK_NOC_EducationLevel]
GO
ALTER TABLE [dbo].[JobOpening] DROP CONSTRAINT [FK_JobOpening_SubIndustry]
GO
ALTER TABLE [dbo].[JobOpening] DROP CONSTRAINT [FK_JobOpening_NOC]
GO
ALTER TABLE [dbo].[JobOpening] DROP CONSTRAINT [FK_JobOpening_Industry]
GO
ALTER TABLE [dbo].[CommonJobTitle] DROP CONSTRAINT [FK_CommonJobTitle_NOC]
GO
/****** Object:  Table [dbo].[SubIndustry]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[SubIndustry]
GO
/****** Object:  Table [dbo].[OccupationInterestOption]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[OccupationInterestOption]
GO
/****** Object:  Table [dbo].[OccupationGroup]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[OccupationGroup]
GO
/****** Object:  Table [dbo].[OccupationalInterest]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[OccupationalInterest]
GO
/****** Object:  Table [dbo].[NOCVideos]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[NOCVideos]
GO
/****** Object:  Table [dbo].[NOCOccupationInterest]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[NOCOccupationInterest]
GO
/****** Object:  Table [dbo].[NOCOccupationGroup]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[NOCOccupationGroup]
GO
/****** Object:  Table [dbo].[NOC]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[NOC]
GO
/****** Object:  Table [dbo].[JobOpening]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[JobOpening]
GO
/****** Object:  Table [dbo].[Industry]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[Industry]
GO
/****** Object:  Table [dbo].[GeographicArea]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[GeographicArea]
GO
/****** Object:  Table [dbo].[FullOrPartTime]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[FullOrPartTime]
GO
/****** Object:  Table [dbo].[EducationLevel]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[EducationLevel]
GO
/****** Object:  Table [dbo].[CommonJobTitle]    Script Date: 3/29/2021 11:25:50 AM ******/
DROP TABLE [dbo].[CommonJobTitle]
GO
