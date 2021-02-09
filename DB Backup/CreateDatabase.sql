/****** Object:  Table [dbo].[CommonJobTitle]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommonJobTitle](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[JobTitle] [nvarchar](max) NULL,
	[NOCId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EducationLevel]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EducationLevel](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Value] [varchar](255) NULL,
 CONSTRAINT [PK_EducationLevel] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FullOrPartTime]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FullOrPartTime](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Value] [varchar](255) NULL,
 CONSTRAINT [PK_FullOrPartTime] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GeographicArea]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GeographicArea](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Value] [varchar](255) NULL,
 CONSTRAINT [PK_GeographicArea] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Industry]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Industry](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Value] [varchar](255) NULL,
 CONSTRAINT [PK_Industry] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JobOpening]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobOpening](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NOCId] [int] NULL,
	[GeographicAreaId] [int] NULL,
	[JobOpenings] [int] NULL,
	[IndustryId] [int] NULL,
	[SubIndustryId] [int] NULL,
 CONSTRAINT [PK_JobOpening] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NOC]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NOC](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NOCCode] [varchar](255) NULL,
	[Description] [varchar](max) NULL,
	[MedianSalary] [decimal](18, 0) NULL,
	[EducationLevelId] [int] NULL,
	[FullOrPartTimeId] [int] NULL,
	[JobOverviewSummary] [varchar](max) NULL,
 CONSTRAINT [PK_NOC] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NOCOccupationGroup]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NOCOccupationGroup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NOCId] [int] NULL,
	[OccupationalGroupId] [int] NULL,
	[GeographicAreaId] [int] NULL,
 CONSTRAINT [PK_NOCOccupationGroup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NOCOccupationInterest]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NOCOccupationInterest](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NOCId] [int] NULL,
	[OccupationInterestId] [int] NULL,
	[OccupationInterestOptionId] [int] NULL,
 CONSTRAINT [PK_NOCOccupationInterest] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NOCVideos]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NOCVideos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NOCId] [int] NOT NULL,
	[CareerTrekVideoID] [varchar](500) NOT NULL,
	[CareerTrekVideoPosition] [int] NOT NULL,
 CONSTRAINT [PK_NOCVideos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OccupationalInterest]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OccupationalInterest](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Value] [varchar](255) NULL,
 CONSTRAINT [PK_OccupationalInterest] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OccupationGroup]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OccupationGroup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Value] [varchar](255) NULL,
 CONSTRAINT [PK_OccupationGroup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OccupationInterestOption]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OccupationInterestOption](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Value] [varchar](255) NULL,
 CONSTRAINT [PK_OccupationInterestOption] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubIndustry]    Script Date: 2/9/2021 2:01:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubIndustry](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Value] [varchar](255) NOT NULL,
	[IndustryId] [int] NOT NULL,
 CONSTRAINT [PK_SubIndustry] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CommonJobTitle]  WITH CHECK ADD  CONSTRAINT [FK_CommonJobTitle_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO
ALTER TABLE [dbo].[CommonJobTitle] CHECK CONSTRAINT [FK_CommonJobTitle_NOC]
GO
ALTER TABLE [dbo].[JobOpening]  WITH CHECK ADD  CONSTRAINT [FK_JobOpening_Industry] FOREIGN KEY([IndustryId])
REFERENCES [dbo].[Industry] ([Id])
GO
ALTER TABLE [dbo].[JobOpening] CHECK CONSTRAINT [FK_JobOpening_Industry]
GO
ALTER TABLE [dbo].[JobOpening]  WITH CHECK ADD  CONSTRAINT [FK_JobOpening_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO
ALTER TABLE [dbo].[JobOpening] CHECK CONSTRAINT [FK_JobOpening_NOC]
GO
ALTER TABLE [dbo].[JobOpening]  WITH CHECK ADD  CONSTRAINT [FK_JobOpening_SubIndustry] FOREIGN KEY([SubIndustryId])
REFERENCES [dbo].[SubIndustry] ([Id])
GO
ALTER TABLE [dbo].[JobOpening] CHECK CONSTRAINT [FK_JobOpening_SubIndustry]
GO
ALTER TABLE [dbo].[NOC]  WITH CHECK ADD  CONSTRAINT [FK_NOC_EducationLevel] FOREIGN KEY([EducationLevelId])
REFERENCES [dbo].[EducationLevel] ([Id])
GO
ALTER TABLE [dbo].[NOC] CHECK CONSTRAINT [FK_NOC_EducationLevel]
GO
ALTER TABLE [dbo].[NOC]  WITH CHECK ADD  CONSTRAINT [FK_NOC_FullOrPartTime] FOREIGN KEY([FullOrPartTimeId])
REFERENCES [dbo].[FullOrPartTime] ([Id])
GO
ALTER TABLE [dbo].[NOC] CHECK CONSTRAINT [FK_NOC_FullOrPartTime]
GO
ALTER TABLE [dbo].[NOCOccupationGroup]  WITH CHECK ADD  CONSTRAINT [FK_NOCOccupationGroup_GeographicArea] FOREIGN KEY([GeographicAreaId])
REFERENCES [dbo].[GeographicArea] ([Id])
GO
ALTER TABLE [dbo].[NOCOccupationGroup] CHECK CONSTRAINT [FK_NOCOccupationGroup_GeographicArea]
GO
ALTER TABLE [dbo].[NOCOccupationGroup]  WITH CHECK ADD  CONSTRAINT [FK_NOCOccupationGroup_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO
ALTER TABLE [dbo].[NOCOccupationGroup] CHECK CONSTRAINT [FK_NOCOccupationGroup_NOC]
GO
ALTER TABLE [dbo].[NOCOccupationGroup]  WITH CHECK ADD  CONSTRAINT [FK_NOCOccupationGroup_OccupationGroup] FOREIGN KEY([OccupationalGroupId])
REFERENCES [dbo].[OccupationGroup] ([Id])
GO
ALTER TABLE [dbo].[NOCOccupationGroup] CHECK CONSTRAINT [FK_NOCOccupationGroup_OccupationGroup]
GO
ALTER TABLE [dbo].[NOCOccupationInterest]  WITH CHECK ADD  CONSTRAINT [FK_NOCOccupationInterest_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO
ALTER TABLE [dbo].[NOCOccupationInterest] CHECK CONSTRAINT [FK_NOCOccupationInterest_NOC]
GO
ALTER TABLE [dbo].[NOCOccupationInterest]  WITH CHECK ADD  CONSTRAINT [FK_NOCOccupationInterest_OccupationalInterest] FOREIGN KEY([OccupationInterestId])
REFERENCES [dbo].[OccupationalInterest] ([Id])
GO
ALTER TABLE [dbo].[NOCOccupationInterest] CHECK CONSTRAINT [FK_NOCOccupationInterest_OccupationalInterest]
GO
ALTER TABLE [dbo].[NOCOccupationInterest]  WITH CHECK ADD  CONSTRAINT [FK_NOCOccupationInterest_OccupationInterestOption] FOREIGN KEY([OccupationInterestOptionId])
REFERENCES [dbo].[OccupationInterestOption] ([Id])
GO
ALTER TABLE [dbo].[NOCOccupationInterest] CHECK CONSTRAINT [FK_NOCOccupationInterest_OccupationInterestOption]
GO
ALTER TABLE [dbo].[NOCVideos]  WITH CHECK ADD  CONSTRAINT [FK_NOCVideos_NOC] FOREIGN KEY([NOCId])
REFERENCES [dbo].[NOC] ([Id])
GO
ALTER TABLE [dbo].[NOCVideos] CHECK CONSTRAINT [FK_NOCVideos_NOC]
GO
ALTER TABLE [dbo].[SubIndustry]  WITH CHECK ADD  CONSTRAINT [FK_SubIndustry_Industry] FOREIGN KEY([IndustryId])
REFERENCES [dbo].[Industry] ([Id])
GO
ALTER TABLE [dbo].[SubIndustry] CHECK CONSTRAINT [FK_SubIndustry_Industry]
GO
