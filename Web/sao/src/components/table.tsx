import React, {FunctionComponent, useState, useEffect} from 'react'
import { Row, Col, Table, Button, Popover, Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import { DownOutlined  } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import { OccupationModel } from 'client/dataTypes'
import { FilterOptionModel, FilterOccupationParams, IndustryTypeModel } from '../client/dataTypes'
import { useGetOccupationsList } from '../client/apiService'
import { defaultFilterParams } from '../state/filterReducer'

const ResultsTable: FunctionComponent = () => {
    const { filterOption, filteredOccupationsList, isReset, selectedCheckBoxes, checkedNocs,
        setSelectedNoc, setFilteredOccupationsList, setSelectedCheckBoxes, setCheckedNocs } = useFilterContext()

    const [occupationsSortOption, setOccupationsSortOption] = useState<string>('')

    const [params, setParams] = useState<FilterOccupationParams>(defaultFilterParams)
    const {data: occupationsList, isValidating, isSettled} = useGetOccupationsList(params)
    
    useEffect(() => {
        if (!!filterOption && !isReset) {
            const filterParams = getFilterParams(filterOption)
            setParams(filterParams)
        }
        if(isReset) {
            setParams(defaultFilterParams)
        }
    },[filterOption, isReset])

    useEffect(() => {
        if (!isValidating && isSettled && !!occupationsList && occupationsList.length >= 0) {
            setFilteredOccupationsList(occupationsList)
        }
    }, [occupationsList, isSettled, isValidating])

    useEffect(() => {
        let tempList = [...filteredOccupationsList]
        switch(occupationsSortOption) {
            case 'A-Z':
                const sortedOrder = tempList.sort((a: OccupationModel, b: OccupationModel ) => {return a.nocAndTitle < b.nocAndTitle ? -1 : 1 })
                setFilteredOccupationsList(sortedOrder)                
                break
            case 'Z-A':
                setFilteredOccupationsList(tempList.sort((a: OccupationModel, b: OccupationModel ) => {return a.nocAndTitle > b.nocAndTitle ? -1 : 1 }))                
                break
            case 'High to Low':
                setFilteredOccupationsList(tempList.sort((a: OccupationModel, b: OccupationModel ) => {return a.jobOpenings> b.jobOpenings ? -1 : 1 }))                
                break
            case 'Low to High':
                setFilteredOccupationsList(tempList.sort((a: OccupationModel, b: OccupationModel ) => {return a.jobOpenings < b.jobOpenings ? -1 : 1 }))                
                break
        }
    }, [occupationsSortOption])

    function getIndustryParams(params: IndustryTypeModel) {
        let industryIds = '-1'
        let subIndustryIds = '-1'
        if (!!params.id.split(':')[1]) {
            subIndustryIds = params.id.split(':')[1].toString()
        } else {
            industryIds = params.id.split(':')[0].toString()
        }
        return { industries: industryIds, subIndustries: subIndustryIds }
    }
    
    function  getFilterParams(params: FilterOptionModel) : FilterOccupationParams {
        const filterParams = {
            GeographicAreaId: params.region?.id,
            EducationLevelId: params.education?.id,
            OccupationalInterestId: params.education?.id,
            IndustryIds: getIndustryParams(params.industry).industries,
            SubIndustryIds: getIndustryParams(params.industry).subIndustries,
            OccupationalGroupId: params.occupational_group?.id,
            FullTimeOrPartTimeId: params.part_time_option?.id,
            AnnualSalaryId: params.annual_salary?.id,
            Keywords: params.keyword
        }
        return filterParams
    }    

    const nameContent = (
        <div>
            <Row><Col><Button style={{border: 'none'}} onClick={()=>  setOccupationsSortOption('A-Z')}> A - Z </Button></Col></Row>
            <Row><Col><Button style={{border: 'none'}} onClick={()=>  setOccupationsSortOption('Z-A')}> Z - A </Button></Col></Row>
        </div>
    )
    const jobContent = (
        <div>
            <Row><Col><Button style={{border: 'none'}} onClick={() =>  setOccupationsSortOption('High to Low')}> High to Low </Button></Col></Row>
            <Row><Col><Button style={{border: 'none'}} onClick={() =>  setOccupationsSortOption('Low to High')}> Low to High </Button></Col></Row>
        </div>
    )

    const title = (<b> SORT BY: </b>)

    const columns = [
        {
            title: (<div>
                Career name
                <Popover placement="bottomRight" title={title} content={nameContent} trigger="click">
                    <span style={{float: 'right'}}> <DownOutlined /> </span>
                </Popover>
            </div>),
            dataIndex: 'nocAndTitle',
            width:'65%',
            render: (text, record: OccupationModel) => {
                return (<span> <a> {text} {record.noc}</a> </span>)
            },
        },
        {
            title: (<div> 
                Job Openings (2019-2029)
                <Popover placement="bottomRight" title={title} content={jobContent} trigger="click">
                    <span style={{float: 'right'}}> <DownOutlined /> </span>
                </Popover>
            </div>),
            dataIndex: 'jobOpenings',
            defaultSortOrder: 'descend'
        },
        {
            title: 'Compare (up to 3 Careers)',
            dataIndex: 'compare',
            render: (text, record: OccupationModel) => {
                if (filteredOccupationsList && filteredOccupationsList.length > 1) {
                    return (<Checkbox disabled={selectedCheckBoxes > 2}></Checkbox>)
                }
            }
        }
    ]

    function onRow(record: any) {
        return {
            onClick: () => {}
        }
    }

    function getDatasource() {
        return filteredOccupationsList.length > 0? filteredOccupationsList: [{ id: -1, noc: '', nocAndTitle: 'Your search returned no results', jobOpenings: undefined}]
    }

    return (<div>
                {!isValidating && isSettled && <Table
                    rowClassName={(record, index) => index % 2 === 0 ? 'ant-table-row-light' :  'ant-table-row-dark'}
                    columns={columns}
                    dataSource={getDatasource()}
                    rowKey="noc"
                    pagination={false}
                    scroll={{ y: 500 }}
                    onRow={onRow}>
                </Table>}
        </div>)
}

export default ResultsTable