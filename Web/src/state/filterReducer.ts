import { FilterOptionModel, FilterTypeModel, OccupationModel } from "../client/dataTypes";

export const defaultFilterOption = {
    region: {id: -1, value: 'British Columbia'}, 
    education: {id: -1, value: 'All'}, 
    occupational_interest: {id: -1, value: 'All'}, 
    industry: {id: -1, value: 'All'}, 
    occupational_group: {id: -1, value: 'All'}, 
    part_time_option: {id: -1, value: 'All'}, 
    annual_salary: {id: -1, value: 'All'}
}

export const defaultFilterParams = {
    GeographicAreaId : -1,
    EducationLevelId : -1,
    OccupationalInterestId : -1,
    IndustryId : -1,
    OccupationalGroupId : -1, 
    FullTimeOrPartTimeId : -1,
    AnnualSalaryId : -1
}

export interface FilterState {
    filterOption?: FilterOptionModel,
    filteredOccupationsList? : OccupationModel[],
    selectedNoc: string
}

export const defaultFilterState: FilterState = Object.freeze({
    filterOption: defaultFilterOption,
    filteredOccupationsList: [],
    selectedNoc: 'default'
})

export type FilterAction = 
{type: 'set-region-option', payload: FilterTypeModel} |
{type: 'set-education-option', payload: FilterTypeModel} |
{type: 'set-occupational-interest-option', payload: FilterTypeModel} |
{type: 'set-industry-option', payload: FilterTypeModel} |
{type: 'set-occupational-group-option', payload: FilterTypeModel} |
{type: 'set-part-time-option', payload: FilterTypeModel}|
{type: 'set-annual-salary-option', payload: FilterTypeModel} |
{type: 'set-filtered-occupation-list', payload: OccupationModel[] | undefined } |
{type: 'set-selected-noc', payload: string} |
{type: 'reset'}

export function reducer(state: FilterState = defaultFilterState , action: FilterAction): FilterState {
    switch(action.type) {
        case 'set-region-option': 
            return {...state, filterOption: {...state.filterOption, region: action.payload}}

        case 'set-education-option': 
            return {...state, filterOption: {...state.filterOption, education: action.payload}}
        
        case 'set-occupational-interest-option': 
            return {...state, filterOption: {...state.filterOption, occupational_interest: action.payload}}
        
        case 'set-industry-option': 
            return {...state, filterOption: {...state.filterOption, industry: action.payload}}
        
        case 'set-occupational-group-option': 
            return {...state, filterOption: {...state.filterOption, occupational_group: action.payload}}
        
        case 'set-part-time-option': 
            return {...state, filterOption: {...state.filterOption, part_time_option: action.payload}}

        case 'set-annual-salary-option': 
            return {...state, filterOption: {...state.filterOption, annual_salary: action.payload}}
        
        case 'set-filtered-occupation-list': 
            return ({...state, filteredOccupationsList: action.payload})
        
        case 'set-selected-noc':
            return ({...state, selectedNoc: action.payload})

        case 'reset': 
            return defaultFilterState
    }
}