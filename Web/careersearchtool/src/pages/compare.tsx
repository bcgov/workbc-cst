import React, { FunctionComponent } from 'react';
import CompareCareers from '../components/compareCareers'
import {FilterContextProvider} from '../state/filterContext'

const compare: FunctionComponent = () => {
        return (
            <FilterContextProvider>
                <CompareCareers/>
            </FilterContextProvider>
        );
}

export default compare;