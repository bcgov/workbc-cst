import React, { FunctionComponent } from 'react'
import { Row, Col, Button } from 'antd'
import { MailOutlined , PrinterOutlined, BulbOutlined } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import ResultsTable from './table'
import CareerPreview from './careerPreview'
import useWindowSize from '../client/useWindowSize'

const results: FunctionComponent = () => {
    const { filteredOccupationsList, selectedNoc, checkedNocs, setView, setCheckedNocs } = useFilterContext()
    const [width] = useWindowSize()

    function isMobile() {
        return width < 1024
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
                    <Row>
                        <Col span={16}>
                            <h3>
                                Displaying <b> {filteredOccupationsList?.length} results </b>
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        {filteredOccupationsList.length > 1 && (
                            <div>
                                <span><BulbOutlined /></span>
                                Compare upto 3 careers by selecting the checkboxes in the table and clicking on Compare careers
                            </div>
                        )}
                        </Col>
                        <Col span={8} offset={2}>
                        {filteredOccupationsList.length > 1 && (
                            <div>
                                <Button onClick={() => setCheckedNocs([])} style={{margin: '0px 16px'}}> Clear Compare</Button>
                                <Button className="compare__button" onClick={() => setView('compareCareers')}> Compare Careers</Button>
                            </div>
                        )}
                        </Col>
                        <Col span={1} offset={4}>
                            <div style={{display: 'flex'}}>
                                <PrinterOutlined onClick={handlePrintEvent} style={{fontSize: '32px', padding:'0px 16px'}}/>
                                <MailOutlined onClick={handleEmailEvent} style={{fontSize: '32px'}}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} lg={16}>
                            {(<ResultsTable/>)}
                        </Col>
                        {selectedNoc!=="default" && filteredOccupationsList && filteredOccupationsList?.length >= 0 &&
                        (<Col xs={24} lg={8}>
                            {!isMobile() && (<CareerPreview/>)}
                        </Col>)}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default results;
