import React, {FunctionComponent} from "react"
//import '../styles/index.less'
import Dropdowns from '../components/dropdowns'
import {FilterContextProvider} from '../state/filterContext'

const CareerSearchToolIndex:FunctionComponent = () => {
  
  return (
    <FilterContextProvider>
      <Dropdowns />
    </FilterContextProvider>
    )
}

export default CareerSearchToolIndex