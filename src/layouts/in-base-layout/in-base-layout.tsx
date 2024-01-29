import React from 'react'
import Navbar from '../../components/navbar/navbar'
import './in-base-layout.css'

export interface InBaseLayoutProps {
    children?: JSX.Element;
}

const InBaseLayout = (props: InBaseLayoutProps) => {
    return (
        <>
            <Navbar />
            <div className='in-base-layout-container'>
                {props.children}
            </div>
        </>
    )
}

export default InBaseLayout