import React, {FunctionComponent, useState, useEffect} from 'react'
import { Row, Col, Table, Button, Popover, Checkbox, Modal } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import { DownOutlined  } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import { OccupationModel } from 'client/dataTypes'
import { FilterOptionModel, FilterOccupationParams, IndustryTypeModel } from '../client/dataTypes'
import { useGetOccupationsList } from '../client/apiService'
import { defaultFilterParams } from '../state/filterReducer'
import useWindowSize from '../client/useWindowSize'

const ResultsTable: FunctionComponent = () => {
    const { filterOption, filteredOccupationsList, isReset, checkedNocs, sortOption, selectedNoc,
        setSortOption, setSelectedNoc, setFilteredOccupationsList, setCheckedNocs, setView } = useFilterContext()

    const [params, setParams] = useState<FilterOccupationParams>(defaultFilterParams)
    const [nameSortVisible, setNameSortVisible] = useState<boolean>(false)
    const [jobsSortVisible, setJobsSortVisible] = useState<boolean>(false)
    const {data: occupationsList, isValidating, isSettled} = useGetOccupationsList(params)

    const [extraSelection, setExtraSelection] = useState<string>()
    const [listSize, setListSize] = useState(0)
    const [width] = useWindowSize()

    function isMobile() {
        return width < 1200
    }

    useEffect(() => {
        setListSize(isMobile()? 10: 500)
    }, [width])

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
                setFilteredOccupationsList(tempList.sort((a: OccupationModel, b: OccupationModel ) => {return a.title < b.title ? -1 : 1 }))                
                break
            case 'Z-A':
                setFilteredOccupationsList(tempList.sort((a: OccupationModel, b: OccupationModel ) => {return a.title > b.title ? -1 : 1 }))                
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

    function format(value: string) { //add ',' for numbers with 5 digits. Note: At this point greatest value of job openings has just 5 digits
        return value?.toString().length === 5 ? value.toString().slice(0,2)+','+value.toString().slice(2,5) : value
    }

    const nameContent = (
        <div className="sort-options">
            <a onClick={()=> {hide();setSortOption('A-Z')}}> A - Z </a>
            <a onClick={()=> {hide();setSortOption('Z-A')}}> Z - A </a>
        </div>
    )
    const jobContent = (
        <div className="sort-options">
            <a onClick={() => {hide();setSortOption('High to Low')}}> High to Low </a>
            <a onClick={() => {hide();setSortOption('Low to High')}}> Low to High </a>
        </div>
    )

    const title = (<b> SORT BY: </b>)

    const columns = [
        {
            title: (<div className="table-header">
                <div className="table-header__title"> Career Name </div>
                <Popover placement="bottomRight" title={title} content={nameContent} overlayClassName="sort-options__popover-inner" 
                className="sort-options__popover"  trigger="click" visible={nameSortVisible} onVisibleChange={handleNameSortVisible}>
                    <span className="table-header__icon" style={{marginLeft: '25px'}}> <DownOutlined className="downicon"/> </span>
                </Popover>
            </div>),
            dataIndex: 'title',
            width:'60%',
            render: (text, record: OccupationModel) => {
                if (filteredOccupationsList.length > 0 ) {
                    return (
                    <span onClick={() => handleSelectedNoc(record)}> 
                        <a style={record.noc === selectedNoc ? {color: '#007eb4'} : {color: 'black'}}> 
                            <b>{text}</b> (NOC {record.noc})
                        </a> 
                    </span>)
                } else {
                    return (<h4>Your search returned no results.</h4>)
                }
            },
        },
        {
            title: (<div className="table-header"> 
                <div className="table-header__title"> Job Openings (2019-2029) </div>
                <Popover placement="bottomRight" title={title} content={jobContent} overlayClassName="sort-options__popover-inner" 
                className="sort-options__popover" trigger="click" visible={jobsSortVisible} onVisibleChange={handleJobsSortVisible}>
                    <span className="table-header__icon"> <DownOutlined className="downicon" /> </span>
                </Popover>
            </div>),
            width: '25%',
            dataIndex: 'jobOpenings',
            defaultSortOrder: 'descend',
            render: (text, record) => {
                return (<div>{format(text)}</div>)
            }
        },
        {
            title: 'Compare Careers',
            dataIndex: 'compare',
            width: '15%',
            render: (text, record: OccupationModel) => {
                if (filteredOccupationsList && filteredOccupationsList.length > 1) {
                    return (<div>
                                <Checkbox checked={isChecked(record.noc)} onChange={(event)=> handleSelectCheckBox(event, record.noc)}></Checkbox>
                                <Modal visible={extraSelection === record.noc} footer={null} onCancel={hide} centered>
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
        if(isMobile()) {
            setView('careerPreview')
        } else {
            setView('results')
        }
    }

    function onRow(record: any) {
        return {
            onClick: () => {}
        }
    }

    function loadMore() {
        setListSize(listSize + 10)
    }

    function getDatasource() {
        let size = listSize < filteredOccupationsList.length ? listSize : filteredOccupationsList.length
        return filteredOccupationsList.length > 0? filteredOccupationsList.slice(0,size): [{ id: -1, noc: '', title: '', jobOpenings: undefined}]
    }

    return (<div>
                {<Table
                    rowClassName={'ant-table-row-light'}
                    columns={columns}
                    dataSource={getDatasource()}
                    rowKey="noc"
                    pagination={false}
                    scroll={!isMobile() ? { y: 622 } : undefined}
                    onRow={onRow}>
                </Table>}
                {!!isMobile() && (<Button className="results-table-button" block type="primary" onClick={() => loadMore()}>Load More</Button>)}
        </div>)
}

export default ResultsTable