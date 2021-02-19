import React, {FunctionComponent, useState, useEffect} from 'react'
import {Button} from 'antd'
import { useFilterContext } from '../state/filterContext'
import {OccupationSummary} from '../client/dataTypes'
import {useGetOccupationSummary, useGetSystemConfigurations} from '../client/apiService'
import YouTube from 'react-youtube';

const CareerPreview: FunctionComponent = () => {
    const {filteredOccupationsList, selectedNoc, setSelectedNoc} = useFilterContext()

    const [careerDetail, setCareerDetail] = useState<OccupationSummary>()
    const [profileImagesPath, setProfileImagesPath] = useState<string>()
    const [careerProfileUrl, setCareerProfileUrl] = useState<string>()
    const [viewJobsUrl, setViewJobsUrl] = useState<string>()

    const {data: piPathData, isValidating: isFetchingPIPath, isSettled: isPiPathFetched } = useGetSystemConfigurations({name: "ProfileImagesPath"})
    const {data: CPUrlData, isValidating: isFetchingCPUrl, isSettled: isCPUrlFetched } = useGetSystemConfigurations({name: "CareerProfileBaseUrl"})
    const {data: JOUrlData, isValidating: isFetchingJOUrl, isSettled: isJOUrlFetched } = useGetSystemConfigurations({name: "JobOpeningsBaseUrl"})
    
    useEffect(() => {
        setSelectedNoc(filteredOccupationsList[0]?.noc)
    }, [filteredOccupationsList])
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

    function getCareerDetail(careerObj: OccupationSummary) {
        return (
            <div className="result-detail">
                <div className="result-detail__header">{careerObj.title} <span>(NOC {careerObj.noc})</span></div>
                <div  className="result-detail__thumbnail">
                    {(careerObj.careertrekvideoids.length === 0) ? (<img src={profileImagesPath+getProfileImageName(careerObj.noc)} alt='career profile pic'/>)
                    : (<YouTube videoId={careerObj.careertrekvideoids[0]} opts={{height: '315', width: '420'}} onReady={_onReady} />)}
                </div>
                <div className="result-detail__body result-body">
                    <div className="result-body__row">
                        <div className="result-body__row-left">Annual Salary</div>
                        <div className="result-body__row-right"><b>{careerObj.income}</b></div>
                    </div>
                    <div className="result-body__row">
                        <div className="result-body__row-left"> EducationLevel </div>
                        <div className="result-body__row-right"><b>{careerObj.education.value}</b></div>
                    </div>
                    <div className="result-body__row result-body__row--last">
                        <div className="result-body__row-left">Job Openings (2019 - 2029) </div>
                        <div className="result-body__row-right"><b>{careerObj.jobOpenings}</b></div>
                    </div>
                    <div className="result-body__row result-body__row--last">
                        <div>{careerObj.description}</div>
                    </div>
                </div>
                <div className="result-detail__footer">                            
                    <a href={careerProfileUrl+careerObj.noc} target="_blank"> 
                        <Button type="primary" block>
                            View Career Profile
                        </Button>
                    </a>                    
                    <a href={viewJobsUrl+careerObj.noc} target="_blank">
                        <Button block>
                            Find Jobs
                        </Button>
                    </a>                          
                </div>
            </div>
        )
    }
    return (<div> { !!careerDetail && filteredOccupationsList.length > 0 && getCareerDetail(careerDetail)} </div>)
}

export default CareerPreview