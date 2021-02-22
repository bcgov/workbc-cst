import React, {FunctionComponent, createContext, useReducer, useContext} from 'react'
import {FilterOptionModel, OccupationModel} from '../client/dataTypes'
import { defaultFilterState, reducer, defaultFilterOption } from './filterReducer'

export interface FilterState {
    filterOption? : FilterOptionModel
    filteredOccupationsList? : OccupationModel[] 
    selectedNoc : string,
    view: string,
    isReset: boolean,
    checkedNocs: string[],
    sortOption: string, 
}
export interface FilterContextProps extends FilterState {
    setFilterOption: (filterOptions: FilterOptionModel) => void,
    resetOptions: () => void
    setFilteredOccupationsList: (occupationsList: OccupationModel[]) => void,
    setSelectedNoc: (nocId: string) => void,
    setView: (value: string) => void,
    setCheckedNocs: (value: string[]) => void,
    setSortOption: (value: string) => void
}

const FilterContext = createContext<FilterContextProps>({
    filterOption: defaultFilterOption,
    filteredOccupationsList: [],
    selectedNoc: "",
    view: 'results',
    isReset: true,
    checkedNocs: [],
    sortOption: 'High to Low',
    setFilterOption: () => {},
    resetOptions: () => {},
    setFilteredOccupationsList: () => {},
    setSelectedNoc: () => {},
    setView: () => {},
    setCheckedNocs: () =>{},
    setSortOption: () => {}
})

FilterContext.displayName = 'FilterContext'

const FilterContextProvider: FunctionComponent = ({children}) => {
    const [{filterOption, filteredOccupationsList, selectedNoc, view, isReset, checkedNocs, sortOption}, dispatch] = useReducer(reducer, defaultFilterState)

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
                isReset,
                checkedNocs,
                sortOption,
                setSelectedNoc,
                setFilterOption, 
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
