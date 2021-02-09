import React, {FunctionComponent} from "react"
// import {Route, BrowserRouter, Switch} from 'react-router-dom' 
import '../theme/index.less' 
//import 'antd/dist/antd.css'
import Dropdowns from '../components/dropdowns'
// import NotFoundPage from '../components/404'
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