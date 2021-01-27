import React, { FunctionComponent, Key } from 'react'
import { useGetFilterData } from '../API/apiService'
import { FilterType, FilterTypeModel } from '../API/dataTypes'
import WbSelect, { WbSelectProps } from './wbSelect'
import { Select } from 'antd'

interface OwnProps {
    filterType: FilterType
    showPlaceHolderAsOption: boolean
}
  
type Props = OwnProps & WbSelectProps

const SelectFilterType: FunctionComponent<Props> = ({filterType, onChange, showPlaceHolderAsOption, placeholder, ...rest}) => {
    const { data: codeTypes, isValidating, isSettled } = useGetFilterData(filterType)

    function handleChange(value: Key, options: any) {
        //console.log("on change: value = " + value)
        if (!!value) {
            let selectedCode: FilterTypeModel | undefined = codeTypes?.find((item) => item.value === value)
            if (!!selectedCode) {
                onChange?.(selectedCode.id, options)
            } else {
                onChange?.(-1, options)
            }
        } else {
            onChange?.(-1, options)
        }
    }

    return (
        <WbSelect
            style = {{width: "360px"}}
            loading={isValidating}
            showSearch={false}
            showArrow={false}
            filterOption={false}
            onChange={handleChange}
            placeholder={placeholder}
            {...rest}
        >
            {showPlaceHolderAsOption && placeholder &&
                <Select.Option key={-1} value={placeholder.toString()}>
                    {placeholder.toString()}
                </Select.Option>
            } 
            {isSettled? codeTypes?.map((code) => (
                <Select.Option key={code.id} value={code.value}>
                    {code.value}
                </Select.Option>
            )) : []}
        </WbSelect>
    )
}

export default SelectFilterType