import React, {FunctionComponent, Key } from 'react'
import { Input, Row, Col, Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import SelectFilterType from './wbSelectFilterType';

import { FilterType } from '../API/dataTypes';
import { useFilterContext } from '../Services/filterContext';
import { defaultFilterOption } from '../Services/filterReducer';

const Dropdowns: FunctionComponent = () => {

    const {filterOption, setFilterOption, resetOptions} = useFilterContext()

    function handleChangeRegion(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setFilterOption({id: value as number, value: options.value}, FilterType.region)
            } else {
                setFilterOption(defaultFilterOption.region, FilterType.region)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeEducation(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setFilterOption({id: value as number, value: options.value}, FilterType.education)
            } else {
                setFilterOption(defaultFilterOption.region, FilterType.education)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeOccupationalInterest(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setFilterOption({id: value as number, value: options.value}, FilterType.occupational_interest)
            } else {
                setFilterOption(defaultFilterOption.region, FilterType.occupational_interest)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeIndustry(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setFilterOption({id: value as number, value: options.value}, FilterType.industry)
            } else {
                setFilterOption(defaultFilterOption.region, FilterType.industry)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeOccupationalGroup(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setFilterOption({id: value as number, value: options.value}, FilterType.occupational_group)
            } else {
                setFilterOption(defaultFilterOption.region, FilterType.occupational_group)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangePartTimeOption(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setFilterOption({id: value as number, value: options.value}, FilterType.part_time_option)
            } else {
                setFilterOption(defaultFilterOption.region, FilterType.part_time_option)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeAnnualSalary(value: Key, options: any) {
        try {
            if (!!value && !!options && options.value) {
                setFilterOption({id: value as number, value: options.value}, FilterType.annual_salary)
            } else {
                setFilterOption(defaultFilterOption.region, FilterType.annual_salary)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleReset() {
        try {
            resetOptions()
        } catch (error) {
            console.log(error)
        }
    }

    function applyFilters() {
        console.log(`The applied filters are : ${JSON.stringify(filterOption)}`)
    }

    return (
        <div>
            <Row>
                <Col span={6}>
                    <div>
                        <p> <b> Region ? </b> </p>
                        <SelectFilterType  
                            filterType={FilterType.region}
                            colSpan={5}
                            value = {filterOption?.region?.value}
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
                            value = {filterOption?.education?.value}
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
                            value = {filterOption?.occupational_interest?.value}
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
                            value = {filterOption?.industry?.value}
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
                            value = {filterOption?.occupational_group?.value}
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
                            value = {filterOption?.part_time_option?.value}
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
                            value = {filterOption?.annual_salary?.value}
                            onChange = {handleChangeAnnualSalary}
                            showPlaceHolderAsOption={false}
                            placeholder={"All"} />
                    </div>
                </Col>
                <Col span={6}>
                    <p> <b> Keyword ? </b> </p>
                    <Input placeholder="Enter career title, Keyword(s) or NOC" />
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
    );
}

export default Dropdowns