import React, {FunctionComponent, createContext, useReducer, useContext} from 'react'
import {FilterOptionModel, FilterType, FilterTypeModel} from '../client/dataTypes'
import { defaultFilterState, reducer } from './filterReducer'


export interface FilterState {
    filterOption? : FilterOptionModel
}

export interface FilterContextProps extends FilterState {
    setFilterOption: (option: FilterTypeModel, type: FilterType) => void,
    resetOptions: () => void
}

const FilterContext = createContext<FilterContextProps>({
    filterOption: undefined,
    setFilterOption: () => {},
    resetOptions: () => {}
})

FilterContext.displayName = 'FilterContext'


const FilterContextProvider: FunctionComponent = ({children}) => {
    const [{filterOption}, dispatch] = useReducer(reducer, defaultFilterState)

    async function setFilterOption(option: FilterTypeModel, type: FilterType) {
        try {
            await updateFilterOption(option, type)
        } catch (error) {
            console.log(error)
        }
    }

    async function resetOptions() {
        dispatch({type: 'reset'})
    }

    async function updateFilterOption(option: FilterTypeModel, type: FilterType) {
        switch(type) {
            case FilterType.region:
                dispatch({ type: 'set-region-option', payload: option})
                break
            case FilterType.education:
                dispatch({ type: 'set-education-option', payload: option})
                break
            case FilterType.occupational_interest:
                dispatch({ type: 'set-occupational-interest-option', payload: option})
                break
            case FilterType.industry:
                dispatch({ type: 'set-industry-option', payload: option})
                break
            case FilterType.occupational_group:
                dispatch({ type: 'set-occupational-group-option', payload: option})
                break
            case FilterType.part_time_option: 
                dispatch({type: 'set-part-time-option', payload: option})
                break
            case FilterType.annual_salary: 
                dispatch({type: 'set-annual-salary-option', payload: option})
                break
        }
    }

    return (
        <FilterContext.Provider 
            value = {{ filterOption, setFilterOption, resetOptions }}> 
            {children}
        </FilterContext.Provider>
    )
}

const useFilterContext = () => {
    const context = useContext(FilterContext)
     if (!context) throw new Error('useFilterContext must be used within FilterContextProvider')
     return context
}

export {useFilterContext, FilterContextProvider}
