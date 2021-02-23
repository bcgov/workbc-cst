import React, { FunctionComponent } from 'react'
import { Row, Col, Button } from 'antd'
import { MailFilled , PrinterFilled, BulbOutlined } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import ResultsTable from './table'
import CareerPreview from './careerPreview'
import useWindowSize from '../client/useWindowSize'

const results: FunctionComponent = () => {
    const { filteredOccupationsList, selectedNoc, checkedNocs, setView, setCheckedNocs } = useFilterContext()
    const [width] = useWindowSize()

    function isMobile() {
        return width < 1200
    }

    function handlePrintEvent() {
        console.log(' Print profile ')
    }

    function handleEmailEvent() {
        console.log(' Email profile ')
    }

    return (
        <div className="container">
            <Row className="results-wrapper">
                <Col span={24}>
                    <Row className="results-header">
                        <Col span={24}>
                            <div className="results-header__text">
                                Displaying <span className="highlighted-text"> {filteredOccupationsList?.length} results </span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="results-compare">
                        <Col className="compare-description" xs={24} xl={9}>
                        {filteredOccupationsList.length > 1 && (
                            <div>
                                <span><BulbOutlined /></span>
                                Compare upto 3 careers by selecting the checkboxes in the table and clicking on Compare careers
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
                        <Col className="print-email-buttons" xl={8}>
                            <div>
                                <PrinterFilled onClick={handlePrintEvent} style={{fontSize: '32px', color: "#355992" }}/>
                                <MailFilled onClick={handleEmailEvent} style={{fontSize: '32px', color: "#355992"}}/>
                            </div>
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
