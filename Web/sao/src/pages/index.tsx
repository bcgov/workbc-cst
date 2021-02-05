import React, {FunctionComponent} from "react"
// import {Route, BrowserRouter, Switch} from 'react-router-dom' 
import '../styles/index.less' 
import 'antd/dist/antd.css'
import Dropdowns from '../components/dropdowns'
// import NotFoundPage from '../components/404'
import {FilterContextProvider} from '../state/filterContext'
// import CompareCareers from "../components/compareCareers"

const CareerSearchToolIndex:FunctionComponent = () => {
  return (
    <FilterContextProvider>
      <Dropdowns />
      {/* <BrowserRouter>
        <Switch>
            <Route exact path="/">
              <Dropdowns />
            </Route>
            <Route exact path="/compareCareers">
              <CompareCareers />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
      </BrowserRouter> */}
    </FilterContextProvider>
    )
}

export default CareerSearchToolIndex