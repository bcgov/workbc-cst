import React, {FunctionComponent, createContext, useReducer, useContext} from 'react'
import {FilterOptionModel, OccupationModel} from '../client/dataTypes'
import { defaultFilterState, reducer, defaultFilterOption } from './filterReducer'

export interface FilterState {
    filterOption? : FilterOptionModel
    filteredOccupationsList? : OccupationModel[] 
    selectedNoc : string,
    view: string,
    isFilterApplied: boolean,
    isReset: boolean,
    checkedNocs: string[],
    isSorted: boolean,
    sortOption: string, 
}
export interface FilterContextProps extends FilterState {
    setFilterOption: (filterOptions: FilterOptionModel) => void,
    setFilteredOccupationsList: (occupationsList: OccupationModel[]) => void,
    setSelectedNoc: (nocId: string) => void,
    setView: (value: string) => void,
    filterApplied: () => void,
    resetOptions: () => void,
    setCheckedNocs: (value: string[]) => void,
    setSortOption: (value: string) => void
}

const FilterContext = createContext<FilterContextProps>({
    filterOption: defaultFilterOption,
    filteredOccupationsList: [],
    selectedNoc: undefined,
    view: 'results',
    isFilterApplied: true,
    isReset: true,
    checkedNocs: [],
    isSorted: false,
    sortOption: 'High to Low',
    setFilterOption: () => {},
    filterApplied: () => {},
    resetOptions: () => {},
    setFilteredOccupationsList: () => {},
    setSelectedNoc: () => {},
    setView: () => {},
    setCheckedNocs: () =>{},
    setSortOption: () => {}
})

FilterContext.displayName = 'FilterContext'

const FilterContextProvider: FunctionComponent = ({children}) => {
    const [{filterOption, filteredOccupationsList, selectedNoc, view, isFilterApplied, isReset, checkedNocs, isSorted, sortOption}, dispatch] = useReducer(reducer, defaultFilterState)

    async function setFilterOption(filterOptions: FilterOptionModel) {
        try {
            dispatch({ type: 'set-filter-options', payload: filterOptions})
        } catch (error) {
            console.log(error)
        }
    }

    async function setFilteredOccupationsList(occupationList: OccupationModel[]) {
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

     async function setView(value: string) {
         try {
            dispatch({ type: 'set-view', payload: value})
         } catch (error) {
             console.log(error)
         }
     }

    async function setSortOption(value: string) {
        try {
            dispatch({type: 'set-sort-option', payload: value})
        } catch (error) {
            console.log(error)
        }
    }

    async function filterApplied() {
        dispatch({type: 'apply-filter'})
    }

    async function resetOptions() {
        dispatch({type: 'reset'})
    }

    async function setCheckedNocs(value: string[]) {
        try {
            dispatch({type: 'set-checked-nocs', payload: value})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FilterContext.Provider 
            value = {{ 
                filterOption,
                filteredOccupationsList, 
                selectedNoc,
                view,
                isFilterApplied,
                isReset,
                checkedNocs,
                isSorted,
                sortOption,
                setSelectedNoc,
                setFilterOption,
                filterApplied, 
                resetOptions, 
                setView,
                setFilteredOccupationsList, 
                setSortOption,
                setCheckedNocs }}> 
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
