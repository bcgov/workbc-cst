import React, {FunctionComponent} from 'react'
import {Button} from 'antd'
import {useHistory} from 'react-router-dom'

const CompareCareers: FunctionComponent = () => {
    const history = useHistory()

    function handleReturn() {
        history.push('/')
    }

    return(
        <div>
            <h1>Compare Careers</h1>
            <Button onClick={handleReturn}> Home page </Button>
        </div>
    )
}

export default CompareCareers