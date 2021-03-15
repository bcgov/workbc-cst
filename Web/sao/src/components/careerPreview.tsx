import React, {FunctionComponent, useState, useEffect} from 'react'
import {Button, Tooltip} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import { OccupationSummary } from '../client/dataTypes'
import { useGetOccupationSummary, useGetSystemConfigurations } from '../client/apiService'
import YouTube from 'react-youtube';
import useWindowSize from '../client/useWindowSize'
import { format, getHeaderTitle, titleLength, removeTags} from '../client/filtersData'
import MediaLinks from './mediaLinks'
import { MailIcon, PrinterIcon } from './customIcons'

const WorkBCLogo = require('../images/workbc-header-logo.svg')

const CareerPreview: FunctionComponent = () => {
    const {filteredOccupationsList, selectedNoc, setSelectedNoc, setView, setReturnToResults} = useFilterContext()

    const [careerDetail, setCareerDetail] = useState<OccupationSummary>()
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

    const {data: occupationSummary, isValidating: isFetchingSummary, isSettled: isSummaryFetched} = useGetOccupationSummary(selectedNoc)

    useEffect(() => {
        if(occupationSummary) setCareerDetail(occupationSummary[0])
        }, [selectedNoc, isFetchingSummary, isSummaryFetched])

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
    
    function getProfileImageName(noc: string):string {
        return noc + "-NOC-" + "profile.png"
    }

    function _onReady(event) {
        event.target.pauseVideo();
    }

    function handlePrintEvent() {
        print();
    }

    function _getCareer() {
        return '?careerPreview?' + encodeURIComponent(selectedNoc)
    }

    function handleEmailEvent() {
        let link_to_sao = 'The selected career is available on WorkBC at :' +  window.location.href + _getCareer()
        let message_text = 'Get all the details you need about the career, from job duties and wages to projected demand in your region. '
        
        let link = "mailto:"
        + "&subject=" + encodeURIComponent("Search all occupations")
        + "&body=" + encodeURIComponent(link_to_sao + '\n' + message_text);

        window.location.href = link;
    }


    function getCareerDetail(careerObj: OccupationSummary) {
        return (
            <div className="result-detail">
                <div className="result-detail__printtitle">
                    Career Preview
                </div>

                <div className="result-detail__header">
                    {getHeaderTitle(careerObj).length > titleLength && !isMobile() && (
                        <div>
                            <Tooltip trigger={'hover'} 
                                overlayClassName="result-detail__header-tooltip" 
                                title={(<div>{careerObj.title} (NOC {careerObj.noc})</div>)} 
                                placement="bottom">
                                <div className="result-detail__header-details result-detail__header-details-ellipsis">
                                    <b>{getHeaderTitle(careerObj)?.title}</b> {getHeaderTitle(careerObj)?.code}
                                </div>
                            </Tooltip>
                            <div className="result-detail__header-details-print">
                                <b>{careerObj.title}</b>  (NOC {careerObj.noc})
                            </div>
                        </div>
                    )}
                    {getHeaderTitle(careerObj)?.length <= titleLength && !isMobile() && (
                        <div className="result-detail__header-details">
                            <b>{getHeaderTitle(careerObj)?.title}</b> {getHeaderTitle(careerObj)?.code}
                        </div>
                    )}
                    {!!isMobile() && (
                        <div className="result-detail__header-details">
                            <b>{careerObj.title}</b>  (NOC {careerObj.noc})
                        </div>
                    )}
                </div>
                <div  className="result-detail__thumbnail__preview">
                    {(careerObj.careertrekvideoids.length === 0) ? (<img src={profileImagesPath+getProfileImageName(careerObj.noc)} alt='career profile pic'/>)
                : (<YouTube videoId={careerObj.careertrekvideoids[0]} onReady={_onReady} opts={{playerVars: {rel: 0}}}/>)}
                </div>
                <div className="result-detail__body result-body">
                    <div className="result-body__row">
                        <div className="result-body__row-left">Annual Salary</div>
                        <div className="result-body__row-right"><b>{careerObj.income}</b></div>
                    </div>
                    <div className="result-body__row">
                        <div className="result-body__row-left">Education Level</div>
                        <div className="result-body__row-right"><b>{careerObj.education.value}</b></div>
                    </div>
                    <div className="result-body__row result-body__row--last">
                        <div className="result-body__row-left">Job Openings <span>(2019-2029)</span></div>
                        <div className="result-body__row-right"><b>{format(careerObj.jobOpenings)}</b></div>
                    </div>
                    <div className="result-body__row result-body__row--last">
                        <div>
                            {removeTags(careerObj.description).display_text}
                            {
                                removeTags(careerObj.description).remaining_text.length > 0  && (
                                    <span className="result-body__row-ellipsis">...</span>
                                )
                            }
                            <span className="result-body__row-description">
                                {removeTags(careerObj.description).remaining_text}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="result-detail__footer">                            
                    <div className="result-detail__footer__button-box">
                       <div style={{marginRight: '10px'}}>
                            <a href={careerProfileUrl+careerObj.noc} target="_blank" rel="noreferrer"> 
                                <Button type="primary" className="result-detail__footer__button-box__career" block>
                                    View Career Profile
                                </Button>
                            </a>  
                        </div>                  
                        <div>
                            <a href={viewJobsUrl+careerObj.jobBoardNoc} target="_blank" rel="noreferrer">
                                <Button className="result-detail__footer__button-box__jobs" block>
                                    Find Jobs
                                </Button>
                            </a>  
                        </div>
                    </div>                        
                </div>
            </div>
        )
    }
    return (<div className="preview-career"> 
            { !!isMobile() && (
                <div className="header__logo">
                    <a href="https://www.workbc.ca" target="_blank" rel="noreferrer">
                        <img className="header__logo--img" src={WorkBCLogo} alt="Work BC" />
                    </a>
                </div>
            )}
            { !!isMobile() && (<div className="back-to-home" >
                <div className="back-to-home-link">
                    <span><LeftOutlined/></span>
                    <a onClick={() => {setView('results'); setReturnToResults(true);}}> Back to Search Results </a>
                </div>
            </div>)} 
            { !!isMobile() && (
                <div className="preview-career__header">
                    <div>Career Preview</div>
                    <div className="preview-career__header-icons">
                        <div>
                            <span role="img" onClick={handlePrintEvent} aria-label="printer" tabindex="-1" class="anticon anticon-printer with-hover" style={{fontSize: '32px', color: "#355992", margin: '0 0.5rem'}}>
                                <PrinterIcon />
                            </span>
                        </div>
                        <div>
                            <span role="img" onClick={handleEmailEvent} aria-label="mail" tabindex="-1" class="anticon anticon-mail with-hover" style={{fontSize: '32px', color: "#355992", margin: '0 0.5rem'}}>
                                <MailIcon />
                            </span>
                        </div>
                    </div>
                </div>
            )}
            { !!careerDetail && filteredOccupationsList.length > 0 && getCareerDetail(careerDetail)} 
            { !!isMobile() && (<div className="preview-career-endcap"> </div>)} 
            { !!isMobile() && (<MediaLinks />)} 
        </div>)
}

export default CareerPreview