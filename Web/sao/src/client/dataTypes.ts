export enum FilterType { // All filters' dropdown values in UI has common data structure like FilterTypeModel
    region, 
    education, 
    occupational_interest, 
    industry, 
    occupational_group, 
    part_time_option, 
    annual_salary
}

export interface FilterTypeModel {
    id: number,
    value: string
}

export interface FilterDataResponse {
    data: FilterTypeModel[] | undefined
    isValidating: boolean
    isSettled: boolean
}

export interface FilterOptionModel {
    region?: FilterTypeModel, 
    education?: FilterTypeModel, 
    occupational_interest?: FilterTypeModel, 
    industry?: FilterTypeModel, 
    occupational_group?: FilterTypeModel, 
    part_time_option?: FilterTypeModel, 
    annual_salary?: FilterTypeModel,
    keyword?: string
}

export interface OccupationalListResponse {
    data: OccupationModel[] | undefined
    isValidating: boolean,
    isSettled: boolean
}

export interface OccupationModel {
    id: number, 
    noc: string,
    nocAndTitle: string,
    jobOpenings: number
}

export interface FilterOccupationParams {
    GeographicAreaId?: number,
    EducationLevelId?: number,
    OccupationalInterestId?: number,
    IndustryId?: number,
    OccupationalGroupId?: number, 
    FullTimeOrPartTimeId? : number,
    AnnualSalaryId?: number,
    Keywords?: string
}
export interface Education { // Education is similar to FilterTypeModel but for different purpose. 
    id: number, 
    value: string
}

export interface OccupationSummary {
    id: number, 
    noc: string,
    description: string, 
    title: string, 
    education: Education,
    workExperience: string,
    income: string,
    jobOpenings: number
}

export interface OccupationSummaryResponse {
    data: OccupationSummary[] | undefined,
    isValidating: boolean,
    isSettled: boolean
}

export interface GetSystemConfigurationParams {
    name: string
}

export interface SystemConfigurationModel {
    id: number, 
    name: string,
    value: string
}

export type GetSystemConfigurationResponse = SystemConfigurationModel

export interface UseGetSystemConfigurationResponse {
    data?: SystemConfigurationModel,
    isValidating: boolean,
    isSettled: boolean
}