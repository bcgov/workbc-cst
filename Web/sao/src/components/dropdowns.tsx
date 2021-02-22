import React, { FunctionComponent, Key, useEffect, useState } from 'react'
import { Input, Row, Col, Button, TreeSelect, Popover} from 'antd'
import { SyncOutlined, QuestionCircleFilled, CheckCircleFilled } from '@ant-design/icons'
import SelectFilterType from './wbSelectFilterType'
import { FilterType, FilterOptionModel, IndustryData } from '../client/dataTypes'
import { useFilterContext } from '../state/filterContext'
import { useGetIndustryData } from '../client/apiService'
import {modifyIndustryData, filtersPopOverVisible} from '../client/filtersData'
import { defaultFilterOption } from '../state/filterReducer'
import Results from './results'
import Header from './header'
import Footer from './footer'

const Dropdowns: FunctionComponent = () => {
    const { data: industryData, isValidating, isSettled } = useGetIndustryData(FilterType.industry)
    const [industryDataTree, setIndustryDataTree] = useState<IndustryData[]>()

    const {filterOption, setFilterOption, resetOptions, setCheckedNocs, isReset} = useFilterContext()

    const [userSelection, setUserSelection] = useState<FilterOptionModel>(defaultFilterOption)

    const [popOvervisible, setPopOverVisible] = useState(filtersPopOverVisible)

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

    function getHoverContent(filtername: string) {
        switch (filtername)  {
            case 'Region': 
                return (<div> Careers based on 10-year job openings (2019-2029) within a region </div>)
            case 'Education': 
                return (<div> Careers based on educational requirements that you have or want to achieve </div>)
            case 'OccupationalInterest':
                return (<div> 
                    <p>Groups careers based on 6 broad personality types. You can take a quiz to find your interests.</p>
                    <p>Learn more on <a href="https://www.workbc.ca/" target="_blank">WorkBC.ca.</a></p>
                </div>)
            case 'Industry':
                return (<div>
                    <p>Careers based on an association to an industry</p>
                    <p>Learn more on <a href="https://www.workbc.ca/" target="_blank">WorkBC.ca.</a></p>
                </div>)
            case 'OccupationalCategory': 
                return (<div>
                    <p> Quick links to selected groupings of careers </p>
                    <p> High oppurtunity occupations are those expected to have higher demand within B.C.</p>
                </div>)
            case 'JobType':
                return (<div> Careers with a high or low share of part-time workers</div>)
            case 'Keywords':
                return (<div> The <b>National Occupational Classifications System (NOC) </b> classifies all occupations in Canada</div>)
        }
    }

    function getPopOver(filtername: string) {
        const Content = (
            <div>
                <CheckCircleFilled />
                {getHoverContent(filtername)}
                <Button type="link" onClick={handleHide}> Close </Button>
            </div>
        )
        return Content
    }

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
        setCheckedNocs([])
    }

    function handlepopOverVisibilityChange (filterType: string, visible: boolean) {
        switch(filterType) {
            case 'region':
                setPopOverVisible({...popOvervisible, 'region': visible})
                break
            case 'education':
                setPopOverVisible({...popOvervisible, 'education': visible})
                break
            case 'occupationalInterest':
                setPopOverVisible({...popOvervisible, 'occupationalInterest': visible})
                break
            case 'industry':
                setPopOverVisible({...popOvervisible, 'industry': visible})
                break
            case 'occupationalCategory':
                setPopOverVisible({...popOvervisible, 'occupationalCategory': visible})
                break
            case 'jobType':
                setPopOverVisible({...popOvervisible, 'jobType': visible})
                break
            case 'keywords':
                setPopOverVisible({...popOvervisible, 'keywords': visible})
                break
        }
    }

    function handleHide() {
        setPopOverVisible(filtersPopOverVisible )
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
                                <label className="sao-filters__label">Region 
                                    <Popover placement="top" className="sao-filters__popover" content={getPopOver('Region')} trigger="click" visible={popOvervisible.region}
                                    onVisibleChange={(visible)=> handlepopOverVisibilityChange('region', visible)}>  <QuestionCircleFilled /> </Popover>                                   
                                </label>
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
                                <label className="sao-filters__label">Education 
                                    <Popover placement="top" className="sao-filters__popover" content={getPopOver('Education')} trigger="click" visible={popOvervisible.education}
                                    onVisibleChange={(visible)=> handlepopOverVisibilityChange('education', visible)}>  <QuestionCircleFilled /> </Popover>
                                </label>
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
                                <label className="sao-filters__label"> Occupational Interest 
                                    <Popover placement="top" className="sao-filters__popover" content={getPopOver('OccupationalInterest')} trigger="click" visible={popOvervisible.occupationalInterest}
                                    onVisibleChange={(visible)=> handlepopOverVisibilityChange('occupationalInterest', visible)}>  <QuestionCircleFilled /> </Popover>
                                </label>
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
                                <label className="sao-filters__label"> Industry 
                                    <Popover placement="top" className="sao-filters__popover" content={getPopOver('Industry')} trigger="click" visible={popOvervisible.industry}
                                    onVisibleChange={(visible)=> handlepopOverVisibilityChange('industry', visible)}>  <QuestionCircleFilled /> </Popover>
                                </label>
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
                                <label className="sao-filters__label"> Occupational Category 
                                    <Popover placement="top" className="sao-filters__popover" content={getPopOver('OccupationalCategory')} trigger="click" visible={popOvervisible.occupationalCategory}
                                     onVisibleChange={(visible)=> handlepopOverVisibilityChange('occupationalCategory', visible)}>  <QuestionCircleFilled /> </Popover> 
                                </label>
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
                                <label className="sao-filters__label">Job Type 
                                    <Popover placement="top" className="sao-filters__popover" content={getPopOver('JobType')} trigger="click" visible={popOvervisible.jobType}
                                    onVisibleChange={(visible)=> handlepopOverVisibilityChange('jobType', visible)}>  <QuestionCircleFilled /> </Popover> 
                                </label>
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
                                <label className="sao-filters__label">Annual Salary </label>
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
                                <label className="sao-filters__label"> Keyword
                                    <Popover placement="top" className="sao-filters__popover" content={getPopOver('Keywords')} trigger="click" visible={popOvervisible.keywords} 
                                    onVisibleChange={(visible)=> handlepopOverVisibilityChange('keywords', visible)}>  <QuestionCircleFilled /> </Popover> 
                                </label>
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