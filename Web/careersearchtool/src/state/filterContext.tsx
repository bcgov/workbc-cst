import React, {FunctionComponent, createContext, useReducer, useContext, useState} from 'react'
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
    showCareerPreview: boolean,
    windowScroll: number
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
    setShowCareerPreview: (value: boolean) => void,
    setWindowScroll: (value: number) => void,
    setReset: (value: boolean) => void
}

const FilterContext = createContext<FilterContextProps>({
    filterOption: defaultFilterOption,
    filteredOccupationsList: [],
    scrollPosition: 0,
    listSize: 0,
    selectedNoc: undefined,
    view: 'results',
    isFilterApplied: false,
    isReset: true,
    checkedNocs: [],
    isSorted: false,
    returnToResults: false,
    sortOption: 'High to Low',
    isFetchingOccupationList: true,
    showCareerPreview: false,
    windowScroll: 0,
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
    setShowCareerPreview: () => {},
    setWindowScroll: () => {},
    setReset: () =>{}
})

FilterContext.displayName = 'FilterContext'

const FilterContextProvider: FunctionComponent = ({children}) => {
    const [{filteredOccupationsList}, dispatch] = useReducer(reducer, defaultFilterState)

    const [view, _setView] = useState('results')
    const [isReset, _setReset] = useState(true)
    const [isSorted, _setIsSorted] = useState(true)
    const [isFilterApplied, _setIsFilterApplied] = useState(false)
    const [showCareerPreview, _setShowCareerPreview] = useState(false)
    const [returnToResults, _setReturnToResults] = useState(false)
    const [isFetchingOccupationList, _setIsFetchingOccupationList] = useState(false)
    const [windowScroll, _SetWindowScroll] = useState(0) //window scroll
    const [scrollPosition, _setScrollPosition] = useState(0) //table scroll
    const [sortOption, _setSortOption] = useState('High to Low')
    const [selectedNoc, _setSelectedNoc] = useState<string>(undefined)
    const [checkedNocs, _setCheckedNocs] = useState([])
    const [listSize, _setListSize] = useState(0)
    const [filterOption, _setFilterOption] = useState<FilterOptionModel>(defaultFilterOption)

    async function setFilteredOccupationsList(occupationList: OccupationModel[]) {
        try {
            occupationList = sortOption === 'High to Low'? occupationList.sort((a: OccupationModel, b: OccupationModel ) => {return a.jobOpenings > b.jobOpenings ? -1 : 1 }):
            sortOption === 'Low to High'? occupationList.sort((a: OccupationModel, b: OccupationModel ) => {return a.jobOpenings < b.jobOpenings ? -1 : 1 }):
            sortOption === 'A-Z'? occupationList.sort((a: OccupationModel, b: OccupationModel ) => {return a.title < b.title ? -1 : 1 }): 
            sortOption === 'Z-A'? occupationList.sort((a: OccupationModel, b: OccupationModel ) => {return a.title > b.title ? -1 : 1 }): occupationList  
            /* selectedNoc will be updated to first item is 'High to Low' sorted list of filtered Occupational List on intial load 
             and on every 'apply' action and selcted Noc will be retained on sorting */
             //_setSelectedNoc(!!isFilterApplied || !!isReset? occupationList[0]?.noc : (!!selectedNoc? selectedNoc : occupationList[0]?.noc))
             _setSelectedNoc(occupationList[0]?.noc)
            
            dispatch({ type: 'set-filtered-occupation-list', payload: occupationList})
        } catch (error) {
            console.log(error)
        }
    }

    function setFilterOption(_filterOption: FilterOptionModel) {
        _setReset(false)
        _setFilterOption({...filterOption, ..._filterOption})
    }

    function setFetchingOccupationList(value: boolean) {
        _setIsFetchingOccupationList(value)
    }

    function setListSize(size: number) {
       _setListSize(size)
    }

    function setSelectedNoc(nocId: string) {
            _setIsFilterApplied(false)
            _setSelectedNoc(nocId)
     }

     function setView(value: string) {
        _setView(value)
     }

    function setSortOption(value: string) {
        _setIsFilterApplied(false)
        _setSortOption(value)
        _setIsSorted(true)
    }

    function setReset(value: boolean) {
        _setReset(value)
    }

    function filterApplied() {
        _setReset(false)
        _setSortOption('High to Low')
        _setSelectedNoc(undefined)
        _setCheckedNocs([])
        _setIsFilterApplied(true)
    }

    function resetOptions() {
        _setFilterOption(defaultFilterOption)
        _setReset(true)
        _setIsFilterApplied(false)
        _setSortOption('High to Low')
        _setIsSorted(true)
        _setListSize(0)
        _setCheckedNocs([])
        _setSelectedNoc(undefined)
        _setScrollPosition(0)
        _SetWindowScroll(0)
        _setIsFetchingOccupationList(true)
    }

    function setCheckedNocs(value: string[]) {
        _setReset(false)
        _setCheckedNocs(value)
    }

    function setReturnToResults(value: boolean) {
        _setReset(false)
        _setReturnToResults(value)
    }

    function setScrollPosition(value: number) {
        _setScrollPosition(value)
    }

    function setShowCareerPreview(value: boolean) {
        _setShowCareerPreview(value)
    }

    function setWindowScroll(value: number) {
        _SetWindowScroll(value)
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
                windowScroll,
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
                setShowCareerPreview,
                setWindowScroll,
                setReset}}> 
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
