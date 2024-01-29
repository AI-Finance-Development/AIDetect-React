import React from 'react'
import './dashboard-base-layout.css';
import SideMenu from '../side-menu/side-menu';
import Navbar from '../../components/navbar/navbar';

export interface DashboardBaseLayoutProps {
    children?: JSX.Element;
}


const DashboardBaseLayout = (props: DashboardBaseLayoutProps) => {
    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='side-bar'>
                    <SideMenu />
                </div>
                <div className='page'>
                    {props.children}
                </div>
            </div>
        </>

    )
}

export default DashboardBaseLayout

