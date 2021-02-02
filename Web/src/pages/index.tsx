import React, {FunctionComponent} from "react"
import 'antd/dist/antd.css'
import Dropdowns from '../components/dropdowns';
import Results from '../components/results'
import {FilterContextProvider} from '../state/filterContext';

const CareerSearchToolIndex:FunctionComponent = () => {
  
  return (
    <FilterContextProvider>
      <div style={{margin: "0px 10px"}}> 
        <h3> Use the filter(s) to explore your career options. </h3>
        <Dropdowns/>
        <Results/>
      </div>
    </FilterContextProvider>
    )
}

export default CareerSearchToolIndex