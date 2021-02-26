import { FilterOptionModel, OccupationModel } from "../client/dataTypes";

export const defaultFilterOption = {
    region: {id: 1, value: 'British Columbia'}, 
    education: {id: -1, value: 'All'}, 
    occupational_interest: {id: -1, value: 'All'}, 
    industry: {id: 'All', value: 'All'}, 
    occupational_group: {id: -1, value: 'All'}, 
    part_time_option: {id: -1, value: 'All'}, 
    annual_salary: {id: -1, value: 'All'},
    keyword: ""
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
    selectedNoc: string,
    view: string,
    isReset: boolean,
    checkedNocs: string[],
    sortOption: string
}

export const defaultFilterState: FilterState = Object.freeze({
    filterOption: defaultFilterOption,
    filteredOccupationsList: [],
    selectedNoc: 'default',
    view: 'results',
    isReset: true,
    checkedNocs: [],
    sortOption: 'High to Low'
})

export type FilterAction = 
{type: 'set-filtered-occupation-list', payload: OccupationModel[] | undefined } |
{type: 'set-selected-noc', payload: string} |
{type: 'set-filter-options', payload: FilterOptionModel} |
{type: 'set-view', payload: string} |
{type: 'set-selected-boxes', payload: number} |
{type: 'set-checked-nocs', payload: string[]} |
{type: 'set-sort-option', payload: string} |
{type: 'reset'}

export function reducer(state: FilterState = defaultFilterState , action: FilterAction): FilterState {
    switch(action.type) {        
        case 'set-filtered-occupation-list': //sorts table results from high to low job openings and displays preview of career with max openings
        action.payload = state.sortOption === 'High to Low'? action.payload.sort((a: OccupationModel, b: OccupationModel ) => {return a.jobOpenings > b.jobOpenings ? -1 : 1 }):
        state.sortOption === 'Low to High'? action.payload.sort((a: OccupationModel, b: OccupationModel ) => {return a.jobOpenings < b.jobOpenings ? -1 : 1 }):
        state.sortOption === 'A-Z'? action.payload.sort((a: OccupationModel, b: OccupationModel ) => {return a.title < b.title ? -1 : 1 }): 
        state.sortOption === 'Z-A'? action.payload.sort((a: OccupationModel, b: OccupationModel ) => {return a.title > b.title ? -1 : 1 }): action.payload    
        return ({...state, filteredOccupationsList: action.payload, selectedNoc: state.selectedNoc === 'default'? action.payload[0]?.noc : state.selectedNoc})
        
        case 'set-selected-noc':
            return ({...state, selectedNoc: action.payload})

        case 'set-filter-options': 
           return ({...state, filterOption: {...state.filterOption, ...action.payload}, isReset: false})

        case 'set-view': 
            return ({...state, view: action.payload})

        case 'set-checked-nocs':
            return ({...state, checkedNocs: action.payload})

        case 'set-sort-option':
            return ({...state, sortOption: action.payload})

        case 'reset': 
            return ({...state, ...defaultFilterState, isReset: !state.isReset})
        
        default: 
            return state
    }
}