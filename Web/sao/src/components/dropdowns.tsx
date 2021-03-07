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

    const {filterOption, returnToResults, isReset, setFilterOption, filterApplied, resetOptions, setSelectedNoc, setCheckedNocs} = useFilterContext()

    const [userSelection, setUserSelection] = useState<FilterOptionModel>(defaultFilterOption)

    const [popOvervisible, setPopOverVisible] = useState(filtersPopOverVisible)

    useEffect(()=> {
        if(!!filterOption) {
            setUserSelection(filterOption)
        }
    }, [filterOption, isReset])

    useEffect(() => {
        if (returnToResults)  document.getElementById('middle').scrollIntoView()
    }, [returnToResults])

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
                    <p>Learn more on <a className="filter-popover-link" href="https://www.workbc.ca/" target="_blank" rel="noreferrer">WorkBC.ca.</a></p>
                </div>)
            case 'Industry':
                return (<div>
                    <p>Careers based on an association to an industry</p>
                    <p>Learn more on <a className="filter-popover-link" href="https://www.workbc.ca/" target="_blank" rel="noreferrer">WorkBC.ca.</a></p>
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
            <div className="filter-popover">
                <Row>
                    <Col span={1}><CheckCircleFilled className="filter-popover__check-icon" /></Col>
                    <Col span={21} offset={1}>{getHoverContent(filtername)}</Col>
                </Row>
                <Row>
                    <Col span={4} offset={16}>
                        <a onClick={() =>handleHide(filtername)} className="filter-popover__close-text"> CLOSE </a>
                    </Col>
                </Row>
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

    const handleSpacebar = (event: any) => {
        if (event.keyCode == 13 || event.keyCode == 32) { // space or enter hit
            applyFilters()
            event.stopPropagation()
            event.preventDefault()
            return
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
        filterApplied()
        setCheckedNocs([])
        setSelectedNoc(undefined)
        document.getElementById('middle').scrollIntoView()
    }

    function handleHide(filtername: string) {
        console.log(filtername)
        switch(filtername) {
            case 'Region':
                setPopOverVisible({ ...popOvervisible, 'region': false })
                break
            case 'Education':
                setPopOverVisible({ ...popOvervisible, 'education': false })
                break
            case 'OccupationalInterest':
                setPopOverVisible({ ...popOvervisible, 'occupationalInterest': false })
                break
            case 'Industry':
                setPopOverVisible({ ...popOvervisible, 'industry': false })
                break
            case 'OccupationalCategory':
                setPopOverVisible({ ...popOvervisible, 'occupationalCategory': false })
                break
            case 'JobType':
                setPopOverVisible({ ...popOvervisible, 'jobType': false })
                break
            case 'Keywords':
                setPopOverVisible({ ...popOvervisible, 'keywords': false })
                break
        }       
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
                    <Row className="sao-filters__help"><Col span={24}>
                        <h3>Use the filter(s) to explore your career options.</h3>    
                    </Col></Row>
                    <Row className="sao-filters__row">
                        <Col xs={24} xl={6}>
                            <div className="sao-filters__type">
                                <label className="sao-filters__label"> Region 
                                    <Popover placement="top" overlayClassName="sao-filters__popover-inner" 
                                            className="sao-filters__popover" 
                                            content={getPopOver('Region')} 
                                            trigger="click" 
                                            visible={popOvervisible.region}>  
                                            <QuestionCircleFilled onClick={() => setPopOverVisible({...popOvervisible, 'region': true})}/> 
                                    </Popover>                                   
                                </label>
                                <SelectFilterType  
                                    filterType={FilterType.region}
                                    showArrow={true}
                                    style={{ width: '100%' }}
                                    className="sao-filters__select"
                                    value = {userSelection?.region?.value}
                                    onChange = {handleChangeRegion}
                                    showPlaceHolderAsOption={false}
                                    placeholder={"British Columbia"} 
                                    tabIndex={1} />
                            </div>
                        </Col>
                        <Col xs={24} xl={4}> 
                            <div className="sao-filters__type">
                                <label className="sao-filters__label">Education 
                                    <Popover placement="top" overlayClassName="sao-filters__popover-inner" 
                                        className="sao-filters__popover" 
                                        content={getPopOver('Education')} 
                                        trigger="click" 
                                        visible={popOvervisible.education}>  
                                        <QuestionCircleFilled onClick={() => setPopOverVisible({...popOvervisible, 'education': true})} />
                                    </Popover>
                                </label>
                                <SelectFilterType  
                                    filterType={FilterType.education}
                                    showArrow={true}
                                    className="sao-filters__select"
                                    style={{ width: '100%' }}
                                    value = {userSelection?.education?.value}
                                    onChange = {handleChangeEducation}
                                    showPlaceHolderAsOption={true}
                                    placeholder={"All"}
                                    tabIndex={2} />
                            </div>
                        </Col>
                        <Col xs={24} xl={6}> 
                            <div className="sao-filters__type">
                                <label className="sao-filters__label"> Occupational Interest 
                                    <Popover placement="top" overlayClassName="sao-filters__popover-inner"
                                        className="sao-filters__popover" 
                                        content={getPopOver('OccupationalInterest')} 
                                        trigger="click" 
                                        visible={popOvervisible.occupationalInterest}> 
                                        <QuestionCircleFilled onClick={() => setPopOverVisible({...popOvervisible, 'occupationalInterest': true})} />
                                    </Popover>
                                </label>
                                <SelectFilterType  
                                    filterType={FilterType.occupational_interest}
                                    showArrow={true}
                                    className="sao-filters__select"
                                    style={{ width: '100%' }}
                                    value = {userSelection?.occupational_interest?.value}
                                    onChange = {handleChangeOccupationalInterest}
                                    showPlaceHolderAsOption={true}
                                    placeholder={"All"}
                                    tabIndex={3} />
                            </div>
                        </Col>
                        <Col xs={24} xl={8}>
                            <div className="sao-filters__type">
                                <label className="sao-filters__label"> Industry 
                                    <Popover placement="top" overlayClassName="sao-filters__popover-inner" 
                                        className="sao-filters__popover" 
                                        content={getPopOver('Industry')} 
                                        trigger="click" 
                                        visible={popOvervisible.industry}>  
                                            <QuestionCircleFilled onClick={() => setPopOverVisible({...popOvervisible, 'industry': true})} />
                                    </Popover>
                                </label>
                                    <TreeSelect
                                        placeholder="All"
                                        showArrow={true}
                                        className="sao-filters__select"
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        treeData={isSettled? industryDataTree: undefined}
                                        onChange={handleChangeIndustry}
                                        value={userSelection?.industry?.id}
                                        style={{width: '100%'}}
                                        tabIndex={4} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="sao-filters__row">
                        <Col xs={24} xl={6}>
                            <div className="sao-filters__type">
                                <label className="sao-filters__label"> Occupational Category 
                                    <Popover placement="top" overlayClassName="sao-filters__popover-inner" 
                                        className="sao-filters__popover" 
                                        content={getPopOver('OccupationalCategory')} 
                                        trigger="click" 
                                        visible={popOvervisible.occupationalCategory}>  
                                            <QuestionCircleFilled onClick={() => setPopOverVisible({...popOvervisible, 'occupationalCategory': true})}/> 
                                        </Popover> 
                                </label>
                                <SelectFilterType  
                                    filterType={FilterType.occupational_group}
                                    showArrow={true}
                                    className="sao-filters__select"
                                    style={{ width: '100%' }}
                                    value = {userSelection?.occupational_group?.value}
                                    onChange = {handleChangeOccupationalGroup}
                                    showPlaceHolderAsOption={true}
                                    placeholder={"All"}
                                    tabIndex={5} />
                            </div>
                        </Col>
                        <Col xs={24} xl={4}> 
                            <div className="sao-filters__type">
                                <label className="sao-filters__label">Job Type 
                                    <Popover placement="top" overlayClassName="sao-filters__popover-inner" 
                                        className="sao-filters__popover" 
                                        content={getPopOver('JobType')} 
                                        trigger="click" 
                                        visible={popOvervisible.jobType}>  
                                            <QuestionCircleFilled onClick = {() => setPopOverVisible({...popOvervisible, 'jobType': true})}/> 
                                    </Popover> 
                                </label>

                                <SelectFilterType  
                                    filterType={FilterType.part_time_option}
                                    style={{ width: '100%' }}
                                    showArrow={true}
                                    className="sao-filters__select"
                                    value = {userSelection?.part_time_option?.value}
                                    onChange = {handleChangePartTimeOption}
                                    showPlaceHolderAsOption={true}
                                    placeholder={"All"} 
                                    tabIndex={6} />
                            </div>
                        </Col>
                        <Col xs={24} xl={6}> 
                            <div className="sao-filters__type">
                                <label className="sao-filters__label">Annual Salary </label>
                                <SelectFilterType  
                                    filterType={FilterType.annual_salary}
                                    style={{ width: '100%' }}
                                    showArrow={true}
                                    className="sao-filters__select"
                                    value = {userSelection?.annual_salary?.value}
                                    onChange = {handleChangeAnnualSalary}
                                    showPlaceHolderAsOption={true}
                                    placeholder={"All"} 
                                    tabIndex={7} />
                            </div>
                        </Col>
                        <Col xs={24} xl={8}>
                            <div className="sao-filters__type">
                                <label className="sao-filters__label"> Keyword
                                    <Popover placement="top" overlayClassName="sao-filters__popover-inner" 
                                        className="sao-filters__popover" 
                                        content={getPopOver('Keywords')} 
                                        trigger="click" 
                                        visible={popOvervisible.keywords}>  
                                        <QuestionCircleFilled onClick={()=> setPopOverVisible({...popOvervisible, 'keywords': true})} /> 
                                    </Popover> 
                                </label>
                                <Input placeholder="Enter job title, keyword(s) or NOC"
                                    value= {userSelection?.keyword}
                                    style={{ width: '100%' }}
                                    onChange={handleChangeKeyWord}
                                    tabIndex={8} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="sao-filters__filter-buttons">
                        <Col xs={24} xl={{span:8, offset:16}}> 
                            <div className="sao-filters__button-layout">
                                <div className="sao-filters__button sao-filters__button--apply" onClick={applyFilters} onKeyDown={handleSpacebar} tabIndex={9}>Apply</div>
                                <div className="sao-filters__button sao-filters__button--reset" onClick={handleReset} tabIndex={10}> 
                                    Clear All
                                    <SyncOutlined /> 
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div id="middle" className="results-background">
                <Results />
            </div>
            <Footer />
        </div>
    );
}

export default Dropdowns