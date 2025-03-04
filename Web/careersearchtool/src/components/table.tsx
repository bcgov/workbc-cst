import React, {FunctionComponent, useState, useEffect} from 'react'
import { Table, Button, Popover, Checkbox, Modal } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import { useFilterContext } from '../state/filterContext'
import { OccupationModel } from 'client/dataTypes'
import { useGetSystemConfigurations } from '../client/apiService'
import { FilterOptionModel, FilterOccupationParams, IndustryTypeModel } from '../client/dataTypes'
import { useGetOccupationsList } from '../client/apiService'
import { defaultFilterParams } from '../state/filterReducer'
import useWindowSize from '../client/useWindowSize'
import { format } from '../client/filtersData'

const ResultsTable: FunctionComponent = () => {
    const { filterOption, filteredOccupationsList, isReset, checkedNocs, sortOption, selectedNoc, windowScroll,
        listSize, isFetchingOccupationList, scrollPosition, setSortOption, setSelectedNoc, setWindowScroll,
        setFilteredOccupationsList, setCheckedNocs, setView, setListSize, setFetchingOccupationList, setReset } = useFilterContext()

    var [viewJobsDates, setViewJobsDates] = useState<string>()
    const [params, setParams] = useState<FilterOccupationParams>(defaultFilterParams)
    const [nameSortVisible, setNameSortVisible] = useState<boolean>(false)
    const [jobsSortVisible, setJobsSortVisible] = useState<boolean>(false)
    const {data: occupationsList, isValidating, isSettled} = useGetOccupationsList(params)
    var { data: JODateRange, isValidating: isFetchingJODates, isSettled: isJODateFetched } = useGetSystemConfigurations({ name: "JobOpeningsDateRange" })
    const [extraSelection, setExtraSelection] = useState<string>()
    const [width] = useWindowSize()
    
    function isMobile() {
        return width < 1200
    }

    useEffect(() => {
        const table = document.querySelector(".results-table .ant-table-body")
        if (table !== null) {
            //Adding this condition to handle a known bug in Mozilla Firefox which cannot handle scrollPosition value to be zero.
            if (scrollPosition == 0) {
                table.scrollTop = 1
            }
            else {
                table.scrollTop = scrollPosition
            }
        }
    },[scrollPosition])

    useEffect(() => {
        setListSize(filteredOccupationsList.length < 10 ? filteredOccupationsList.length : listSize > 10 ? listSize : 10)        
    }, [filteredOccupationsList])

    useEffect(() => {
        if(!!isMobile() && listSize > 0 && windowScroll > 0) {
            window.scrollBy({top: windowScroll})
        }
    },[])

    useEffect(() => {
        if (!!filterOption && !isReset) {
            const filterParams = getFilterParams(filterOption)
            setParams(filterParams)
            const table = document.querySelector(".results-table .ant-table-body")
            //Setting the scrollTop position to 1 to handle a known bug in Mozilla Firefox which cannot handle scrollPosition value to be zero.
            if (table !== null) {
                table.scrollTop = 1
            }
            
        }
        if(isReset) {
            setParams(defaultFilterParams)
        }
    },[filterOption, isReset])

    useEffect(() => {
        if (!isValidating && isSettled && !!occupationsList && occupationsList.length >= 0) {
            setFilteredOccupationsList(occupationsList)
            setFetchingOccupationList(false)
        } else {
            setFetchingOccupationList(true)
        }
    }, [occupationsList, isSettled, isValidating])

    useEffect(() => {
        if (!isFetchingJODates && isJODateFetched && JODateRange) {
            setViewJobsDates(JODateRange.value)
        }
    }, [isFetchingJODates, isJODateFetched, JODateRange])

    useEffect(() => {
        let tempList = [...filteredOccupationsList]      

        switch(sortOption) {
            case 'A-Z':
                setSortOption('A-Z')
                setReset(false)
                setFilteredOccupationsList(tempList.sort((a: OccupationModel, b: OccupationModel ) => {return a.title < b.title ? -1 : 1 }))               
                break

            case 'Z-A':
                setSortOption('Z-A')
                setReset(false)
                setFilteredOccupationsList(tempList.sort((a: OccupationModel, b: OccupationModel ) => {return a.title > b.title ? -1 : 1 }))               
                break

            case 'High to Low':
                setSortOption('High to Low')
                setFilteredOccupationsList(tempList.sort((a: OccupationModel, b: OccupationModel ) => {return a.jobOpenings > b.jobOpenings ? -1 : 1 }))               
                break

            case 'Low to High':
                setSortOption('Low to High')
                setReset(false)
                setFilteredOccupationsList(tempList.sort((a: OccupationModel, b: OccupationModel ) => {return a.jobOpenings < b.jobOpenings ? -1 : 1 }))
                break
        }
    }, [sortOption])

    function scrollTableToTop() {
        const table = document.querySelector(".results-table .ant-table-body")
        if (table !== null) {
            table.scrollTop = 0
        }
    }

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

    function sortClickAnalytics(text){
        window.snowplow('trackSelfDescribingEvent', {"schema":"iglu:ca.bc.gov.workbc/career_search_click/jsonschema/1-0-0",
            "data": {
                "click_type": "sort",
                "source": "search",
                "text": text
            }
        });
    }

    const nameContent = (
        <div className="sort-options">
            <a onClick={()=> {hide();setSortOption('A-Z'); scrollTableToTop();  sortClickAnalytics('A-Z')}}> A - Z </a>
            <a onClick={()=> {hide();setSortOption('Z-A'); scrollTableToTop();  sortClickAnalytics('Z-A')}}> Z - A </a>
        </div>
    )
    const jobContent = (
        <div className="sort-options">
            <a onClick={() => {hide();setSortOption('High to Low'); scrollTableToTop(); sortClickAnalytics('High to Low')}}> High to Low </a>
            <a onClick={() => {hide();setSortOption('Low to High'); scrollTableToTop(); sortClickAnalytics('Low to High')}}> Low to High </a>
        </div>
    )

    const DownSortIcon: FunctionComponent = () => { 
        return (
        <span role="img" aria-label="down" className="anticon anticon-down downicon">
            <svg version="1.1" width="25px" height="16px" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <mask fill="white" id="clip678">
                    <path d="M 25 3.54782608695652  C 25 3.82093397745572  24.9017783291977 4.05539452495974  24.7053349875931 4.2512077294686  L 13.1978908188586 15.7062801932367  C 13.0014474772539 15.9020933977456  12.7688172043011 16  12.5 16  C 12.2311827956989 16  11.9985525227461 15.9020933977456  11.8021091811414 15.7062801932367  L 0.294665012406948 4.2512077294686  C 0.0982216708023161 4.05539452495974  0 3.82093397745572  0 3.54782608695652  C 0 3.27471819645733  0.0982216708023161 3.0402576489533  0.294665012406948 2.84444444444445  L 2.86910669975186 0.293719806763285  C 3.06555004135649 0.0979066022544277  3.29818031430935 0  3.56699751861042 0  C 3.8358147229115 0  4.06844499586435 0.0979066022544277  4.26488833746898 0.293719806763285  L 12.5 8.5024154589372  L 20.735111662531 0.293719806763285  C 20.9315550041357 0.0979066022544277  21.1641852770885 0  21.4330024813896 0  C 21.7018196856907 0  21.9344499586435 0.0979066022544277  22.1308933002481 0.293719806763285  L 24.7053349875931 2.84444444444445  C 24.9017783291977 3.0402576489533  25 3.27471819645733  25 3.54782608695652  Z " fillRule="evenodd" />
                    </mask>
                </defs>
                <g>
                    <path d="M 25 3.54782608695652  C 25 3.82093397745572  24.9017783291977 4.05539452495974  24.7053349875931 4.2512077294686  L 13.1978908188586 15.7062801932367  C 13.0014474772539 15.9020933977456  12.7688172043011 16  12.5 16  C 12.2311827956989 16  11.9985525227461 15.9020933977456  11.8021091811414 15.7062801932367  L 0.294665012406948 4.2512077294686  C 0.0982216708023161 4.05539452495974  0 3.82093397745572  0 3.54782608695652  C 0 3.27471819645733  0.0982216708023161 3.0402576489533  0.294665012406948 2.84444444444445  L 2.86910669975186 0.293719806763285  C 3.06555004135649 0.0979066022544277  3.29818031430935 0  3.56699751861042 0  C 3.8358147229115 0  4.06844499586435 0.0979066022544277  4.26488833746898 0.293719806763285  L 12.5 8.5024154589372  L 20.735111662531 0.293719806763285  C 20.9315550041357 0.0979066022544277  21.1641852770885 0  21.4330024813896 0  C 21.7018196856907 0  21.9344499586435 0.0979066022544277  22.1308933002481 0.293719806763285  L 24.7053349875931 2.84444444444445  C 24.9017783291977 3.0402576489533  25 3.27471819645733  25 3.54782608695652  Z " fillRule="nonzero" fill="#ffffff" stroke="none" />
                    <path d="M 25 3.54782608695652  C 25 3.82093397745572  24.9017783291977 4.05539452495974  24.7053349875931 4.2512077294686  L 13.1978908188586 15.7062801932367  C 13.0014474772539 15.9020933977456  12.7688172043011 16  12.5 16  C 12.2311827956989 16  11.9985525227461 15.9020933977456  11.8021091811414 15.7062801932367  L 0.294665012406948 4.2512077294686  C 0.0982216708023161 4.05539452495974  0 3.82093397745572  0 3.54782608695652  C 0 3.27471819645733  0.0982216708023161 3.0402576489533  0.294665012406948 2.84444444444445  L 2.86910669975186 0.293719806763285  C 3.06555004135649 0.0979066022544277  3.29818031430935 0  3.56699751861042 0  C 3.8358147229115 0  4.06844499586435 0.0979066022544277  4.26488833746898 0.293719806763285  L 12.5 8.5024154589372  L 20.735111662531 0.293719806763285  C 20.9315550041357 0.0979066022544277  21.1641852770885 0  21.4330024813896 0  C 21.7018196856907 0  21.9344499586435 0.0979066022544277  22.1308933002481 0.293719806763285  L 24.7053349875931 2.84444444444445  C 24.9017783291977 3.0402576489533  25 3.27471819645733  25 3.54782608695652  Z " strokeWidth="2" stroke="#234075" fill="none" mask="url(#clip678)" />
                </g>
            </svg>
        </span>
      )};

    const title = (<b> SORT BY: </b>)

    const columns = [
        {
            title: (<div className="table-header">
                <div className="table-header__title"> Career name </div>
                <Popover placement="bottomRight" title={title} content={nameContent} overlayClassName="sort-options__popover-inner" 
                className="sort-options__popover" trigger="click" visible={nameSortVisible} onVisibleChange={handleNameSortVisible}>
                    <span className="table-header__icon" style={{marginLeft: '15px'}}> <DownSortIcon /></span>
                </Popover>
            </div>),
            dataIndex: 'title',
            className: 'table-col-1',
            render: (text, record: OccupationModel) => {
                if (filteredOccupationsList.length > 0 ) {
                    return (
                    <span onClick={() => handleSelectedNoc(record)}> 
                        <a style={record.noc === selectedNoc ? {color: '#007eb4'} : {color: 'black'}}> 
                            <b>{text}</b> (NOC {record.noc})
                        </a> 
                    </span>)
                } else {
                    return ((!!isFetchingOccupationList ? <h4> Loading ..... </h4> : 
                        <div>
                            <h4>Your search returned no results.</h4>
                            <p>Suggestions: </p>
                            <ul>
                                <li>Ensure words are spelled correctly.</li>
                                <li>Replace abbreviations with complete words.</li>
                                <li>Try removing filters to broaden your search.</li>
                            </ul>
                        </div>
                    ))
                }
            },
        },
        {
            title: (<div className="table-header">
                <div className="table-header__title">Job openings <span>{viewJobsDates}</span> </div>
                <Popover placement="bottomRight" title={title} content={jobContent} overlayClassName="sort-options__popover-inner" 
                className="sort-options__popover" trigger="click" visible={jobsSortVisible} onVisibleChange={handleJobsSortVisible}>
                    <span className="table-header__icon" style={{marginLeft: '15px'}}> <DownSortIcon /></span>
                </Popover>
            </div>),
            className: 'jobOpenings table-col-2',
            dataIndex: 'jobOpenings',
            defaultSortOrder: 'descend',
            render: (text, record) => {
                return (<div>{format(text)}</div>)
            }
        },
        {
            title: 'Compare careers',
            dataIndex: 'compare',
            className: filteredOccupationsList.length <= 1 && isMobile() ? 'table-col-3-one-or-zero-result': 'table-col-3',
            render: (text, record: OccupationModel) => {
                if (filteredOccupationsList && filteredOccupationsList.length > 1) {
                    return (<div>
                                <Checkbox checked={isChecked(record.noc)} onChange={(event)=> handleSelectCheckBox(event, record.noc)}></Checkbox>
                                <Modal visible={extraSelection === record.noc} footer={null} onCancel={hide} centered>
                                    <p> You may compare a maximum of three careers. </p>
                                    <p><b>To add this career, please deselect one of the careers you previously selected.</b></p>
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
        window.snowplow('trackSelfDescribingEvent', {"schema":"iglu:ca.bc.gov.workbc/career_search_click/jsonschema/1-0-0",
            "data": {
                "click_type": "preview",
                "source": "search",
                "text": record.noc 
            }
        });
        setSelectedNoc(record.noc)
        setReset(false)
        if(isMobile()) {
            setView('careerPreview')
            setWindowScroll(window.scrollY)
        } else {
            setView('results')
        }
    }

    function moreThanOneResult() {
        return filteredOccupationsList.length > 1
    }
    
    function onRow(record: any) {
        return {
            onClick: () => {}
        }
    }

    function loadMore() {
        listSize + 10 < filteredOccupationsList.length ? setListSize(listSize + 10) : setListSize(filteredOccupationsList.length)
    }

    function getMobileDatasource() {
        let size = listSize < filteredOccupationsList.length ? listSize : filteredOccupationsList.length
        return filteredOccupationsList.length > 0? filteredOccupationsList.slice(0,size): [{ id: -1, noc: '', title: '', jobOpenings: undefined}]
    }

    function getTableDatasource() {
        return filteredOccupationsList.length > 0? filteredOccupationsList: [{ id: -1, noc: '', title: '', jobOpenings: undefined}]
    }

    return (<div className="results-table">
                {!isMobile() && (
                    <Table
                        rowClassName={'ant-table-row-light'}
                        columns={columns}
                        dataSource={getTableDatasource()}
                        rowKey="noc"
                        loading = {!!isValidating && !isSettled}
                        pagination={false}
                        scroll={ moreThanOneResult() ? !isMobile() ? { y: 622 } : undefined : undefined }
                        onRow={onRow}>
                    </Table>
                )}
                {!!isMobile() && (
                    <div>
                        <Table
                            rowClassName={'ant-table-row-light'}
                            columns={columns}
                            dataSource={getMobileDatasource()}
                            rowKey="noc"
                            pagination={false}
                            scroll={ moreThanOneResult() ? !isMobile() ? { y: 622 } : { x: 420 } : undefined }
                            tableLayout='fixed'
                            onRow={onRow}>
                        </Table>
                        <div className="results-table-mobile-controls">
                            { filteredOccupationsList.length > 1 && 
                               <div>
                                    <div style={{textAlign: 'center', marginTop: '1rem'}}> Displaying <b> {listSize} </b> of <b> {filteredOccupationsList.length} </b> results. </div>
                                    <Button disabled={listSize === filteredOccupationsList.length} className="results-table-button" block type="primary" onClick={() => loadMore()}>
                                        Show More Results
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                )}
        </div>)
}

export default ResultsTable
