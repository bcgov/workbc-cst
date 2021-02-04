import React, {FunctionComponent, useEffect, useState} from 'react'
import {Button} from 'antd'
import {navigate} from 'gatsby'
import {useFilterContext} from '../state/filterContext'
import {FilterOptionModel} from '../client/dataTypes'

const CompareCareers: FunctionComponent = () => {
    const {filterOption, filteredOccupationsList, selectedNoc, setSelectedNoc, setFilteredOccupationsList} = useFilterContext()

    function handleReturn() {
        navigate('/')
    }

    const [filterParam, setFilterParams] = useState<FilterOptionModel>()

    useEffect(() => {
        if (!!filterOption) {
                console.log(`latest filter params: ${JSON.stringify(filterOption)}`)
                setFilterParams(filterOption)
            }
        },[filterOption])

    return(
        <div>
            <b> From context, Selected Filter Options : {JSON.stringify(filterOption)} </b>
            <h1>Compare Careers</h1>
            <Button onClick={handleReturn}> Home page </Button>
        </div>
    )
}

export default CompareCareers