import React, { useEffect, FunctionComponent } from 'react';
import Helmet from 'react-helmet';
import { navigate } from "gatsby";
import {useFilterContext} from '../state/filterContext'

const NotFoundPage: FunctionComponent = () => {
    const {filterOption, setFilterOption, setSelectedNoc, setRedirect} = useFilterContext()

    useEffect(() => {
      let initialValue = typeof window !== 'undefined' ? window.location.href : ''
      navigate("/"); // redirecting to home page
      _setContext(decodeURIComponent(initialValue))
    }, []);

    useEffect(() => {
    }, [filterOption])

    function _setContext(value: string) {
      console.log(`url data : ${value}`)
      const stateData = value?.split('?')[1]?.split('#')
      const stateObj = _getStateObject(stateData)
      const filterOptions = _getFilterOptions(stateObj)
      const selectedNoc = stateObj['selectedNoc']
      setFilterOption(filterOptions)
      setSelectedNoc(selectedNoc)
      setRedirect(true)
      return {filterOptions: filterOptions, selectedNoc: selectedNoc}
    }

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

    return (    
      <div className="notFoundPage">
          <Helmet title={'404: Not found'}></Helmet>
          <h1>NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          <a href="/">Head home</a>
      </div> 
    )}

export default NotFoundPage;
