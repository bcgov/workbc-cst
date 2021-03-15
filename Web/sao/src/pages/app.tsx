import React, {FunctionComponent, useEffect} from "react"
import 'antd/dist/antd.css'
import Dropdowns from '../components/dropdowns'
import CompareCareers from "../components/compareCareers"
import CareerPreview from "../components/careerPreview"
import {useFilterContext} from '../state/filterContext'
import '../theme/index.less' 
import Helmet from 'react-helmet'
import { navigate } from "gatsby";

const SAOTool:FunctionComponent = () => {

  const {view, setView, setCheckedNocs, setSelectedNoc} = useFilterContext()

  useEffect(() => {
    let initialValue = typeof window !== 'undefined' ? window.location.href : ''
    if(initialValue) {
      let queryParams = decodeURIComponent(initialValue)?.split('?')[1]
      let current_view = queryParams?.split('&')[0]?.split('=')[1]
      setView(current_view? current_view: 'results')
      if(current_view==='compare' && !!queryParams) {
        let current_nocs = !!queryParams.split('&')[1]?.split('=')[1]?.split(',') ? queryParams.split('&')[1]?.split('=')[1]?.split(',') : []
        setCheckedNocs(current_nocs)
        navigate('/')
      }
      if(current_view === 'careerPreview' && !!queryParams) {
        let current_noc = !!queryParams.split('&')[1]?.split('=')[1] ? queryParams.split('&')[1]?.split('=')[1] : undefined
        setSelectedNoc(current_noc)
        // navigate('/')
      }
    }
  },[])

  return (
    <div>
        <Helmet title={'WorkBC - Career Search Tool'}></Helmet>
        {view === 'results'? <Dropdowns /> : view === 'careerPreview' ? <CareerPreview /> : <CompareCareers />}
      </div>
    )
}

export default SAOTool