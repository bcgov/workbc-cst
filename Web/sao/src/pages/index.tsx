import React, {FunctionComponent} from "react"
import 'antd/dist/antd.css'
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