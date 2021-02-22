import React, { FunctionComponent } from 'react'
import { Row, Col, Button } from 'antd'
import { MailOutlined , PrinterOutlined, BulbOutlined } from '@ant-design/icons'
import { useFilterContext } from '../state/filterContext'
import ResultsTable from './table'
import CareerPreview from './careerPreview'

const results: FunctionComponent = () => {
    const { filteredOccupationsList, selectedNoc, checkedNocs, setShowCompareView, setCheckedNocs } = useFilterContext()

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
                        <Col span={8}>
                            <Button icon={<PrinterOutlined />} onClick={handlePrintEvent} block> Print </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <span><BulbOutlined /></span>Compare upto 3 careers by selecting the checkboxes in the table and clicking on Compare careers
                        </Col>
                        <Col span={3} offset={1}>
                            <Button disabled={checkedNocs.length < 1} onClick={() => setCheckedNocs([])}> Clear Compare</Button>
                        </Col>
                        <Col span={3} offset={1}>
                            <Button  type="primary" disabled={checkedNocs.length < 2} onClick={() => setShowCompareView(true)}> Compare Careers</Button>
                        </Col>
                        <Col span={8}>
                            <Button icon={<MailOutlined />} onClick={handleEmailEvent} block> Email </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} lg={16}>
                            {(<ResultsTable/>)}
                        </Col>
                        {selectedNoc!=="default" && filteredOccupationsList && filteredOccupationsList?.length >= 0 &&
                        (<Col xs={24} lg={8}>
                        {(<CareerPreview/>)}
                        </Col>)}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default results;
