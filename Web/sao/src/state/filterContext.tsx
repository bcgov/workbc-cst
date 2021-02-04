import React, {FunctionComponent, createContext, useReducer, useContext} from 'react'
import {FilterOptionModel, OccupationModel} from '../client/dataTypes'
import { defaultFilterState, reducer } from './filterReducer'

export interface FilterState {
    filterOption? : FilterOptionModel
    filteredOccupationsList? : OccupationModel[] 
    selectedNoc : string
}
export interface FilterContextProps extends FilterState {
    setFilterOption: (filterOptions: FilterOptionModel) => void,
    resetOptions: () => void
    setFilteredOccupationsList: (occupationsList: OccupationModel[]) => void,
    setSelectedNoc: (nocId: string) => void
}

const FilterContext = createContext<FilterContextProps>({
    filterOption: undefined,
    filteredOccupationsList: [],
    selectedNoc: "",
    setFilterOption: () => {},
    resetOptions: () => {},
    setFilteredOccupationsList: () => {},
    setSelectedNoc: () => {}
})

FilterContext.displayName = 'FilterContext'

const FilterContextProvider: FunctionComponent = ({children}) => {
    const [{filterOption, filteredOccupationsList, selectedNoc}, dispatch] = useReducer(reducer, defaultFilterState)

    async function setFilterOption(filterOptions: FilterOptionModel) {
        try {
            dispatch({ type: 'set-filter-options', payload: filterOptions})
        } catch (error) {
            console.log(error)
        }
    }

    async function setFilteredOccupationsList(occupationList: OccupationModel[] | undefined) {
        try {
            dispatch({ type: 'set-filtered-occupation-list', payload: occupationList})
        } catch (error) {
            console.log(error)
        }
    }

     async function setSelectedNoc(nocId: string) {
         try {
            dispatch({ type: 'set-selected-noc', payload: nocId})
         } catch(error) {
             console.log(error)
         }
     }

    async function resetOptions() {
        dispatch({type: 'reset'})
    }

    // async function updateFilterOption(option: FilterTypeModel, type: FilterType) {    
    //     switch(type) {
    //         case FilterType.region:
    //             dispatch({ type: 'set-region-option', payload: option})
    //             break
    //         case FilterType.education:
    //             dispatch({ type: 'set-education-option', payload: option})
    //             break
    //         case FilterType.occupational_interest:
    //             dispatch({ type: 'set-occupational-interest-option', payload: option})
    //             break
    //         case FilterType.industry:
    //             dispatch({ type: 'set-industry-option', payload: option})
    //             break
    //         case FilterType.occupational_group:
    //             dispatch({ type: 'set-occupational-group-option', payload: option})
    //             break
    //         case FilterType.part_time_option: 
    //             dispatch({type: 'set-part-time-option', payload: option})
    //             break
    //         case FilterType.annual_salary: 
    //             dispatch({type: 'set-annual-salary-option', payload: option})
    //             break
    //     }
    // }

    return (
        <FilterContext.Provider 
            value = {{ 
                filterOption,
                filteredOccupationsList, 
                selectedNoc,
                setSelectedNoc,
                setFilterOption, 
                resetOptions, 
                setFilteredOccupationsList }}> 
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
