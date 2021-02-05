import React, { FunctionComponent, useEffect, useState } from 'react'
import {Table, Row, Col, Button} from 'antd'
import { MailOutlined , PrinterOutlined  } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { useGetOccupationsList, useGetOccupationSummary, useGetSystemConfigurations } from '../client/apiService'
import { FilterOptionModel, FilterOccupationParams, OccupationSummary } from '../client/dataTypes'
import { defaultFilterParams } from '../state/filterReducer'
// import {useHistory} from 'react-router-dom'

const results: FunctionComponent = () => {
    const {filterOption, filteredOccupationsList, selectedNoc, setSelectedNoc, setFilteredOccupationsList} = useFilterContext()

    const [params, setParams] = useState<FilterOccupationParams>(defaultFilterParams)
    const [occupationDetail, setOccupationDetail] = useState<OccupationSummary>()
    const [careerProfileUrl, setCareerProfileUrl] = useState<string>()
    const [viewJobsUrl, setViewJobsUrl] = useState<string>()

    const [profileImagesPath, setProfileImagesPath] = useState<string>()
    const [backgroundImagesPath, setBackgroundImagesPath] = useState<string>()
    const [careerTrekBaseUrl, setCareerTrekBaseUrl] = useState<string>()
    const [imageCarouselNocs, setImageCarouselNocs] = useState<string>()
    
    const {data: occupationsList, isValidating, isSettled} = useGetOccupationsList(params)
    const {data: occupationSummary, isValidating: isFetchingSummary, isSettled: isSummaryFetched} = useGetOccupationSummary(selectedNoc)
    const {data: CPUrlData, isValidating: isFetchingCPUrl, isSettled: isCPUrlFetched } = useGetSystemConfigurations({name: "CareerProfileBaseUrl"})
    const {data: JOUrlData, isValidating: isFetchingJOUrl, isSettled: isJOUrlFetched } = useGetSystemConfigurations({name: "JobOpeningsBaseUrl"})
    
    const {data: piPathData, isValidating: isFetchingPIPath, isSettled: isPiPathFetched } = useGetSystemConfigurations({name: "ProfileImagesPath"})
    const {data: bgIPathData, isValidating: isFetchingBgIPath, isSettled: isBgIPathFetched } = useGetSystemConfigurations({name: "BackgroundImagesPath"})
    const {data: ctvUrlData, isValidating: isFetchingCtvUrl, isSettled: isCtvUrlFetched } = useGetSystemConfigurations({name: "CareerTrekVideoBaseUrl"})
    const {data: icNocsData, isValidating: isFetchingIcNocs, isSettled: isIcNocsFetched } = useGetSystemConfigurations({name: "ImageCarouselNOCs"})
    // const history = useHistory()

    useEffect(() => {
           if (!!filterOption) {
                const filterParams = getFilterParams(filterOption)
                setParams(filterParams)
           }
    },[filterOption])

    useEffect(() => {
        if (!isValidating && isSettled && !!occupationsList && occupationsList.length >= 0) {
            setFilteredOccupationsList(occupationsList)
        }
    }, [occupationsList, isSettled, isValidating])

    useEffect(() => {
        if(!isFetchingSummary && isSummaryFetched && occupationSummary) {
            setOccupationDetail(occupationSummary[0])
        }
    }, [selectedNoc, isFetchingSummary, isSummaryFetched])

    useEffect(() => {
        if(!isFetchingCPUrl && isCPUrlFetched && CPUrlData) {
            setCareerProfileUrl(CPUrlData.value + selectedNoc)
        }
    }, [selectedNoc, isFetchingCPUrl, isCPUrlFetched])

    useEffect(() => {
        if(!isFetchingJOUrl && isJOUrlFetched && JOUrlData) {
            setViewJobsUrl(JOUrlData.value + selectedNoc)
        }
    }, [selectedNoc, isFetchingJOUrl, isJOUrlFetched])

    useEffect(() => {
        if(!isFetchingPIPath && isPiPathFetched && piPathData) {
            setProfileImagesPath(piPathData.value + getProfileImageName(selectedNoc))
        }
    }, [selectedNoc, isFetchingPIPath, isPiPathFetched])

    useEffect(() => {
        if(!isFetchingPIPath && isBgIPathFetched && bgIPathData) {
            setBackgroundImagesPath(bgIPathData.value + getBackgroundImageName(selectedNoc))
        }
    }, [selectedNoc, isFetchingPIPath, isBgIPathFetched])

    useEffect(() => {
        if(!isFetchingCtvUrl && isCtvUrlFetched && ctvUrlData) {
            setCareerTrekBaseUrl(ctvUrlData.value + selectedNoc)
        }
    }, [selectedNoc, isFetchingCtvUrl, isCtvUrlFetched])

    useEffect(() => {
        if(!isFetchingIcNocs && isIcNocsFetched && icNocsData) {
            setImageCarouselNocs(icNocsData.value + selectedNoc)
        }
    }, [selectedNoc, isFetchingIcNocs, isIcNocsFetched])

    const columns = [
        {
            title: 'Career Name',
            dataIndex: 'nocAndTitle',
            sorter: (a: any, b:any) => {
                if (a.nocAndTitle > b.nocAndTitle) return -1
                else if (b.nocAndTitle > a.nocAndTitle) return 1
                else return 0
            },
            defaultSortOrder: 'descend',
            sortDirections: ['ascend']
        },
        {
            title: 'Job Openings (2019-2029)',
            dataIndex: 'jobOpenings',
            sorter: (a: any, b: any) => a.jobOpenings - b.jobOpenings,
            sortDirections: ['ascend']
        },
        {
            title: 'Compare (up to 3 Careers)',
            dataIndex: 'compare',
            render: () => {
                if (filteredOccupationsList && filteredOccupationsList.length > 1) {
                    return (<Checkbox defaultChecked={false}></Checkbox>)
                }
            }
        }
    ]

    function getBackgroundImageName(noc: string):string {
        return noc + "-NOC-" + "background.png"
    }
    
    function getProfileImageName(noc: string):string {
        return noc + "-NOC-" + "profile.png"
    }
   
    function  getFilterParams(params: FilterOptionModel) : FilterOccupationParams {
        const filterParams = {
            GeographicAreaId: params.region?.id,
            EducationLevelId: params.education?.id,
            OccupationalInterestId: params.education?.id,
            IndustryId: params.industry?.id,
            OccupationalGroupId: params.occupational_group?.id,
            FullTimeOrPartTimeId: params.part_time_option?.id,
            AnnualSalaryId: params.annual_salary?.id,
            Keywords: params.keyword
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
    //    history.push('/compareCareers')
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
                <Col span={16}>
                    { !isValidating && isSettled &&  
                        <Table
                            columns={columns}
                            dataSource={filteredOccupationsList}
                            rowKey="noc"
                            pagination={false}
                            bordered
                            scroll={{ y: 500 }}
                            onRow={onRow}>
                        </Table>
                    }
                </Col>
                {selectedNoc!=="default" && isSettled &&  !isValidating && occupationsList && occupationsList?.length >= 0 &&
                (<Col span={8}>
                    <b> {occupationDetail?.title} (NOC {occupationDetail?.noc}) </b>
                    <img src={profileImagesPath} alt='career profile pic'/>
                    <Row gutter={8}>
                        <Col span={8}> Annual Salary </Col>
                        <Col span={8}> <b> {occupationDetail?.income} </b> </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}> EducationLevel </Col>
                        <Col span={8}> <b> {occupationDetail?.education.value} </b> </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}> Job Openings (2019 - 2029) </Col>
                        <Col span={8}> <b> {occupationDetail?.jobOpenings} </b> </Col>
                    </Row>
                    <Row>
                        <Col offset={4}> 
                            <a href={careerProfileUrl} target="_blank"> 
                                <Button style={{width: '200px', margin: '20px 0px'}}>
                                    View Career Profile
                                </Button>
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={4}> 
                            <a href={viewJobsUrl} target="_blank">
                                <Button style={{width: '200px', margin: '20px 0px'}}>
                                    Find Jobs
                                </Button>
                            </a>
                        </Col>
                    </Row>
                </Col>)}
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
