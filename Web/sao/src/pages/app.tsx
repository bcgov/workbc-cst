import React, {FunctionComponent} from "react"
import 'antd/dist/antd.css'
import Dropdowns from '../components/dropdowns'
import {useFilterContext} from '../state/filterContext'
import CompareCareers from "../components/compareCareers"
import CareerPreview from "../components/careerPreview"
import '../theme/index.less' 
import Helmet from 'react-helmet'

const SAOTool:FunctionComponent = () => {

  const {view} = useFilterContext()

  return (
      <div>
        <Helmet title={'WorkBC - Career Search Tool'}></Helmet>
        {view === 'results'? <Dropdowns /> : view === 'careerPreview' ? <CareerPreview /> : <CompareCareers />}
      </div>
    )
}

export default SAOTool