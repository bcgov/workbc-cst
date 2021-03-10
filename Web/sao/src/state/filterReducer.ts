import { FilterOptionModel, OccupationModel } from "../client/dataTypes";

export const defaultFilterOption = {
    region: {id: 1, value: 'British Columbia'}, 
    education: {id: -1, value: 'All'}, 
    occupational_interest: {id: -1, value: 'All'}, 
    industry: {id: '-1', value: 'All'}, 
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
    view: string,
    isFilterApplied: boolean,
    isReset: boolean,
    checkedNocs: string[],
    isSorted: boolean,
    sortOption: string,
    returnToResults: boolean
}

export const defaultFilterState: FilterState = Object.freeze({
    filterOption: defaultFilterOption,
    filteredOccupationsList: [],
    listSize: 0,
    selectedNoc: undefined,
    view: 'results',
    isFilterApplied: false,
    isReset: true,
    checkedNocs: [],
    isSorted: false,
    sortOption: 'High to Low',
    returnToResults: false
})

export type FilterAction = 
{type: 'set-filtered-occupation-list', payload: OccupationModel[] | undefined } |
{type: 'set-list-size', payload: number} |
{type: 'set-selected-noc', payload: string} |
{type: 'set-filter-options', payload: FilterOptionModel} |
{type: 'set-view', payload: string} |
{type: 'set-selected-boxes', payload: number} |
{type: 'set-checked-nocs', payload: string[]} |
{type: 'set-return-to-results', payload: boolean} |
{type: 'set-sort-option', payload: string} |
{type: 'apply-filter'} |
{type: 'reset'}

export function reducer(state: FilterState = defaultFilterState , action: FilterAction): FilterState {
    switch(action.type) {        
        case 'set-filtered-occupation-list': //sorts table results from high to low job openings and displays preview of career with max openings
        action.payload = state.sortOption === 'High to Low'? action.payload.sort((a: OccupationModel, b: OccupationModel ) => {return a.jobOpenings > b.jobOpenings ? -1 : 1 }):
        state.sortOption === 'Low to High'? action.payload.sort((a: OccupationModel, b: OccupationModel ) => {return a.jobOpenings < b.jobOpenings ? -1 : 1 }):
        state.sortOption === 'A-Z'? action.payload.sort((a: OccupationModel, b: OccupationModel ) => {return a.title < b.title ? -1 : 1 }): 
        state.sortOption === 'Z-A'? action.payload.sort((a: OccupationModel, b: OccupationModel ) => {return a.title > b.title ? -1 : 1 }): action.payload    
        /* selectedNoc will be updated to first item is 'High to Low' sorted list of filtered Occupational List on intial load 
         and on every 'apply' action and selcted Noc will be retained on sorting */
        return ({...state, filteredOccupationsList: action.payload, selectedNoc: !!state.isFilterApplied? action.payload[0]?.noc : (!!state.selectedNoc? state.selectedNoc : action.payload[0]?.noc)})
        
        case 'set-list-size': 
            return ({...state, listSize: action.payload})
        
        case 'set-selected-noc':
            return ({...state, selectedNoc: action.payload, isFilterApplied: false, isReset: false})

        case 'set-filter-options': 
           return ({...state, filterOption: {...state.filterOption, ...action.payload}, isReset: false})

        case 'set-view': 
            return ({...state, view: action.payload, isReset: false})

        case 'set-checked-nocs':
            return ({...state, checkedNocs: action.payload, isReset: false})

        case 'set-return-to-results': 
            return ({...state, returnToResults: action.payload, isReset: false})
            
        case 'set-sort-option':
            return ({...state, isSorted: true, isFilterApplied: false, sortOption: action.payload, isReset: false})

        case 'apply-filter': 
            return ({...state, isSorted: false, sortOption: 'High to Low', isFilterApplied: true, isReset: false, selectedNoc: undefined, checkedNocs: []})

        case 'reset': 
            return ({...state, ...defaultFilterState, isReset: !state.isReset})
        
        default: 
            return state
    }
}