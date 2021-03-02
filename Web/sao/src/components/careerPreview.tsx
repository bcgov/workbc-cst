import React, {FunctionComponent, useState, useEffect} from 'react'
import {Button, Tooltip} from 'antd'
import { LeftOutlined  } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import {OccupationSummary} from '../client/dataTypes'
import {useGetOccupationSummary, useGetSystemConfigurations} from '../client/apiService'
import YouTube from 'react-youtube';
import useWindowSize from '../client/useWindowSize'
import { format } from '../client/filtersData'

const WorkBCLogo = require('../images/workbc-header-logo.svg')

const CareerPreview: FunctionComponent = () => {
    const {filteredOccupationsList, selectedNoc, isFilterApplied, isSorted, setSelectedNoc, setView} = useFilterContext()

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
        if(!isSorted) setSelectedNoc(filteredOccupationsList[0]?.noc)
    }, [isFilterApplied, isSorted, filteredOccupationsList])


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

    function removeTags(str) { 
        if ((str===null) || (str==='')) 
            return false; 
        else
            str = str.toString();
        return str.replace( /(<([^>]+)>)/ig, ''); 
    } 

    function getHeaderTitle(careerObj: OccupationSummary) {
        const nocTitle = careerObj.title + ' (' + ' NOC ' + careerObj.noc + ' )'
        return {length: nocTitle.length , title: nocTitle.length > 75 ? nocTitle.slice(0,75) + '...' : nocTitle}
    }

    function getCareerDetail(careerObj: OccupationSummary) {
        return (
            <div className="result-detail">
                <div className="result-detail__printtitle">
                    Career Preview
                </div>

                <div className="result-detail__header">
                    {getHeaderTitle(careerObj).length > 75 && (
                        <Tooltip trigger={'hover'} title={(<div>{careerObj.title} (NOC {careerObj.noc})</div>)} >
                            <div className="result-detail__header-details">
                                {getHeaderTitle(careerObj).title}
                            </div>
                        </Tooltip>
                    )}
                    {getHeaderTitle(careerObj).length <= 75 && (
                        <div className="result-detail__header-details">
                            {getHeaderTitle(careerObj).title}
                        </div>
                    )}
                </div>
                <div  className="result-detail__thumbnail__preview">
                    {(careerObj.careertrekvideoids.length === 0) ? (<img src={profileImagesPath+getProfileImageName(careerObj.noc)} alt='career profile pic'/>)
                    : (<YouTube  videoId={careerObj.careertrekvideoids[0]} onReady={_onReady} />)}
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
                        <div className="result-body__row-left">Job Openings <span>(2019 - 2029)</span></div>
                        <div className="result-body__row-right"><b>{format(careerObj.jobOpenings)}</b></div>
                    </div>
                    <div className="result-body__row result-body__row--last">
                        <div>{removeTags(careerObj.description)}</div>
                    </div>
                </div>
                <div className="result-detail__footer">                            
                    <div className="result-detail__footer__button-box">
                       <div style={{marginRight: '10px'}}>
                            <a href={careerProfileUrl+careerObj.noc} target="_blank"> 
                                <Button type="primary" className="result-detail__footer__button-box__career" block>
                                    View Career Profile
                                </Button>
                            </a>  
                        </div>                  
                        <div>
                            <a href={viewJobsUrl+careerObj.jobBoardNoc} target="_blank">
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
                    <a href="https://www.workbc.ca" target="_blank">
                        <img className="header__logo--img" src={WorkBCLogo} alt="Work BC" />
                    </a>
                </div>
            )}

            { !!isMobile() && (<Button type="link" onClick={() => setView('results')}>
                <span><LeftOutlined/></span>
                Back to search results
                </Button>)} 
            { !!careerDetail && filteredOccupationsList.length > 0 && getCareerDetail(careerDetail)} 
        </div>)
}

export default CareerPreview