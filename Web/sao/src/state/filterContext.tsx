import React, {FunctionComponent, createContext, useReducer, useContext} from 'react'
import {FilterOptionModel, OccupationModel} from '../client/dataTypes'
import { defaultFilterState, reducer, defaultFilterOption } from './filterReducer'

export interface FilterState {
    filterOption? : FilterOptionModel
    filteredOccupationsList? : OccupationModel[] 
    selectedNoc : string,
    showCompareView: boolean,
    isReset: boolean
}
export interface FilterContextProps extends FilterState {
    setFilterOption: (filterOptions: FilterOptionModel) => void,
    resetOptions: () => void
    setFilteredOccupationsList: (occupationsList: OccupationModel[]) => void,
    setSelectedNoc: (nocId: string) => void,
    setShowCompareView: (value: boolean) => void
}

const FilterContext = createContext<FilterContextProps>({
    filterOption: defaultFilterOption,
    filteredOccupationsList: [],
    selectedNoc: "",
    showCompareView: false,
    isReset: true,
    setFilterOption: () => {},
    resetOptions: () => {},
    setFilteredOccupationsList: () => {},
    setSelectedNoc: () => {},
    setShowCompareView: () => {}
})

FilterContext.displayName = 'FilterContext'

const FilterContextProvider: FunctionComponent = ({children}) => {
    const [{filterOption, filteredOccupationsList, selectedNoc, showCompareView, isReset}, dispatch] = useReducer(reducer, defaultFilterState)

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

     async function setShowCompareView(value: boolean) {
         try {
            dispatch({ type: 'set-show-compare-view', payload: value})
         } catch (error) {
             console.log(error)
         }
     }

    async function resetOptions() {
        dispatch({type: 'reset'})
    }

    return (
        <FilterContext.Provider 
            value = {{ 
                filterOption,
                filteredOccupationsList, 
                selectedNoc,
                showCompareView,
                isReset,
                setSelectedNoc,
                setFilterOption, 
                resetOptions, 
                setShowCompareView,
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
