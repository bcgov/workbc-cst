import React, {FunctionComponent, useEffect, useState} from "react"
import 'antd/dist/antd.css'
import Dropdowns from '../components/dropdowns'
import {useFilterContext} from '../state/filterContext'
import CompareCareers from "../components/compareCareers"

const SAOTool:FunctionComponent = () => {

  const {showCompareView} = useFilterContext()
  const [renderCompareView, setRenderCompareView] = useState(false)

  useEffect(() => {
    setRenderCompareView(showCompareView)
  }, [showCompareView])

  return (
      <div>
        {renderCompareView?  <CompareCareers /> : <Dropdowns />}
      </div>
    )
}

export default SAOTool