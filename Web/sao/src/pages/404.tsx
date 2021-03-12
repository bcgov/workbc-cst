import React, {FunctionComponent} from 'react';
import {FilterContextProvider} from '../state/filterContext'
import NotFoundPage from './notFoundPage'

const NoPage: FunctionComponent = () => {

    return (    
        <FilterContextProvider>
            <NotFoundPage/>
        </FilterContextProvider>
)}

export default NoPage;
