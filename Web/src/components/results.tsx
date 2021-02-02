import React, { FunctionComponent, useEffect, useState } from 'react'
import {Table, Row, Col, Button} from 'antd'
import { MailOutlined , PrinterOutlined  } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { useGetOccupationsList, useGetOccupationSummary } from '../client/apiService'
import { FilterOptionModel, FilterOccupationParams, OccupationSummary } from '../client/dataTypes'
import { defaultFilterParams } from '../state/filterReducer'
import {navigate} from "gatsby"

const columns = [
    {
        title: 'Career Name',
        dataIndex: 'nocAndTitle'
    },
    {
        title: 'Job Openings (2019-2019)',
        dataIndex: 'jobOpenings'
    },
    {
        title: 'Compare (up to 3 Careers)',
        dataIndex: 'compare',
        render: () => {
            return (<Checkbox defaultChecked={false}></Checkbox>)
        }
    }
]

const results: FunctionComponent = () => {
    const {filterOption, filteredOccupationsList, selectedNoc, setSelectedNoc, setFilteredOccupationsList} = useFilterContext()

    const [params, setParams] = useState<FilterOccupationParams>(defaultFilterParams)
    const [occupationDetail, setOccupationDetail] = useState<OccupationSummary>()
    const {data: occupationsList, isValidating, isSettled} = useGetOccupationsList(params)
    const {data: occupationSummary, isValidating: isFetchingSummary, isSettled: isSummaryFetched} = useGetOccupationSummary(selectedNoc)
    
    useEffect(() => {
           if (!!filterOption) {
                const filterParams = getFilterParams(filterOption)
                console.log(`latest filter params: ${JSON.stringify(filterParams)}`)
                setParams(filterParams)
           }
    },[filterOption])

    useEffect(() => {
        if (!isValidating && isSettled && !!occupationsList && occupationsList.length > 0) {
            setFilteredOccupationsList(occupationsList)
        }
    }, [occupationsList, isSettled, isValidating])

    useEffect(() => {
        if(!isFetchingSummary && isSummaryFetched && occupationSummary) {
            // console.log(`summary: ${JSON.stringify(occupationSummary[0])}`)
            setOccupationDetail(occupationSummary[0])
        }
    }, [selectedNoc, isFetchingSummary, isSummaryFetched])

   
    function getFilterParams(params: FilterOptionModel) : FilterOccupationParams {
        const filterParams = {
            GeographicAreaId: params.region?.id,
            EducationLevelId: params.education?.id,
            OccupationalInterestId: params.education?.id,
            IndustryId: params.industry?.id,
            OccupationalGroupId: params.occupational_group?.id,
            FullTimeOrPartTimeId: params.part_time_option?.id,
            AnnualSalaryId: params.annual_salary?.id
        }
        return filterParams
    }

    function handlePrintEvent() {
        console.log(' Print profile ')
    }

    function handleEmailEvent() {
        console.log(' Email profile ')
    }

    function onSelect(nocCode: string) {
        setSelectedNoc(nocCode)
    }

    function onRow(record: any) {
        return {
            onClick: () => {
                onSelect(record.noc)
            },
        }
    }

    function handleCompareCareers() {
        navigate('/compare')
    }

    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <h3>
                        Displaying <b> {filteredOccupationsList?.length} results </b>
                    </h3>
                </Col>
                <Col span={8} offset={8}> 
                   <Row gutter={8} style={{float: 'right'}}>
                       <Col> 
                            <Button icon={<PrinterOutlined />} style={{width: '150px'}} onClick={handlePrintEvent}> Print </Button>
                       </Col>
                       <Col> 
                            <Button icon={<MailOutlined />} style={{width: '150px'}} onClick={handleEmailEvent}> E-mail </Button>
                       </Col>
                   </Row>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={16} style={{maxHeight: '500px', overflowY: 'scroll', border: '1px solid black'}}>
                    { !isValidating && isSettled &&  
                        <Table
                            columns={columns}
                            dataSource={filteredOccupationsList}
                            rowKey="noc"
                            pagination={false}
                            onRow={onRow}>
                        </Table>
                    }
                </Col>
                <Col span={8} style={{border: '1px solid black'}}>
                    <b> {occupationDetail?.title} (NOC {occupationDetail?.noc}) </b>
                    <p style={{height: '30%', margin: 'auto', border: '1px solid black'}}> Image or video </p>
                    <p> Annual Salary: {occupationDetail?.income} </p>
                    <p> EducationLevel: {occupationDetail?.education.value} </p>
                    <p> Job Openings (2019 - 2029): {occupationDetail?.jobOpenings} </p>
                    {occupationDetail?.description}
                </Col>
            </Row>
            <Row style={{margin: '24px 0px'}}>
                <Col span={12}>
                    Compare upto 3 careers by selecting the checkboxes in the table and clicking on Compare careers
                </Col>
                <Col span={4}>
                    <Button onClick={handleCompareCareers}> Compare Careers</Button>
                </Col>
            </Row>
        </div>
    );
}

export default results;
