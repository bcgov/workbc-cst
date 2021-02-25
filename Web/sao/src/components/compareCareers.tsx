import React, {FunctionComponent, useState, useEffect} from 'react'
import {Button, Row, Col} from 'antd'
import {CloseOutlined, MailFilled , PrinterFilled } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import {OccupationSummaryObj} from '../client/dataTypes'
import {useGetOccupationSummary, useGetSystemConfigurations} from '../client/apiService'
import YouTube from 'react-youtube';
import { LeftOutlined  } from '@ant-design/icons'
import useWindowSize from '../client/useWindowSize'

const CompareCareers: FunctionComponent = () => {
    const {setView, checkedNocs} = useFilterContext()

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

    function getCareerDetail(careerObj: OccupationSummaryObj) {
        return (
            <div className="result-detail">
                <div className="result-detail__header">{careerObj.careerDetail.title} <span>(NOC {careerObj.nocId})</span></div>
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
                        <div className="result-body__row-left"> EducationLevel </div>
                        <div className="result-body__row-right"><b>{careerObj.careerDetail?.education.value}</b></div>
                    </div>
                    <div className="result-body__row result-body__row--last">
                        <div className="result-body__row-left">Job Openings (2019 - 2029) </div>
                        <div className="result-body__row-right"><b>{careerObj.careerDetail?.jobOpenings}</b></div>
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
        <div>
            { !!isMobile() && (<Button type="link" onClick={() => setView('results')}>
                <span><LeftOutlined/></span>
                Back to search results
                </Button>)
            } 
            <h1>Compare Careers 
                <span style={{float: 'right'}}>
                    <PrinterFilled style={{color: "#355992"}}/>
                    <MailFilled style={{color: "#355992"}}/>
                    {!isMobile() && ( <CloseOutlined style={{color: "#355992"}}  onClick={()=> setView('results')}/> )}
                </span>
            </h1>
            {
                !isFetchingPIPath && isPiPathFetched && piPathData &&  profileImagesPath && 
                !isFetchingCPUrl && isCPUrlFetched && CPUrlData && careerProfileUrl &&
                !isFetchingJOUrl && isJOUrlFetched && JOUrlData && viewJobsUrl && careerDetail.length > 1 && (
                    <Row>
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