import React, { FunctionComponent, useEffect, useState } from 'react'
import { Row, Col, Button, Carousel } from 'antd'
import { MailOutlined , PrinterOutlined } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import { useGetOccupationSummary, useGetSystemConfigurations } from '../client/apiService'
import { OccupationSummary} from '../client/dataTypes'
import ResultsTable from './table'
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

const results: FunctionComponent = () => {
    const { filteredOccupationsList, selectedNoc, checkedNocs,
        setShowCompareView, setCheckedNocs } = useFilterContext()

   
    const [occupationDetail, setOccupationDetail] = useState<OccupationSummary>()
    const [careerProfileUrl, setCareerProfileUrl] = useState<string>()
    const [viewJobsUrl, setViewJobsUrl] = useState<string>()

    const [profileImagesPath, setProfileImagesPath] = useState<string>()
    const [backgroundImagesPath, setBackgroundImagesPath] = useState<string>()
    const [careerTrekBaseUrl, setCareerTrekBaseUrl] = useState<string>()
    const [imageCarouselNocs, setImageCarouselNocs] = useState<string[]>([])

    const [carouselImagesPath, setCarouselImagesPath] = useState<string[]>([])
    

    const {data: occupationSummary, isValidating: isFetchingSummary, isSettled: isSummaryFetched} = useGetOccupationSummary(selectedNoc)
    const {data: CPUrlData, isValidating: isFetchingCPUrl, isSettled: isCPUrlFetched } = useGetSystemConfigurations({name: "CareerProfileBaseUrl"})
    const {data: JOUrlData, isValidating: isFetchingJOUrl, isSettled: isJOUrlFetched } = useGetSystemConfigurations({name: "JobOpeningsBaseUrl"})
    
    const {data: piPathData, isValidating: isFetchingPIPath, isSettled: isPiPathFetched } = useGetSystemConfigurations({name: "ProfileImagesPath"})
    const {data: bgIPathData, isValidating: isFetchingBgIPath, isSettled: isBgIPathFetched } = useGetSystemConfigurations({name: "BackgroundImagesPath"})
    const {data: ctvUrlData, isValidating: isFetchingCtvUrl, isSettled: isCtvUrlFetched } = useGetSystemConfigurations({name: "CareerTrekVideoBaseUrl"})
    const {data: icNocsData, isValidating: isFetchingIcNocs, isSettled: isIcNocsFetched } = useGetSystemConfigurations({name: "ImageCarouselNOCs"})


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
            setImageCarouselNocs(icNocsData.value.split(','))  
        }
    }, [isFetchingIcNocs, isIcNocsFetched])

    useEffect(() => {
        setCarouselImagesPath(imageCarouselNocs.map(noc => bgIPathData.value + getBackgroundImageName(noc)))
    }, [imageCarouselNocs])
   
    function getBackgroundImageName(noc: string):string {
        return noc + "-NOC-" + "background.png"
    }
    
    function getProfileImageName(noc: string):string {
        return noc + "-NOC-" + "profile.png"
    }
   
    function handlePrintEvent() {
        console.log(' Print profile ')
    }

    function handleEmailEvent() {
        console.log(' Email profile ')
    }

    return (
        <div className="container">
            <Row>
                <Col span={16}>
                    <h3>
                        Displaying <b> {filteredOccupationsList?.length} results </b>
                    </h3>
                </Col>
                <Col span={8}>
                    <Button icon={<PrinterOutlined />} onClick={handlePrintEvent} block> Print </Button>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    Compare upto 3 careers by selecting the checkboxes in the table and clicking on Compare careers
                </Col>
                <Col span={8}>
                    <Button icon={<MailOutlined />} onClick={handleEmailEvent} block> Email </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={24} lg={16}>
                    {   (<ResultsTable/>) }
                </Col>
                {(!selectedNoc || selectedNoc === "default") && (   // Carousel code can be removed if not used at anytime in future
                   <Col span={8}>
                       <h2>Please select a career to preview</h2>
                        <Carousel autoplay>
                            <div>
                                <img src={carouselImagesPath[0]} alt={carouselImagesPath[0]} style={{height: '500px'}}/>
                            </div>
                            <div>
                                <img src={carouselImagesPath[1]} alt={carouselImagesPath[1]} style={{height: '500px'}}/>
                            </div>
                            <div>
                                <img src={carouselImagesPath[2]} alt={carouselImagesPath[2]} style={{height: '500px'}}/>
                            </div>
                        </Carousel>
                   </Col>)
               }
                {selectedNoc!=="default" && filteredOccupationsList && filteredOccupationsList?.length >= 0 &&
                (<Col xs={24} lg={8}>
                    <div className="result-detail">
                        <div className="result-detail__header">
                            {occupationDetail?.title} <span className="result-detail__header--noc">(NOC {occupationDetail?.noc})</span>
                        </div> 
                        <div className="result-detail__thumbnail"><img src={profileImagesPath} alt='career profile pic'/></div>
                        <div className="result-detail__body result-body">
                            <div className="result-body__row">
                                <div className="result-body__row-left">Annual Salary</div>
                                <div className="result-body__row-right"><b>{occupationDetail?.income}</b></div>
                            </div>
                            <div className="result-body__row">
                                <div className="result-body__row-left"> EducationLevel </div>
                                <div className="result-body__row-right"><b>{occupationDetail?.education.value}</b></div>
                            </div>
                            <div className="result-body__row result-body__row--last">
                                <div className="result-body__row-left">Job Openings (2019 - 2029) </div>
                                <div className="result-body__row-right"><b>{occupationDetail?.jobOpenings}</b></div>
                            </div>
                            <div className="result-body__row result-body__row--last">
                                <div>
                                    <Ellipsis length={250} tooltip>{occupationDetail?.description}</Ellipsis>
                                </div>
                            </div>
                        </div>
                        <div className="result-detail__footer">                            
                            <a href={careerProfileUrl} target="_blank"> 
                                <Button type="primary" block>
                                    View Career Profile
                                </Button>
                            </a>                    
                            <a href={viewJobsUrl} target="_blank">
                                <Button block>
                                    Find Jobs
                                </Button>
                            </a>                          
                        </div>
                    </div>
                </Col>)}
            </Row>
            <Row style={{margin: '24px 0px'}}>
                <Col span={4} offset={9}>
                    <Button disabled={checkedNocs.length < 1} onClick={() => setCheckedNocs([])}> Clear Careers</Button>
                </Col>
                <Col span={4}>
                    <Button disabled={checkedNocs.length < 2} onClick={() => setShowCompareView(true)}> Compare Careers</Button>
                </Col>
            </Row>
        </div>
    );
}

export default results;
