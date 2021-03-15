import {URLObject} from '../client/dataTypes'

function _getStateObject(StateData: string[]): object {
  let stateObj = {}
  StateData?.forEach(state => {
    let tempObj = {}
    tempObj[state.split('=')[0]] = state.split('=')[1]
    stateObj = {...stateObj, ...tempObj}
  })
  return stateObj
}

function _getFilterOptions(filterObj : object): object {
  let filterOptions = {}

  filterOptions['region'] = filterObj['region'] ?
                              {id: parseInt(filterObj['region'].split(':')[0]), value: filterObj['region'].split(':')[1]} :
                              {id: 1, value: 'British Columbia'}

  filterOptions['education'] = filterObj['education'] ? 
                                {id: parseInt(filterObj['education'].split(':')[0]), value: filterObj['education'].split(':')[1]} :
                                {id: -1, value: 'All'}

  filterOptions['occupational_interest'] = filterObj['occupational_interest'] ? 
                                            {id: parseInt(filterObj['occupational_interest'].split(':')[0]), value: filterObj['occupational_interest'].split(':')[1]} :
                                            {id: -1, value: 'All'}

  filterOptions['industry'] = filterObj['industry'] ? 
                                {id: filterObj['industry'].split(':')[0], value: filterObj['industry'].split(':')[1]} :
                                {id: '-1', value: 'All'}

  filterOptions['occupational_group'] = filterObj['occupational_group'] ?
                                          {id: parseInt(filterObj['occupational_group'].split(':')[0]), value: filterObj['occupational_group'].split(':')[1]} :
                                          {id: -1, value: 'All'}

  filterOptions['part_time_option'] = filterObj['part_time_option'] ? 
                                        {id: parseInt(filterObj['part_time_option'].split(':')[0]), value: filterObj['part_time_option'].split(':')[1]} :
                                        {id: -1, value: 'All'}

  filterOptions['annual_salary'] = filterObj['annual_salary'] ? 
                                        {id: parseInt(filterObj['annual_salary'].split(':')[0]), value: filterObj['annual_salary'].split(':')[1]} :
                                        {id: -1, value: 'All'}

  filterOptions['keyword'] = filterObj['keyword'] ? filterObj['keyword'] : ''
  
  return filterOptions
}

function _setResultsContext(value: string) {
    const stateData = value?.split('&')
    const stateObj = _getStateObject(stateData)
    const filterOptions = _getFilterOptions(stateObj)
    const selectedNoc = stateObj['selectedNoc']
    return {filterOptions: filterOptions, selectedNoc: selectedNoc}
}

function _setPreviewContext(value: string) {
  return  {selectedNoc: value}
}

function _setCompareContext(value: string) {
  return  {nocs: value.split(',')}
}

export function parseURL(queryParams: string, view: string) : URLObject  {
    if (view === 'results') {
      const context = _setResultsContext(queryParams)
      const options = context.filterOptions
      const noc = context.selectedNoc
      return {filterOptions: options, selectedNoc : noc}
    } else if (view === 'careerPreview') {
      const noc = _setPreviewContext(queryParams).selectedNoc
      return {selectedNoc : noc}
    } else {
      const nocs = _setCompareContext(queryParams).nocs
      return {checkedNocs: nocs}
    }
}