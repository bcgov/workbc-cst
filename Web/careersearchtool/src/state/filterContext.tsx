import React, {FunctionComponent, createContext, useReducer, useContext} from 'react'
import {FilterOptionModel, OccupationModel} from '../client/dataTypes'
import { defaultFilterState, reducer, defaultFilterOption } from './filterReducer'

export interface FilterState {
    filterOption? : FilterOptionModel
    filteredOccupationsList? : OccupationModel[],
    listSize: number, 
    scrollPosition: number,
    selectedNoc : string,
    view: string,
    isFilterApplied: boolean,
    isReset: boolean,
    checkedNocs: string[],
    isSorted: boolean,
    sortOption: string,
    returnToResults: boolean,
    isFetchingOccupationList: boolean,
    showCareerPreview: boolean
}
export interface FilterContextProps extends FilterState {
    setFilterOption: (filterOptions: FilterOptionModel) => void,
    setFilteredOccupationsList: (occupationsList: OccupationModel[]) => void,
    setScrollPosition: (yValue: number) => void
    setListSize: (value: number) => void,
    setSelectedNoc: (nocId: string) => void,
    setView: (value: string) => void,
    filterApplied: () => void,
    resetOptions: () => void,
    setCheckedNocs: (value: string[]) => void,
    setSortOption: (value: string) => void,
    setReturnToResults: (value: boolean) => void,
    setFetchingOccupationList: (value: boolean) => void,
    setShowCareerPreview: (value: boolean) => void
}

const FilterContext = createContext<FilterContextProps>({
    filterOption: defaultFilterOption,
    filteredOccupationsList: [],
    scrollPosition: 0,
    listSize: 0,
    selectedNoc: undefined,
    view: 'results',
    isFilterApplied: true,
    isReset: true,
    checkedNocs: [],
    isSorted: false,
    returnToResults: false,
    sortOption: 'High to Low',
    isFetchingOccupationList: true,
    showCareerPreview: false,
    setFilterOption: () => {},
    filterApplied: () => {},
    resetOptions: () => {},
    setFilteredOccupationsList: () => {},
    setScrollPosition: () => {},
    setListSize: () => {},
    setSelectedNoc: () => {},
    setView: () => {},
    setCheckedNocs: () =>{},
    setSortOption: () => {},
    setReturnToResults: () => {},
    setFetchingOccupationList: () => {},
    setShowCareerPreview: () => {}
})

FilterContext.displayName = 'FilterContext'

const FilterContextProvider: FunctionComponent = ({children}) => {
    const [{filterOption, filteredOccupationsList, scrollPosition, listSize, selectedNoc, view, isFilterApplied, isReset, checkedNocs, 
        isSorted, sortOption, returnToResults, isFetchingOccupationList: isFetchingOccupationList, showCareerPreview}, dispatch] = useReducer(reducer, defaultFilterState)

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

    async function setListSize(size: number) {
        try {
            dispatch({type: 'set-list-size', payload: size})
        } catch(error) {
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

    async function setReturnToResults(value: boolean) {
        try {
            dispatch({type: 'set-return-to-results', payload: value})
        } catch (error) {
            console.log(error)
        }
    }

    async function setFetchingOccupationList(value: boolean) {
        try {
            dispatch({type: 'set-is-fetching-results', payload: value})
        } catch (error) {
            console.log(error)
        }
    }

    async function setScrollPosition(value: number) {
        try {
            dispatch({type: 'set-scroll-position', payload: value})
        } catch (error) {
            console.log(error)
        }
    }

    async function setShowCareerPreview(value: boolean) {
        try {
            dispatch({type: 'set-show-career-preview', payload: value})
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <FilterContext.Provider 
            value = {{ 
                filterOption,
                filteredOccupationsList, 
                scrollPosition,
                listSize,
                selectedNoc,
                view,
                isFilterApplied,
                isReset,
                checkedNocs,
                isSorted,
                sortOption,
                returnToResults,
                isFetchingOccupationList: isFetchingOccupationList,
                showCareerPreview,
                setSelectedNoc,
                setFilterOption,
                filterApplied, 
                resetOptions, 
                setView,
                setFilteredOccupationsList,
                setScrollPosition,
                setListSize,
                setSortOption,
                setCheckedNocs, 
                setReturnToResults, 
                setFetchingOccupationList,
                setShowCareerPreview}}> 
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
