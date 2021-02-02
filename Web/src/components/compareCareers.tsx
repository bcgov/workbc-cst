import React, {FunctionComponent} from 'react'
import {Button} from 'antd'
import {navigate} from 'gatsby'
import {useFilterContext} from '../state/filterContext'

const CompareCareers: FunctionComponent = () => {
    const {filterOption, filteredOccupationsList, selectedNoc, setSelectedNoc, setFilteredOccupationsList} = useFilterContext()

    function handleReturn() {
        navigate('/')
    }

    return(
        <div>
            <b> From context, Selected Filter Options : {JSON.stringify(filterOption)} </b>
            <h1>Compare Careers</h1>
            <Button onClick={handleReturn}> Home page </Button>
        </div>
    )
}

export default CompareCareers