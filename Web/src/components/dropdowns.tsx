import React, {FunctionComponent, Key, useEffect, useState } from 'react'
import { Input, Row, Col, Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import SelectFilterType from './wbSelectFilterType';

import { FilterType, FilterOptionModel } from '../client/dataTypes';
import { useFilterContext } from '../state/filterContext';
import { defaultFilterOption, defaultFilterParams } from '../state/filterReducer';
import Results from './results'

const Dropdowns: FunctionComponent = () => {

    const {filterOption, setFilterOption, resetOptions} = useFilterContext()

    const [userSelection, setUserSelection] = useState<FilterOptionModel>(defaultFilterOption)

    useEffect(()=> {
        if(!!filterOption) {
            setUserSelection(filterOption)
        }
    }, [filterOption])

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

    function handleChangeIndustry(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setUserSelection({...userSelection, industry: {id: value as number, value: options.value}})
            } 
        } catch (error) {
            console.log(error)
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
        console.log(`The applied filters are : ${JSON.stringify(userSelection)}`)
        setFilterOption(userSelection)
    }

    return (
        <div>
            <div>
                <Row>
                    <Col span={6}>
                        <div>
                            <p> <b> Region ? </b> </p>
                            <SelectFilterType  
                                filterType={FilterType.region}
                                colSpan={5}
                                value = {userSelection?.region?.value}
                                onChange = {handleChangeRegion}
                                showPlaceHolderAsOption={false}
                                placeholder={"British Columbia"}  />
                        </div>
                    </Col>
                    <Col span={6}> 
                        <div>
                            <p> <b> Education ? </b> </p>
                            <SelectFilterType  
                                filterType={FilterType.education}
                                colSpan={5}
                                value = {userSelection?.education?.value}
                                onChange = {handleChangeEducation}
                                showPlaceHolderAsOption={false}
                                placeholder={"All"} />
                        </div>
                    </Col>
                    <Col span={6}> 
                        <div>
                            <p> <b> Occupational Interest ? </b> </p>
                            <SelectFilterType  
                                filterType={FilterType.occupational_interest}
                                colSpan={5}
                                value = {userSelection?.occupational_interest?.value}
                                onChange = {handleChangeOccupationalInterest}
                                showPlaceHolderAsOption={false}
                                placeholder={"All"} />
                        </div>
                    </Col>
                    <Col span={6}> 
                        <div>
                            <p> <b> Industry ? </b> </p>
                            <SelectFilterType  
                                filterType={FilterType.industry}
                                colSpan={5}
                                value = {userSelection?.industry?.value}
                                onChange = {handleChangeIndustry}
                                showPlaceHolderAsOption={false}
                                placeholder={"All"}  />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <div>
                            <p> <b> Occupational Group ? </b> </p>
                            <SelectFilterType  
                                filterType={FilterType.occupational_group}
                                colSpan={5}
                                value = {userSelection?.occupational_group?.value}
                                onChange = {handleChangeOccupationalGroup}
                                showPlaceHolderAsOption={false}
                                placeholder={"All"} />
                        </div>
                    </Col>
                    <Col span={6}> 
                        <div>
                            <p> <b> Part-time Option ? </b> </p>
                            <SelectFilterType  
                                filterType={FilterType.part_time_option}
                                colSpan={5}
                                value = {userSelection?.part_time_option?.value}
                                onChange = {handleChangePartTimeOption}
                                showPlaceHolderAsOption={false}
                                placeholder={"All"} />
                        </div>
                    </Col>
                    <Col span={6}> 
                        <div>
                            <p> <b> Annual Salary ? </b> </p>
                            <SelectFilterType  
                                filterType={FilterType.annual_salary}
                                colSpan={5}
                                value = {userSelection?.annual_salary?.value}
                                onChange = {handleChangeAnnualSalary}
                                showPlaceHolderAsOption={false}
                                placeholder={"All"} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <p> <b> Keyword ? </b> </p>
                        <Input placeholder="Enter career title, Keyword(s) or NOC"
                               value= {userSelection?.keyword}
                               onChange={handleChangeKeyWord} />
                    </Col>
                </Row>
                <Row style={{padding: "10px"}}>
                    <Col span={6} offset={18}> 
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
            <div>
                <Results />
            </div>
        </div>
    );
}

export default Dropdowns