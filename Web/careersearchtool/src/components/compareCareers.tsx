import React, {FunctionComponent, useState, useEffect} from 'react'
import {Button, Row, Col, Tooltip, Popover} from 'antd'
import { useFilterContext } from '../state/filterContext'
import {OccupationSummaryObj} from '../client/dataTypes'
import {useGetOccupationSummary, useGetSystemConfigurations} from '../client/apiService'
import YouTube from 'react-youtube';
import { LeftOutlined  } from '@ant-design/icons'
import useWindowSize from '../client/useWindowSize'
import { format, getHeaderTitle, titleLength, removeTags } from '../client/filtersData'
import MediaLinks from './mediaLinks'
import { MailIcon, PrinterIcon } from './customIcons'

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
    const [emailParams, setEmailParams] = useState('')

    function isMobile() {
        return width < 1200
    }
    
    useEffect(() => {
        setEmailParams(_getCareers())
    },[])

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
    
    function findJobsClickAnalytic(url, noc){
        window.snowplow('trackSelfDescribingEvent', {"schema":"iglu:ca.bc.gov.workbc/career_search_click/jsonschema/1-0-0",
            "data": {
            "click_type": "find_jobs",
            "source": "compare",
            "text": noc,
            "url": url+noc
            }
      });
    }

    function getCareerDetail(careerObj: OccupationSummaryObj) {
        return (
            <div className="result-detail result-detail--compare">
                <div className="result-detail__header">
                    {getHeaderTitle(careerObj.careerDetail).length > titleLength && !isMobile() && (
                            <div>
                                <Tooltip trigger={'hover'} 
                                    overlayClassName="result-detail__header-tooltip" 
                                    title={(<div>{careerObj.careerDetail.title} (NOC {careerObj.careerDetail.noc})</div>)} 
                                    placement="bottom">
                                    <div className="result-detail__header-details result-detail__header-details-ellipsis">
                                        <b>{getHeaderTitle(careerObj.careerDetail)?.title}</b> {getHeaderTitle(careerObj.careerDetail)?.code}
                                    </div>
                                </Tooltip>
                                <div className="result-detail__header-details-print">
                                    <b>{careerObj.careerDetail?.title}</b>  (NOC {careerObj.careerDetail?.noc})
                                </div>
                            </div>
                        )}
                    {getHeaderTitle(careerObj.careerDetail)?.length <= titleLength && !isMobile() && (
                        <div className="result-detail__header-details">
                            <b>{getHeaderTitle(careerObj.careerDetail)?.title}</b> {getHeaderTitle(careerObj.careerDetail)?.code}
                        </div>
                    )}
                    {!!isMobile() && (
                        <div className="result-detail__header-details">
                            <b>{careerObj.careerDetail.title}</b>  (NOC {careerObj.careerDetail.noc})
                        </div>
                    )}
                </div>
                <div  className="result-detail__thumbnail">
                    {(careerObj.careerDetail?.careertrekvideoids.length === 0) ? (<img src={profileImagesPath+getProfileImageName(careerObj.nocId)} alt='career profile pic'/>)
                    : (<YouTube videoId={careerObj.careerDetail?.careertrekvideoids[0]} opts={{height: '315', width: '420', playerVars: {rel: 0}}} onReady={_onReady} />)}
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
                        <div className="result-body__row-left">Job Openings <span>(2019-2029)</span></div>
                        <div className="result-body__row-right"><b>{format(careerObj.careerDetail?.jobOpenings)}</b></div>
                    </div>
                    <div className="result-body__row result-body__row--last">
                       <div>
                            {removeTags(careerObj.careerDetail?.description).display_text}
                            {
                                removeTags(careerObj.careerDetail?.description).remaining_text.length > 0  && (
                                    <span className="result-body__row-ellipsis">...</span>
                                )
                            }
                            <span className="result-body__row-description">
                                {removeTags(careerObj.careerDetail?.description).remaining_text}
                            </span>  
                        </div>                 
                    </div>
                </div>
                <div className="result-detail__footer">                            
                    <div className="result-detail__footer__button-box">
                       <div style={{marginRight: '10px'}}>
                            <a href={careerProfileUrl+careerObj.careerDetail?.noc} target="_blank" rel="noreferrer"> 
                                <Button type="primary" className="result-detail__footer__button-box__career" block>
                                    View Career Profile
                                </Button>
                            </a>
                        </div>                  
                        <div>
                            <a href={viewJobsUrl+careerObj.careerDetail?.jobBoardNoc} onClick={() => findJobsClickAnalytic(viewJobsUrl, careerObj.jobBoardNoc)} target="_blank" rel="noreferrer">
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

    function handlePrintEvent() {
        print();
    }

    function _getCareers() {
        return '?compare?' + encodeURIComponent(checkedNocs.map(noc => noc.toString()).join())
    }

    function handleEmailEvent() {
        let link_to_sao = 'The compared careers are available on WorkBC at: \n' +  window.location.href + emailParams
        let link = `mailto:?subject=${encodeURIComponent('Career Search Tool')}&body=${encodeURIComponent(link_to_sao)}`

        window.location.href = link;
    }

    return (
        <div>
            <div className="compare-container-header">
                <div className="header__logo">
                    <a href="https://www.workbc.ca" target="_blank" rel="noreferrer">
                        <img className="header__logo--img" src={WorkBCLogo} alt="Work BC" />
                    </a>
                </div>
                <div className="back-to-home" >
                    <div className="back-to-home-link">
                        <span><LeftOutlined/></span>
                        <a onClick={() => {setView('results'); setReturnToResults(true)}}> Back to Search Results </a>
                    </div>
                </div>
            </div>

            <div className="compare-container__title compare-container__title--printonly print-only">Career Search Tool</div>
            <div className="container compare-container">
                <div className="compare-container__title">
                    <div>Compare Careers</div>
                    <div className="compare-container__title__icons popover-buttons">
                        <Popover placement="bottomRight" content={"Print Results"} trigger="hover" overlayClassName="popover-buttons__popover-inner">
                            <span>
                                <span role="img" onClick={handlePrintEvent} aria-label="printer" tabIndex={-1} className="anticon anticon-printer" style={{fontSize: '32px', color: "#355992"}}>
                                    <PrinterIcon />
                                </span>
                            </span>
                        </Popover>                                   

                        <Popover placement="bottomRight" content={"Email Results"} trigger="hover" overlayClassName="popover-buttons__popover-inner">
                            <span>
                                <span role="img" onClick={handleEmailEvent} aria-label="mail" tabIndex={-1} className="anticon anticon-mail" style={{fontSize: '32px', color: "#355992"}}>
                                    <MailIcon />
                                </span>
                            </span>
                        </Popover>                                   
                    </div>
                </div>
                
                {
                    !isFetchingPIPath && isPiPathFetched && piPathData &&  profileImagesPath && 
                    !isFetchingCPUrl && isCPUrlFetched && CPUrlData && careerProfileUrl &&
                    !isFetchingJOUrl && isJOUrlFetched && JOUrlData && viewJobsUrl && careerDetail.length > 1 && (
                        <Row className={careerDetail.length <= 2 ? 'compare-careers compare-careers--center' : "compare-careers"}>
                            <Col xs={24} md={16} xl={8}>
                                {getCareerDetail(careerDetail[0])}
                            </Col>
                            <Col xs={24} md={16} xl={8}>
                                {getCareerDetail(careerDetail[1])}
                            </Col>
                            {
                                !!careerDetail[2] && (
                                    <Col xs={24} md={16} xl={8}>
                                        {getCareerDetail(careerDetail[2])}
                                    </Col>
                                )
                            }
                        </Row>
                    )
                }
            </div>
            <MediaLinks />
        </div>
    )
}

export default CompareCareers