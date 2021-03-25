import React, {FunctionComponent, useEffect} from "react"
import Helmet from 'react-helmet';
import 'antd/dist/antd.css'
import Dropdowns from '../components/dropdowns'
import CompareCareers from "../components/compareCareers"
import CareerPreview from "../components/careerPreview"
import {parseURL} from '../client/urlService'
import { useFilterContext } from '../state/filterContext'
import '../theme/index.less'
import { navigate } from "gatsby";

const SAOTool:FunctionComponent = () => {
  const {view, setView, setFilterOption, setCheckedNocs, setSelectedNoc} = useFilterContext()

  useEffect(() => {
    let initialValue = typeof window !== 'undefined' ? window.location.href : ''
      if(initialValue) {
        const decodedURL = decodeURIComponent(initialValue)
        let view = decodedURL?.split('?')[1]
        let queryParams = decodedURL?.split('?')[2]
        if(!!queryParams && !!view) {
          const context = parseURL(queryParams, view)
          setView(view)
          if (view === 'results') {
            setFilterOption(context?.filterOptions)
            setSelectedNoc(context?.selectedNoc)
          } else if (view === 'careerPreview') {
            setSelectedNoc(context?.selectedNoc)
          } else {
            setCheckedNocs(context?.checkedNocs)
          }
          navigate('/')
        }
      }
    },[])

  return (
    <div>
        <Helmet title={'WorkBC - Career Search Tool'}>
          <script src="https://www.youtube.com/iframe_api" type="text/javascript" />
          <script src="analytics.js" type="text/javascript" />
        </Helmet>
        {view === 'results'? <Dropdowns /> : view === 'careerPreview' ? <CareerPreview /> : <CompareCareers />}
      </div>
    )
}

export default SAOTool