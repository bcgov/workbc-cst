import React, {FunctionComponent, useState, useEffect} from 'react'
import {Button, Row, Col, Divider} from 'antd'
import {CloseOutlined, MailFilled , PrinterFilled } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import {OccupationSummaryObj} from '../client/dataTypes'
import {useGetOccupationSummary, useGetSystemConfigurations} from '../client/apiService'
import YouTube from 'react-youtube';
import { LeftOutlined  } from '@ant-design/icons'
import useWindowSize from '../client/useWindowSize'

const WorkBCLogo = require('../images/workbc-header-logo.svg')

const CompareCareers: FunctionComponent = () => {
    const {setView, setReturnToResults, checkedNocs} = useFilterContext()

    const [careerDetail, setCareerDetail] = useState<OccupationSummaryObj[]>([])
    const [profileImagesPath, setProfileImagesPath] = useState<string>()
    const [careerProfileUrl, setCareerProfileUrl] = useState<string>()
    const [viewJobsUrl, setViewJobsUrl] = useState<string>()

    const {data: piPathData, isValidating: isFetchingPIPath, isSettled: isPiPathFetched } = useGetSystemConfigurations({name: "ProfileImagesPath"})
    const {data: CPUrlData, isValidating: isFetchingCPUrl, isSettled: isCPUrlFetched } = useGetSystemConfigurations({name: "CareerProfileBaseUrl"})
    const {data: JOUrlData, isValidating: isFetchingJOUrl, isSettled: isJOUrlFetched } = useGetSystemConfigurations({name: "JobOpeningsBaseUrl"})
    const [width] = useWindowSize()

    function isMobile() {
        return width < 1200
    }
    
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
                let newCareerDetail = [... careerDetail]
                let nocMatch = false
                newCareerDetail.forEach((career, index) => {
                    if(career.nocId === occupationSummary[0].noc) {
                        newCareerDetail[index] = {nocId: occupationSummary[0].noc, careerDetail: occupationSummary[0]}
                        nocMatch = true
                    }
                })
                if(!nocMatch) {
                     newCareerDetail = [...newCareerDetail, {nocId: occupationSummary[0].noc, careerDetail: occupationSummary[0]}]
                }
                setCareerDetail(newCareerDetail)
            }
        }, [isFetchingSummary, isSummaryFetched])
    })

    function getProfileImageName(noc: string):string {
        return noc + "-NOC-" + "profile.png"
    }

    function _onReady(event) {
        event.target.pauseVideo();
    }
    
    function format(value: number) { //add ',' for numbers with 5 digits. Note: At this point greatest value of job openings has just 5 digits
        return value?.toString().length === 5 ? value.toString().slice(0,2)+','+value.toString().slice(2,5) : value
    }

    function getCareerDetail(careerObj: OccupationSummaryObj) {
        return (
            <div className="result-detail result-detail--compare">
                <div className="result-detail__header"><div className="result-detail__header-details"> {careerObj.careerDetail.title} <span>(NOC {careerObj.nocId})</span></div></div>
                <div  className="result-detail__thumbnail">
                    {(careerObj.careerDetail?.careertrekvideoids.length === 0) ? (<img src={profileImagesPath+getProfileImageName(careerObj.nocId)} alt='career profile pic'/>)
                    : (<YouTube videoId={careerObj.careerDetail?.careertrekvideoids[0]} opts={{height: '315', width: '420'}} onReady={_onReady} />)}
                </div>
                <div className="result-detail__body result-body">
                    <div className="result-body__row">
                        <div className="result-body__row-left">Annual Salary</div>
                        <div className="result-body__row-right"><b>{careerObj.careerDetail?.income}</b></div>
                    </div>
                    <div className="result-body__row">
                        <div className="result-body__row-left"> Education Level </div>
                        <div className="result-body__row-right"><b>{careerObj.careerDetail?.education.value}</b></div>
                    </div>
                    <div className="result-body__row result-body__row--last">
                        <div className="result-body__row-left">Job Openings (2019 - 2029) </div>
                        <div className="result-body__row-right"><b>{format(careerObj.careerDetail?.jobOpenings)}</b></div>
                    </div>
                    <div className="result-body__row result-body__row--last">
                        <div>{removeTags(careerObj.careerDetail?.description)}</div>
                    </div>
                </div>
                <div className="result-detail__footer">                            
                    <div className="result-detail__footer__button-box">
                       <div style={{marginRight: '10px'}}>
                            <a href={careerProfileUrl+careerObj.careerDetail?.noc} target="_blank"> 
                                <Button type="primary" className="result-detail__footer__button-box__career" block>
                                    View Career Profile
                                </Button>
                            </a>  
                        </div>                  
                        <div>
                            <a href={viewJobsUrl+careerObj.careerDetail?.jobBoardNoc} target="_blank">
                                <Button  className="result-detail__footer__button-box__jobs" block>
                                    Find Jobs
                                </Button>
                            </a>  
                        </div>
                    </div>                           
                </div>
            </div>
        )
    }

    function removeTags(str) { 
        if ((str===null) || (str==='')) 
            return false; 
        else
            str = str.toString();
        return str.replace( /(<([^>]+)>)/ig, ''); 
    }

    return(
        <div className="container">
            <div className="header__logo">
                <a href="https://www.workbc.ca" target="_blank">
                    <img className="header__logo--img" src={WorkBCLogo} alt="Work BC" />
                </a>
            </div>

            { !!isMobile() && (<Button type="link" onClick={() => setView('results')}>
                <span><LeftOutlined/></span>
                Back to search results
                </Button>)
            } 
            <h1>Compare Careers 
                <span style={{float: 'right'}}>
                    <PrinterFilled style={{color: "#355992", margin: '0 0.5rem'}}/>
                    <MailFilled style={{color: "#355992",  margin: '0 0.5rem'}}/>
                    {!isMobile() && ( 
                        <span>
                            <Divider type="vertical" style={{height: '3.8em', marginTop: '-0.8em'}}/>
                            <CloseOutlined style={{color: "#355992", margin: '0 0.5rem'}}  onClick={()=> {setView('results');setReturnToResults(true) }}/> 
                        </span>
                    )}
                </span>
            </h1>
            {
                !isFetchingPIPath && isPiPathFetched && piPathData &&  profileImagesPath && 
                !isFetchingCPUrl && isCPUrlFetched && CPUrlData && careerProfileUrl &&
                !isFetchingJOUrl && isJOUrlFetched && JOUrlData && viewJobsUrl && careerDetail.length > 1 && (
                    <Row className={careerDetail.length <= 2 ? 'compare-careers compare-careers--center' : "compare-careers"}>
                        <Col span={8}>
                            {getCareerDetail(careerDetail[0])}
                        </Col>
                        <Col span={8}>
                            {getCareerDetail(careerDetail[1])}
                        </Col>
                        {
                            !!careerDetail[2] && (
                                <Col span={8}>
                                    {getCareerDetail(careerDetail[2])}
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