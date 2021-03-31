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
    filteredOccupationsList? : OccupationModel[]
}

export const defaultFilterState: FilterState = Object.freeze({
    filteredOccupationsList: []
})

export type FilterAction = 
{type: 'set-filtered-occupation-list', payload: OccupationModel[] | undefined }

export function reducer(state: FilterState = defaultFilterState , action: FilterAction): FilterState {
    switch(action.type) {        
        case 'set-filtered-occupation-list': //sorts table results from high to low job openings and displays preview of career with max openings
            return ({...state, filteredOccupationsList: action.payload})
        
        default: 
            return state
    }
}