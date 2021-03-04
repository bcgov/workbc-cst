import React, {FunctionComponent, useEffect} from "react" 
import {FilterContextProvider} from '../state/filterContext'
import SAOComponent from './app'
import {configureHttpClient} from '../client/httpClient'

const IndexController:FunctionComponent = () => {

  useEffect(() => {
    configureHttpClient()
  }, [])

  return (
    <FilterContextProvider>
      <SAOComponent />
    </FilterContextProvider>
    )
}

export default IndexController