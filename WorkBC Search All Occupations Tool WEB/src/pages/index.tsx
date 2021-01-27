import React, {FunctionComponent} from "react"
import 'antd/dist/antd.css'
import Dropdowns from '../components/dropdowns';

const CareerSearchToolIndex:FunctionComponent = () => {
  
  return (
    <div style={{margin: "0px 10px"}}> 
      <h3> Use the filter(s) to explore your career options. </h3>
      <Dropdowns/>
    </div>
    )
}

export default CareerSearchToolIndex