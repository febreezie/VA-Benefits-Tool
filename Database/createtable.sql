CREATE TABLE [dbo].[States] (
    [StateID]       INT IDENTITY(1, 1) NOT NULL,
    [StateName]     NVARCHAR(100) NOT NULL,
    [StateBenefits] NVARCHAR(MAX) NULL,
    [DR_10]         NVARCHAR(MAX) NULL,
    [DR_20]         NVARCHAR(MAX) NULL,
    [DR_30]         NVARCHAR(MAX) NULL,
    [DR_40]         NVARCHAR(MAX) NULL,
    [DR_50]         NVARCHAR(MAX) NULL,
    [DR_60]         NVARCHAR(MAX) NULL,
    [DR_70]         NVARCHAR(MAX) NULL,
    [DR_80]         NVARCHAR(MAX) NULL,
    [DR_90]         NVARCHAR(MAX) NULL,
    [DR_100]        NVARCHAR(MAX) NULL,
    CONSTRAINT [PK_States] PRIMARY KEY CLUSTERED ([StateID] ASC)
);
INSERT INTO States (StateName)
VALUES 
('Alabama'),
('Alaska'),
('Arizona'),
('Arkansas'),
('California'),
('Colorado'),
('Connecticut'),
('Delaware'),
('Florida'),
('Georgia'),
('Hawaii'),
('Idaho'),
('Illinois'),
('Indiana'),
('Iowa'),
('Kansas'),
('Kentucky'),
('Louisiana'),
('Maine'),
('Maryland'),
('Massachusetts'),
('Michigan'),
('Minnesota'),
('Mississippi'),
('Missouri'),
('Montana'),
('Nebraska'),
('Nevada'),
('New Hampshire'),
('New Jersey'),
('New Mexico'),
('New York'),
('North Carolina'),
('North Dakota'),
('Ohio'),
('Oklahoma'),
('Oregon'),
('Pennsylvania'),
('Rhode Island'),
('South Carolina'),
('South Dakota'),
('Tennessee'),
('Texas'),
('Utah'),
('Vermont'),
('Virginia'),
('Washington'),
('West Virginia'),
('Wisconsin'),
('Wyoming');
