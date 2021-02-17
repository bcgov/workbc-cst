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
    showCompareView: boolean,
    isReset: boolean,
    checkedNocs: string[],
    sortOption: string
}

export const defaultFilterState: FilterState = Object.freeze({
    filterOption: defaultFilterOption,
    filteredOccupationsList: [],
    selectedNoc: 'default',
    showCompareView: false,
    isReset: true,
    checkedNocs: [],
    sortOption: ''
})

export type FilterAction = 
{type: 'set-filtered-occupation-list', payload: OccupationModel[] | undefined } |
{type: 'set-selected-noc', payload: string} |
{type: 'set-filter-options', payload: FilterOptionModel} |
{type: 'set-show-compare-view', payload: boolean} |
{type: 'set-selected-boxes', payload: number} |
{type: 'set-checked-nocs', payload: string[]} |
{type: 'set-sort-option', payload: string} |
{type: 'reset'}

export function reducer(state: FilterState = defaultFilterState , action: FilterAction): FilterState {
    switch(action.type) {        
        case 'set-filtered-occupation-list': //sorts table results from high to low job openings and displays preview of career with max openings
            action.payload = state.sortOption === ''? action.payload.sort((a: OccupationModel, b: OccupationModel ) => {return a.jobOpenings> b.jobOpenings ? -1 : 1 }): action.payload
            return ({...state, filteredOccupationsList: action.payload, selectedNoc: state.selectedNoc === 'default'? action.payload[0]?.noc : state.selectedNoc})
        
        case 'set-selected-noc':
            return ({...state, selectedNoc: action.payload})

        case 'set-filter-options': 
           return ({...state, filterOption: {...state.filterOption, ...action.payload}, isReset: false})

        case 'set-show-compare-view': 
            return ({...state, showCompareView: action.payload})

        case 'set-checked-nocs':
            return ({...state, checkedNocs: action.payload})

        case 'set-sort-option':
            return ({...state, sortOption: action.payload})

        case 'reset': 
            return ({...state, ...defaultFilterState, isReset: !state.isReset})
    }
}