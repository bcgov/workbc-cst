import React, { FunctionComponent, Key, useEffect, useState } from 'react'
import { Input, Row, Col, Button, TreeSelect} from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import SelectFilterType from './wbSelectFilterType'
import { FilterType, FilterOptionModel, IndustryData } from '../client/dataTypes'
import { useFilterContext } from '../state/filterContext'
import { useGetIndustryData } from '../client/apiService'
import {modifyIndustryData} from '../client/modifyAPIData'
import { defaultFilterOption } from '../state/filterReducer'
import Results from './results'
import Header from './header'
import Footer from './footer'

const Dropdowns: FunctionComponent = () => {
    const { data: industryData, isValidating, isSettled } = useGetIndustryData(FilterType.industry)
    const [industryDataTree, setIndustryDataTree] = useState<IndustryData[]>()

    const {filterOption, setFilterOption, resetOptions, isReset} = useFilterContext()

    const [userSelection, setUserSelection] = useState<FilterOptionModel>(defaultFilterOption)

    function getIndustryValues() {
        return  userSelection.industry.id
    }

    useEffect(()=> {
        if(!!filterOption) {
            setUserSelection(filterOption)
        }
    }, [filterOption, isReset])

    useEffect(() => {
        if(!isValidating && isSettled && !!industryData && industryData.length > 0) {
            setIndustryDataTree(modifyIndustryData(industryData))
        }
    }, [industryData, isValidating, isSettled])

    function handleChangeRegion(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setUserSelection({...userSelection, region: {id: value as number, value: options.value}})
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeEducation(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setUserSelection({...userSelection, education: {id: value as number, value: options.value}})
            } 
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeOccupationalInterest(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setUserSelection({...userSelection, occupational_interest: {id: value as number, value: options.value}})
            } 
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeIndustry(key, title) {
        let industries = []
        if(!!key && !!title ){
            setUserSelection({...userSelection, industry:{id: key, value: title}})
        } else {
            setUserSelection({...userSelection, industry: {id: 'All', value: 'All'}})
        }
    }

    function handleChangeOccupationalGroup(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setUserSelection({...userSelection, occupational_group: {id: value as number, value: options.value}})
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangePartTimeOption(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setUserSelection({...userSelection, part_time_option: {id: value as number, value: options.value}})
            } 
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeAnnualSalary(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setUserSelection({...userSelection, annual_salary: {id: value as number, value: options.value}})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeKeyWord = (event: any) => {
        setUserSelection({...userSelection, keyword: event.target.value})
    }

    function handleReset() {
        try {
            resetOptions()
        } catch (error) {
            console.log(error)
        }
    }

    function applyFilters() {
        setFilterOption(userSelection)
    }

    return (
        <div>
            <Header />
            <div className="sao-filters-header">
                <div className="container">
                    <Row><Col span={24}>
                        <div className="sao-filters-header__content">Find a career that's right for you</div>
                    </Col></Row>
                </div>
            </div>
            <div className="sao-filters">
                <div className="container">
                    <Row><Col span={24}>
                        
                        <h3>Use the filter(s) to explore your career options.</h3>    
                    </Col></Row>
                    <Row className="sao-filters__row">
                        <Col xs={24} lg={6}>
                            <div className="sao-filters__type">
                                <label className="sao-filters__label">Region ?</label>
                                <SelectFilterType  
                                    filterType={FilterType.region}
                                    showArrow={true}
                                    style={{ width: '100%' }}
                                    value = {userSelection?.region?.value}
                                    onChange = {handleChangeRegion}
                                    showPlaceHolderAsOption={false}
                                    placeholder={"British Columbia"}  />
                            </div>
                        </Col>
                        <Col xs={24} lg={4}> 
                            <div className="sao-filters__type">
                                <label className="sao-filters__label">Education ? </label>
                                <SelectFilterType  
                                    filterType={FilterType.education}
                                    showArrow={true}
                                    style={{ width: '100%' }}
                                    value = {userSelection?.education?.value}
                                    onChange = {handleChangeEducation}
                                    showPlaceHolderAsOption={true}
                                    placeholder={"All"} />
                            </div>
                        </Col>
                        <Col xs={24} lg={6}> 
                            <div className="sao-filters__type">
                                <label className="sao-filters__label">Occupational Interest ?</label>
                                <SelectFilterType  
                                    filterType={FilterType.occupational_interest}
                                    showArrow={true}
                                    style={{ width: '100%' }}
                                    value = {userSelection?.occupational_interest?.value}
                                    onChange = {handleChangeOccupationalInterest}
                                    showPlaceHolderAsOption={true}
                                    placeholder={"All"} />
                            </div>
                        </Col>
                        <Col xs={24} lg={8}>
                            <div className="sao-filters__type">
                                <label className="sao-filters__label"> Industry ? </label>
                                    <TreeSelect allowClear
                                        placeholder="All"
                                        showArrow={true}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        treeData={industryDataTree}
                                        onChange={handleChangeIndustry}
                                        value={getIndustryValues()}
                                        style={{width: '100%'}} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="sao-filters__row">
                        <Col xs={24} lg={6}>
                            <div className="sao-filters__type">
                                <label className="sao-filters__label"> Occupational Group ? </label>
                                <SelectFilterType  
                                    filterType={FilterType.occupational_group}
                                    showArrow={true}
                                    style={{ width: '100%' }}
                                    value = {userSelection?.occupational_group?.value}
                                    onChange = {handleChangeOccupationalGroup}
                                    showPlaceHolderAsOption={true}
                                    placeholder={"All"} />
                            </div>
                        </Col>
                        <Col xs={24} lg={4}> 
                            <div className="sao-filters__type">
                                <label className="sao-filters__label">Job Type ? </label>
                                <SelectFilterType  
                                    filterType={FilterType.part_time_option}
                                    style={{ width: '100%' }}
                                    showArrow={true}
                                    value = {userSelection?.part_time_option?.value}
                                    onChange = {handleChangePartTimeOption}
                                    showPlaceHolderAsOption={true}
                                    placeholder={"All"} />
                            </div>
                        </Col>
                        <Col xs={24} lg={6}> 
                            <div className="sao-filters__type">
                                <label className="sao-filters__label">Annual Salary ? </label>
                                <SelectFilterType  
                                    filterType={FilterType.annual_salary}
                                    style={{ width: '100%' }}
                                    showArrow={true}
                                    value = {userSelection?.annual_salary?.value}
                                    onChange = {handleChangeAnnualSalary}
                                    showPlaceHolderAsOption={true}
                                    placeholder={"All"} />
                            </div>
                        </Col>
                        <Col xs={24} lg={8}>
                            <div className="sao-filters__type">
                                <label className="sao-filters__label"> Keyword ? </label>
                                <Input placeholder="Enter career title, Keyword(s) or NOC"
                                    value= {userSelection?.keyword}
                                    style={{ width: '100%' }}
                                    onChange={handleChangeKeyWord} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={16}> 
                            <Button type="primary" style={{width: "250px"}} onClick = {applyFilters}> Apply Filters </Button>
                            <Button style={{border: "none"}} onClick = {handleReset}> 
                                <div>
                                    <SyncOutlined /> 
                                    Reset
                                </div>
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <div>
                <Results />
            </div>
            <Footer />
        </div>
    );
}

export default Dropdowns