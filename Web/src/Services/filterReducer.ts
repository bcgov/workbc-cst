import { FilterOptionModel, FilterTypeModel } from "../API/dataTypes";

export const defaultFilterOption = {
    region: {id: -1, value: 'British Columbia'}, 
    education: {id: -1, value: 'All'}, 
    occupational_interest: {id: -1, value: 'All'}, 
    industry: {id: -1, value: 'All'}, 
    occupational_group: {id: -1, value: 'All'}, 
    part_time_option: {id: -1, value: 'All'}, 
    annual_salary: {id: -1, value: 'All'}
}

export interface FilterState {
    filterOption?: FilterOptionModel
}

export const defaultFilterState: FilterState = Object.freeze({
    filterOption: defaultFilterOption
})

export type FilterAction = 
{type: 'set-region-option', payload: FilterTypeModel} |
{type: 'set-education-option', payload: FilterTypeModel} |
{type: 'set-occupational-interest-option', payload: FilterTypeModel} |
{type: 'set-industry-option', payload: FilterTypeModel} |
{type: 'set-occupational-group-option', payload: FilterTypeModel} |
{type: 'set-part-time-option', payload: FilterTypeModel}|
{type: 'set-annual-salary-option', payload: FilterTypeModel} |
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
        
        case 'reset': 
            return defaultFilterState
    }
}