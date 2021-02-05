import { Col, Select, Button, Popover } from 'antd'
import { SelectProps } from 'antd/lib/select'
import React, { FunctionComponent } from 'react'
import { WbComponentProps } from './wbComponentProps'
import WarningIcon from './wbWarningIcon'
// import '../styles/select.scss'

interface OwnProps {
    maxWidth?: number
    minWidth?: number
    // titleColSpan?: number
    // onInfoClick?: () => void
}
  
export type WbSelectProps = WbComponentProps & OwnProps & SelectProps<string | number>

const WbSelect: FunctionComponent<WbSelectProps> = ({
    children,
    colOffset,
    colSpan,
    errorText,
    isLightTitle = false,
    noForm,
    maxWidth,
    minWidth,
    // onInfoClick,
    // titleColSpan,
    warningText,
    ...rest
  }) => {
    const textToShow = errorText ?? warningText
    const messageType: string = errorText? 'error' : 'warning'

    return (
      <>
        <Col offset={colOffset} span={colSpan}>
          <div className="select__container">
            <Select className="select__select" {...rest}>
                {children}
            </Select>
            {textToShow && (
              <Popover content={<span>{textToShow}</span>}>
                <Button className="select__button">
                  <WarningIcon className="select__warning-icon" messageType={messageType} size="small" />
                </Button>
              </Popover>
            )}
          </div>
        </Col>
      </>
    )
  }

  export default WbSelect