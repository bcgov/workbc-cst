import React, { FunctionComponent } from 'react'
import { Row, Col, Button, Popover } from 'antd'
import { useFilterContext } from '../state/filterContext'
import ResultsTable from './table'
import CareerPreview from './careerPreview'
import useWindowSize from '../client/useWindowSize'
import { MailIcon, PrinterIcon } from './customIcons'

const lightBulb = require("../images/lightbulb.svg") as string;

const results: FunctionComponent = () => {
    const { filterOption, listSize, filteredOccupationsList, selectedNoc, checkedNocs, setView, setCheckedNocs } = useFilterContext()
    const [width] = useWindowSize()

    function isMobile() {
        return width < 1200
    }

    function handlePrintEvent() {
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
                'Keywords=' + encodeURIComponent(filterOption.keyword) + '&' +
                'selectedNoc=' + encodeURIComponent(selectedNoc)
    }

    function handleEmailEvent() {
        let link_to_sao = 'The search results are available on WorkBC at :' +  window.location.href + _getParams()
        let message_text = ' Get all the details you need about the careers, from job duties and wages to projected demand in your region. '
        
        let link = "mailto:"
        + "&subject=" + encodeURIComponent("Search all occupations")
        + "&body=" + encodeURIComponent(link_to_sao) + '\n' + message_text;

        window.location.href = link;
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
                               { !isMobile() && (
                                   <span>
                                       Displaying <span className="highlighted-text"> {filteredOccupationsList?.length} results </span>
                                   </span>
                               )}
                               { !!isMobile() && (
                                   <span>
                                       Displaying <span className="highlighted-text"> {listSize} of {filteredOccupationsList?.length} results </span>
                                   </span>
                               )}
                            </div>
                        </Col>
                    </Row>
                    <Row className="results-compare">
                        <Col className="compare-description" xs={24} xl={9}>
                        {!!isMobile() && filteredOccupationsList.length > 1 && (
                            <div className="compare-description__flexbox" style={{marginBottom: '16px'}}>
                                <span role="img" aria-label="bulb" className="anticon anticon-bulb compare-description__flexbox__icon">
                                    <img src={lightBulb} alt="Bulb Icon" className="compare-description__flexbox__icon" />
                                </span>
                                <div style={{fontSize: '14px', paddingLeft: '16px'}}>Select a career below to find out more information.</div>                                  
                            </div>
                        )}
                        {filteredOccupationsList.length > 1 && (
                            <div className="compare-description__flexbox">
                                <span role="img" aria-label="bulb" className="anticon anticon-bulb compare-description__flexbox__icon">
                                    <img src={lightBulb} alt="Bulb Icon" className="compare-description__flexbox__icon" />
                                </span>
                                <div style={{fontSize: '14px', paddingLeft: '16px'}}>
                                    <b>Compare up to 3 careers </b>
                                    by selecting the checkboxes and clicking on the Compare Careers button.
                                </div>                                  
                            </div>
                        )}
                        </Col>
                        <Col className="compare-buttons" xl={7}>
                        {filteredOccupationsList.length > 1 && (
                            <div>
                                <Button className="compare-buttons__clear" disabled={checkedNocs.length < 1} onClick={() => setCheckedNocs([])} > Clear Compare</Button>
                                <Button type="primary" className="compare-buttons__compare" disabled={checkedNocs.length < 2} onClick={() => setView('compareCareers')}> Compare Careers</Button>
                            </div>
                        )}
                        </Col>
                        <Col className="print-email-buttons popover-buttons" xl={8}>
                            <Popover placement="bottomRight" content={"Print Results"} trigger="hover" overlayClassName="popover-buttons__popover-inner">
                                <span>
                                    <span role="img" onClick={handlePrintEvent} aria-label="printer" tabindex="-1" class="anticon anticon-printer" style={{fontSize: '32px', color: "#355992"}}>
                                        <PrinterIcon />
                                    </span>
                                </span>
                            </Popover>                                   

                            <Popover placement="bottomRight" content={"Email Results"} trigger="hover" overlayClassName="popover-buttons__popover-inner">
                                <span>
                                    <span role="img" onClick={handleEmailEvent} aria-label="mail" tabindex="-1" class="anticon anticon-mail" style={{fontSize: '32px', color: "#355992"}}>
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
