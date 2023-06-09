import React, { FunctionComponent, useState, useEffect } from 'react'
import { Row, Col, Button, Popover } from 'antd'
import { useFilterContext } from '../state/filterContext'
import ResultsTable from './table'
import CareerPreview from './careerPreview'
import useWindowSize from '../client/useWindowSize'
import { MailIcon, PrinterIcon } from './customIcons'

const lightBulb = require("../images/lightbulb.svg") as string;

const results: FunctionComponent = () => {
    const { filterOption, listSize, filteredOccupationsList, selectedNoc, checkedNocs, 
        isFetchingOccupationList, setScrollPosition, setView, setCheckedNocs } = useFilterContext()
    const [width] = useWindowSize()
    const [emailParams, setEmailParams] = useState('')

    useEffect(() => {
        setEmailParams(_getParams())
    },[filterOption, selectedNoc])

    function isMobile() {
        return width < 1200
    }

    function handlePrintEvent() {
        window.snowplow('trackSelfDescribingEvent', {"schema":"iglu:ca.bc.gov.workbc/career_search_click/jsonschema/1-0-0",
            "data": {
                "click_type": "print",
                "source": "search"
            }
        });
        print();
    }

    function _getParams() : string {
       return   '?results?' + 'region='  + encodeURIComponent(filterOption.region.id.toString()+ ':' + filterOption.region.value) + '&' +
                'education=' + encodeURIComponent(filterOption.education.id.toString() + ':' + filterOption.education.value) + '&' +
                'occupational_interest=' + encodeURIComponent(filterOption.occupational_interest.id.toString() + ':' + filterOption.occupational_interest.value) + '&' +
                'industry=' + encodeURIComponent(filterOption.industry.id.toString() + ':' + filterOption.industry.value) + '&' +
                'occupational_group=' + encodeURIComponent(filterOption.occupational_group.id.toString() + ':' + filterOption.occupational_group.value) + '&' +
                'part_time_option=' + encodeURIComponent(filterOption.part_time_option.id.toString() + ':' + filterOption.part_time_option.value) + '&' +
                'annual_salary=' + encodeURIComponent(filterOption.annual_salary.id.toString() + ':' + filterOption.annual_salary.value) + '&' +
                'keyword=' + encodeURIComponent(filterOption.keyword) + '&' +
                'selectedNoc=' + encodeURIComponent(selectedNoc)
    }

    function handleEmailEvent() {
        let link_to_sao = 'View the list of careers that match your search criteria: ' +  window.location.href + emailParams + '\n\nWorkBC’s Career Search Tool helps you learn about career options in B.C.'
        let link = `mailto:?subject=${encodeURIComponent('WorkBC’s Career Search Tool – Search Results')}
        &body=${encodeURIComponent(link_to_sao)}`
        window.location.href = link;
        window.snowplow('trackSelfDescribingEvent', {"schema":"iglu:ca.bc.gov.workbc/career_search_click/jsonschema/1-0-0",
            "data": {
                "click_type": "email",
                "source": "search"
            }
        });
    }

    function handleCompareCareers() {    
        const tableBody = document.querySelector(".results-table .ant-table-body")
        !!tableBody? setScrollPosition( tableBody.scrollTop) : setScrollPosition(0)
        setView('compareCareers')
        window.snowplow('trackSelfDescribingEvent', {"schema":"iglu:ca.bc.gov.workbc/compare_careers/jsonschema/1-0-0",
            "data": {
                "action": "compare",
                "noc_1": checkedNocs[0],
                "noc_2": checkedNocs[1],
                "noc_3": checkedNocs[2] === 'undefined' ? null :  checkedNocs[2]
            }
        });        
    }

    function handleClear() {    
        setCheckedNocs([]); 
        setScrollPosition(0);
        window.snowplow('trackSelfDescribingEvent', {"schema":"iglu:ca.bc.gov.workbc/compare_careers/jsonschema/1-0-0",
            "data": {
                "action": "clear",
                "noc_1": checkedNocs[0],
                "noc_2": checkedNocs[1] === 'undefined' ? null :  checkedNocs[1],
                "noc_3": checkedNocs[2] === 'undefined' ? null :  checkedNocs[2]
            }
        });
    }

    return (
        <div className="container">
            <Row className="results-wrapper">
                <Col span={24}>
                    <Row className="results-header">
                        <Col span={24}>
                            <div className="results-header__printtitle">
                                Search Results
                            </div>
                            <div className="results-header__text">
                               { !isMobile() && !isFetchingOccupationList && filteredOccupationsList?.length !== 1 && (
                                   <span>
                                       Displaying {filteredOccupationsList?.length} results.
                                   </span>
                               )}
                               { !isMobile() && !isFetchingOccupationList && filteredOccupationsList?.length === 1 && (
                                   <span>
                                       Displaying {filteredOccupationsList?.length} result.
                                   </span>
                               )}
                               { !!isMobile() && !isFetchingOccupationList && filteredOccupationsList.length === 1 && (
                                   <span>
                                       Displaying {listSize} result.
                                   </span>
                               )}
                                { !!isMobile() && !isFetchingOccupationList && filteredOccupationsList.length === 0 && (
                                   <span>
                                       Displaying {listSize} results.
                                   </span>
                               )}
                               { !!isMobile() && !isFetchingOccupationList && filteredOccupationsList.length > 1 && (
                                   <span>
                                       Displaying {listSize} of {filteredOccupationsList?.length} results.
                                   </span>
                               )}
                            </div>
                        </Col>
                    </Row>
                    <Row className="results-compare">
                        <Col className="compare-description" xs={24} xl={9}>
                        {!!isMobile() && filteredOccupationsList.length >= 1 && (
                            <div className="compare-description__flexbox" style={{marginBottom: '16px'}}>
                                <span role="img" aria-label="bulb" className="anticon anticon-bulb compare-description__flexbox__icon">
                                    <img src={lightBulb} alt="Bulb Icon" className="compare-description__flexbox__icon" />
                                </span>
                                <div style={{fontSize: '14px', paddingLeft: '16px'}}>
                                    Choose a career name from the table below to <b>preview information.</b>
                                </div>                                  
                            </div>
                        )}
                        {filteredOccupationsList.length > 1 && (
                            <div className="compare-description__flexbox">
                                <span role="img" aria-label="bulb" className="anticon anticon-bulb compare-description__flexbox__icon">
                                    <img src={lightBulb} alt="Bulb Icon" className="compare-description__flexbox__icon" />
                                </span>
                                <div style={{fontSize: '14px', paddingLeft: '16px'}}>
                                    <b>Compare up to three careers </b>
                                    by selecting the checkboxes in the table below and clicking on the <i>Compare Careers</i> button.
                                </div>                                  
                            </div>
                        )}
                        </Col>
                        <Col className="compare-buttons" xl={7}>
                        {filteredOccupationsList.length > 1 && (
                            <div>
                                <Button className="compare-buttons__clear" disabled={checkedNocs.length < 1} onClick={handleClear} > Clear Compare</Button>
                                <Button type="primary" className="compare-buttons__compare" disabled={checkedNocs.length < 2} onClick={handleCompareCareers}> Compare Careers</Button>
                            </div>
                        )}
                        </Col>
                        <Col className="print-email-buttons popover-buttons" xl={8}>
                            <Popover placement="bottomRight" content={"Print"} trigger="hover" overlayClassName="popover-buttons__popover-inner">
                                <span>
                                    <span role="img" onClick={handlePrintEvent} aria-label="printer" tabIndex={-1} className="anticon anticon-printer" style={{fontSize: '32px', color: "#355992"}}>
                                        <PrinterIcon />
                                    </span>
                                </span>
                            </Popover>                                   

                            <Popover placement="bottomRight" content={"Email"} trigger="hover" overlayClassName="popover-buttons__popover-inner">
                                <span>
                                    <span role="img" onClick={handleEmailEvent} aria-label="mail" tabIndex={-1} className="anticon anticon-mail" style={{fontSize: '32px', color: "#355992"}}>
                                        <MailIcon />
                                    </span>
                                </span>
                            </Popover>                                   
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} xl={16}>
                            {(<ResultsTable/>)}
                        </Col>
                        {selectedNoc!=="default" && filteredOccupationsList && filteredOccupationsList?.length >= 0 &&
                        (<Col xs={24} xl={8}>
                            {!isMobile() && (<CareerPreview/>)}
                        </Col>)}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default results;
