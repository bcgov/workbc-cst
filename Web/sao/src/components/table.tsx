import React, {FunctionComponent, useState, useEffect} from 'react'
import { Row, Col, Table, Button, Popover, Checkbox, Modal } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import { DownOutlined  } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import { OccupationModel } from 'client/dataTypes'
import { FilterOptionModel, FilterOccupationParams, IndustryTypeModel } from '../client/dataTypes'
import { useGetOccupationsList } from '../client/apiService'
import { defaultFilterParams } from '../state/filterReducer'

const ResultsTable: FunctionComponent = () => {
    const { filterOption, filteredOccupationsList, isReset, checkedNocs, sortOption, selectedNoc,
        setSortOption, setSelectedNoc, setFilteredOccupationsList, setCheckedNocs } = useFilterContext()

    const [params, setParams] = useState<FilterOccupationParams>(defaultFilterParams)
    const [nameSortVisible, setNameSortVisible] = useState<boolean>(false)
    const [jobsSortVisible, setJobsSortVisible] = useState<boolean>(false)
    const {data: occupationsList, isValidating, isSettled} = useGetOccupationsList(params)

    const [extraSelection, setExtraSelection] = useState<string>()
    
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
        switch(sortOption) {
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
    }, [sortOption])

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
            OccupationalInterestId: params.occupational_interest?.id,
            IndustryIds: getIndustryParams(params.industry).industries,
            SubIndustryIds: getIndustryParams(params.industry).subIndustries,
            OccupationalGroupId: params.occupational_group?.id,
            FullTimeOrPartTimeId: params.part_time_option?.id,
            AnnualSalaryId: params.annual_salary?.id,
            Keywords: params.keyword
        }
        return filterParams
    }    

    function isChecked(nocId: string): boolean {
        return checkedNocs.find(noc => noc === nocId)? true: false
    }

    function handleNameSortVisible(visible:boolean) {
        setNameSortVisible(visible)
    }

    function handleJobsSortVisible(visible:boolean) {
        setJobsSortVisible(visible)
    }

    function hide() {
        setNameSortVisible(false)
        setJobsSortVisible(false)
        setExtraSelection(undefined)
    }

    const nameContent = (
        <div>
            <Row><Col><Button style={{border: 'none'}} onClick={()=> {hide();setSortOption('A-Z')}}> A - Z </Button></Col></Row>
            <Row><Col><Button style={{border: 'none'}} onClick={()=> {hide();setSortOption('Z-A')}}> Z - A </Button></Col></Row>
        </div>
    )
    const jobContent = (
        <div>
            <Row><Col><Button style={{border: 'none'}} onClick={() => {hide();setSortOption('High to Low')}}> High to Low </Button></Col></Row>
            <Row><Col><Button style={{border: 'none'}} onClick={() => {hide();setSortOption('Low to High')}}> Low to High </Button></Col></Row>
        </div>
    )

    const title = (<b> SORT BY: </b>)

    const columns = [
        {
            title: (<div>
                Career name
                <Popover placement="bottomRight" title={title} content={nameContent} trigger="click" visible={nameSortVisible} onVisibleChange={handleNameSortVisible}>
                    <span style={{float: 'right'}}> <DownOutlined /> </span>
                </Popover>
            </div>),
            dataIndex: 'nocAndTitle',
            width:'65%',
            render: (text, record: OccupationModel) => {
                return (<span onClick={() => handleSelectedNoc(record)}> <a className = {selectedNoc === record.noc? 'selected': ''}> {text} </a> </span>)
            },
        },
        {
            title: (<div> 
                Job Openings (2019-2029)
                <Popover placement="bottomRight" title={title} content={jobContent} trigger="click" visible={jobsSortVisible} onVisibleChange={handleJobsSortVisible}>
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
                    return (<div>
                                <Checkbox checked={isChecked(record.noc)} onChange={(event)=> handleSelectCheckBox(event, record.noc)}></Checkbox>
                                <Modal visible={extraSelection === record.noc} footer={null} centered>
                                    <p><b>You have reached the maximum number of careers you are able to add to the compare feature.</b></p>
                                    <p> Please deselect one of your selected careers to add this career </p>
                                    <Button type="primary" onClick={()=> hide()}>Close</Button>
                                </Modal>
                            </div>)
                }
            }
        }
    ]

    function handleSelectCheckBox (event: CheckboxChangeEvent, nocId) {
        if(event.target.checked) {
            checkedNocs.length < 3 ? setCheckedNocs([...checkedNocs, nocId]) : setExtraSelection(nocId)
        } else {
            const newCheckedNocs = checkedNocs.filter(noc => noc !== nocId)
            setCheckedNocs(newCheckedNocs)
        }
    }

    function handleSelectedNoc(record: any) {
        setSelectedNoc(record.noc)
    }

    function onRow(record: any) {
        return {
            onClick: () => {}
        }
    }

    function getDatasource() {
        return filteredOccupationsList.length > 0? filteredOccupationsList: [{ id: -1, noc: '', nocAndTitle: 'Your search returned no results', jobOpenings: undefined}]
    }

    return (<div>
                {<Table
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