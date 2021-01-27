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
    annual_salary?: FilterTypeModel
}