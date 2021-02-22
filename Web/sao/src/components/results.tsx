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
                    {filteredOccupationsList.length > 1 && (
                        <div>
                            <span><BulbOutlined /></span>
                            Compare upto 3 careers by selecting the checkboxes in the table and clicking on Compare careers
                        </div>
                    )}
                </Col>
                <Col span={3} offset={1}>
                    {filteredOccupationsList.length > 1 && (<Button disabled={checkedNocs.length < 1} onClick={() => setCheckedNocs([])}> Clear Compare</Button>)}
                </Col>
                <Col span={3} offset={1}>
                    {filteredOccupationsList.length > 1 && (<Button  type="primary" disabled={checkedNocs.length < 2} onClick={() => setView('compareCareers')}> Compare Careers</Button>)}
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
                    {!isMobile() && (<CareerPreview/>)}
                </Col>)}
            </Row>
        </div>
    );

}

export default results;
