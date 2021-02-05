import { FilterOptionModel, OccupationModel } from "../client/dataTypes";

export const defaultFilterOption = {
    region: {id: 1, value: 'British Columbia'}, 
    education: {id: -1, value: 'All'}, 
    occupational_interest: {id: -1, value: 'All'}, 
    industry: {id: -1, value: 'All'}, 
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
    selectedNoc: string
}

export const defaultFilterState: FilterState = Object.freeze({
    filterOption: defaultFilterOption,
    filteredOccupationsList: [],
    selectedNoc: 'default'
})

export type FilterAction = 
{type: 'set-filtered-occupation-list', payload: OccupationModel[] | undefined } |
{type: 'set-selected-noc', payload: string} |
{type: 'set-filter-options', payload: FilterOptionModel} |
{type: 'reset'}

export function reducer(state: FilterState = defaultFilterState , action: FilterAction): FilterState {
    switch(action.type) {        
        case 'set-filtered-occupation-list': 
            return ({...state, filteredOccupationsList: action.payload})
        
        case 'set-selected-noc':
            return ({...state, selectedNoc: action.payload})

        case 'set-filter-options': 
            console.log('final state: ', JSON.stringify({...state, filterOption: {...state.filterOption, ...action.payload}}))
            return ({...state, filterOption: {...state.filterOption, ...action.payload}})

        case 'reset': 
            return defaultFilterState
    }
}