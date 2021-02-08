import React, {FunctionComponent} from 'react'
import {Button} from 'antd'
import { useFilterContext } from '../state/filterContext'

const CompareCareers: FunctionComponent = () => {
    const {setShowCompareView} = useFilterContext()

    return(
        <div>
            <h1>Compare Careers</h1>
            <Button onClick={()=> setShowCompareView(false)}> Home page </Button>
        </div>
    )
}

export default CompareCareers