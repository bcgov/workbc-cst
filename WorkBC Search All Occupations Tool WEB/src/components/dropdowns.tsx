import React, {FunctionComponent, Key } from 'react'
import { Input, Row, Col, Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import SelectFilterType from './wbSelectFilterType';

import { FilterType } from '../API/dataTypes';
import { useFilterContext } from '../Services/filterContext';
import { defaultFilterOption } from '../Services/filterReducer';

const Dropdowns: FunctionComponent = () => {

    const {filterOption, setFilterOption} = useFilterContext()

    function handleChangeRegion(value: Key, options: any) {
        console.log(`parmeters : ${value}, ${JSON.stringify(options)}`)
        try {
            if (!!value && !!options && options.value) {
                setFilterOption({id: value as number, value: options.value}, FilterType.region)
            } else {
                setFilterOption(defaultFilterOption.region, FilterType.region)
            }
        } catch (error) {
            console.log(error)
        }
        console.log('Current Filter Option: ' + JSON.stringify(filterOption))
    }

    function handleChangeEducation(value: Key, options: any) {

    }

    function handleChangeOccupationalInterest(value: Key, options: any) {

    }

    function handleChangeIndustry(value: Key, options: any) {

    }

    function handleChangeOccupationalGroup(value: Key, options: any) {

    }

    function handleChangePartTimeOption(value: Key, options: any) {

    }

    function handleChangeAnnualSalary(value: Key, options: any) {

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
                    <Button type="primary" style={{width: "250px"}}> Apply Filters </Button>
                    <Button style={{border: "none"}}> 
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