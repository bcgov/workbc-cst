import React, {FunctionComponent, useState, useEffect} from 'react'
import {Button, Row, Col} from 'antd'
import {CloseOutlined, MailOutlined , PrinterOutlined } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import {OccupationSummaryObj} from '../client/dataTypes'
import {useGetOccupationSummary, useGetSystemConfigurations} from '../client/apiService'

const CompareCareers: FunctionComponent = () => {
    const {setShowCompareView, checkedNocs} = useFilterContext()

    const [careerDetail, setCareerDetail] = useState<OccupationSummaryObj[]>([])
    const [profileImagesPath, setProfileImagesPath] = useState<string>()
    const [careerProfileUrl, setCareerProfileUrl] = useState<string>()
    const [viewJobsUrl, setViewJobsUrl] = useState<string>()

    const {data: piPathData, isValidating: isFetchingPIPath, isSettled: isPiPathFetched } = useGetSystemConfigurations({name: "ProfileImagesPath"})
    const {data: CPUrlData, isValidating: isFetchingCPUrl, isSettled: isCPUrlFetched } = useGetSystemConfigurations({name: "CareerProfileBaseUrl"})
    const {data: JOUrlData, isValidating: isFetchingJOUrl, isSettled: isJOUrlFetched } = useGetSystemConfigurations({name: "JobOpeningsBaseUrl"})

    useEffect(() => {
        if(!isFetchingPIPath && isPiPathFetched && piPathData) {
            setProfileImagesPath(piPathData.value)
        }
    }, [isFetchingPIPath, isPiPathFetched])

    useEffect(() => {
        if(!isFetchingCPUrl && isCPUrlFetched && CPUrlData) {
            setCareerProfileUrl(CPUrlData.value)
        }
    }, [isFetchingCPUrl, isCPUrlFetched])

    useEffect(() => {
        if(!isFetchingJOUrl && isJOUrlFetched && JOUrlData) {
            setViewJobsUrl(JOUrlData.value)
        }
    }, [isFetchingJOUrl, isJOUrlFetched])

    checkedNocs.map(noc => {
        const {data: occupationSummary, isValidating: isFetchingSummary, isSettled: isSummaryFetched} = useGetOccupationSummary(noc)
        useEffect(() => {
            if(!isFetchingSummary && isSummaryFetched && occupationSummary) {
                setCareerDetail([...careerDetail, {nocId: occupationSummary[0].noc, careerDetail: occupationSummary[0]}])
            }
        }, [isFetchingSummary, isSummaryFetched])
    })

    function getProfileImageName(noc: string):string {
        return noc + "-NOC-" + "profile.png"
    }

    return(
        <div>
            <h1>Compare Careers 
                <span style={{float: 'right'}}>
                    <Button style={{border: 'none'}}> <PrinterOutlined/> </Button>
                    <Button style={{border: 'none'}}> <MailOutlined/> </Button>
                    <Button style={{border: 'none'}} onClick={()=> setShowCompareView(false)}> <CloseOutlined /> </Button>
                </span>
            </h1>
            {
                !isFetchingPIPath && isPiPathFetched && piPathData &&  profileImagesPath && 
                !isFetchingCPUrl && isCPUrlFetched && CPUrlData && careerProfileUrl &&
                !isFetchingJOUrl && isJOUrlFetched && JOUrlData && viewJobsUrl && careerDetail.length > 1 && (
                    <Row>
                        <Col span={8}>
                            <div className="result-detail">
                                <div className="result-detail__header">{careerDetail[0].careerDetail.title} <span>(NOC {careerDetail[0].nocId})</span></div>
                                <div  className="result-detail__thumbnail"><img src={profileImagesPath+getProfileImageName(careerDetail[0].nocId)} alt='career profile pic'/></div>
                                <div className="result-detail__body result-body">
                                    <div className="result-body__row">
                                        <div className="result-body__row-left">Annual Salary</div>
                                        <div className="result-body__row-right"><b>{careerDetail[0].careerDetail?.income}</b></div>
                                    </div>
                                    <div className="result-body__row">
                                        <div className="result-body__row-left"> EducationLevel </div>
                                        <div className="result-body__row-right"><b>{careerDetail[0].careerDetail?.education.value}</b></div>
                                    </div>
                                    <div className="result-body__row result-body__row--last">
                                        <div className="result-body__row-left">Job Openings (2019 - 2029) </div>
                                        <div className="result-body__row-right"><b>{careerDetail[0].careerDetail?.jobOpenings}</b></div>
                                    </div>
                                </div>
                                <div className="result-detail__footer">                            
                                    <a href={careerProfileUrl+careerDetail[0].nocId} target="_blank"> 
                                        <Button type="primary" block>
                                            View Career Profile
                                        </Button>
                                    </a>                    
                                    <a href={viewJobsUrl+careerDetail[0].nocId} target="_blank">
                                        <Button block>
                                            Find Jobs
                                        </Button>
                                    </a>                          
                                </div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="result-detail">
                                <div className="result-detail__header">{careerDetail[1].careerDetail.title} <span> (NOC {careerDetail[1].nocId})</span></div>
                                <div  className="result-detail__thumbnail"><img src={profileImagesPath+getProfileImageName(careerDetail[1].nocId)} alt='career profile pic'/></div>
                                <div className="result-detail__body result-body">
                                    <div className="result-body__row">
                                        <div className="result-body__row-left">Annual Salary</div>
                                        <div className="result-body__row-right"><b>{careerDetail[1].careerDetail?.income}</b></div>
                                    </div>
                                    <div className="result-body__row">
                                        <div className="result-body__row-left"> EducationLevel </div>
                                        <div className="result-body__row-right"><b>{careerDetail[1].careerDetail?.education.value}</b></div>
                                    </div>
                                    <div className="result-body__row result-body__row--last">
                                        <div className="result-body__row-left">Job Openings (2019 - 2029) </div>
                                        <div className="result-body__row-right"><b>{careerDetail[1].careerDetail?.jobOpenings}</b></div>
                                    </div>
                                </div>
                                <div className="result-detail__footer">                            
                                    <a href={careerProfileUrl+careerDetail[1].nocId} target="_blank"> 
                                        <Button type="primary" block>
                                            View Career Profile
                                        </Button>
                                    </a>                    
                                    <a href={viewJobsUrl+careerDetail[1].nocId} target="_blank">
                                        <Button block>
                                            Find Jobs
                                        </Button>
                                    </a>                          
                                </div>
                            </div>
                        </Col>
                        {
                            !!careerDetail[2] && (
                                <Col span={8}>
                                    <div className="result-detail">
                                        <div className="result-detail__header">{careerDetail[2].careerDetail.title} <span> (NOC {careerDetail[2].nocId})</span></div>
                                        <div  className="result-detail__thumbnail"><img src={profileImagesPath+getProfileImageName(careerDetail[2].nocId)} alt='career profile pic'/></div>
                                        <div className="result-detail__body result-body">
                                            <div className="result-body__row">
                                                <div className="result-body__row-left">Annual Salary</div>
                                                <div className="result-body__row-right"><b>{careerDetail[2].careerDetail?.income}</b></div>
                                            </div>
                                            <div className="result-body__row">
                                                <div className="result-body__row-left"> EducationLevel </div>
                                                <div className="result-body__row-right"><b>{careerDetail[2].careerDetail?.education.value}</b></div>
                                            </div>
                                            <div className="result-body__row result-body__row--last">
                                                <div className="result-body__row-left">Job Openings (2019 - 2029) </div>
                                                <div className="result-body__row-right"><b>{careerDetail[2].careerDetail?.jobOpenings}</b></div>
                                            </div>
                                        </div>
                                        <div className="result-detail__footer">                            
                                            <a href={careerProfileUrl+careerDetail[2].nocId} target="_blank"> 
                                                <Button type="primary" block>
                                                    View Career Profile
                                                </Button>
                                            </a>                    
                                            <a href={viewJobsUrl+careerDetail[2].nocId} target="_blank">
                                                <Button block>
                                                    Find Jobs
                                                </Button>
                                            </a>                          
                                        </div>
                                    </div>
                                </Col>
                            )
                        }
                    </Row>
                )
            }
        </div>
    )
}

export default CompareCareers