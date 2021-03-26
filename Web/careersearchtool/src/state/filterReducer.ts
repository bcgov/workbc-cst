import { FilterOptionModel, OccupationModel } from "../client/dataTypes";

export const defaultFilterOption = {
    region: {id: 1, value: 'All'}, 
    education: {id: -1, value: 'All'}, 
    occupational_interest: {id: -1, value: 'All'}, 
    industry: {id: 'All', value: 'All'}, 
    occupational_group: {id: -1, value: 'All'}, 
    part_time_option: {id: -1, value: 'All'}, 
    annual_salary: {id: -1, value: 'All'},
    keyword: ''
}

export const defaultFilterParams = {
    GeographicAreaId : -1,
    EducationLevelId : -1,
    OccupationalInterestId : -1,
    IndustryId : -1,
    OccupationalGroupId : -1, 
    FullTimeOrPartTimeId : -1,
    AnnualSalaryId : -1,
    Keywords: ''
}

export interface FilterState {
    filterOption?: FilterOptionModel,
    filteredOccupationsList? : OccupationModel[],
    listSize: number,
    selectedNoc: string,
    isFilterApplied: boolean,
    checkedNocs: string[],
    isSorted: boolean,
    sortOption: string,
    isFetchingOccupationList: boolean
}

export const defaultFilterState: FilterState = Object.freeze({
    filterOption: defaultFilterOption,
    filteredOccupationsList: [],
    listSize: 0,
    selectedNoc: undefined,
    isFilterApplied: false,
    checkedNocs: [],
    isSorted: false,
    sortOption: 'High to Low',
    isFetchingOccupationList: true
})

export type FilterAction = 
{type: 'set-filtered-occupation-list', payload: OccupationModel[] | undefined } |
{type: 'set-scroll-position', payload: number} |
{type: 'set-list-size', payload: number} |
{type: 'set-selected-noc', payload: string} |
{type: 'set-filter-options', payload: FilterOptionModel} |
{type: 'set-selected-boxes', payload: number} |
{type: 'set-checked-nocs', payload: string[]} |
{type: 'set-sort-option', payload: string} |
{type: 'set-is-fetching-results', payload: boolean} |
{type: 'apply-filter'} |
{type: 'reset'}

export function reducer(state: FilterState = defaultFilterState , action: FilterAction): FilterState {
    switch(action.type) {        
        case 'set-filtered-occupation-list': //sorts table results from high to low job openings and displays preview of career with max openings
            return ({...state, filteredOccupationsList: action.payload})

        case 'set-filter-options': 
           return ({...state, filterOption: {...state.filterOption, ...action.payload}})

        case 'reset': 
            return ({...state, ...defaultFilterState})
        
        default: 
            return state
    }
}