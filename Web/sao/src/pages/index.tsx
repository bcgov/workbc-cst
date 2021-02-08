import React, {FunctionComponent} from "react"
import 'antd/dist/antd.css'
import {FilterContextProvider} from '../state/filterContext'
import SAOComponent from './app'

const IndexController:FunctionComponent = () => {

  return (
    <FilterContextProvider>
      <SAOComponent />
    </FilterContextProvider>
    )
}

export default IndexController