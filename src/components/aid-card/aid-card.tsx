import React from 'react'
import './aid-card.css';
import { Card, CardProps, Space } from 'antd';
import AiDButton from '../aid-button/aid-button';

export interface AiDCardProps extends CardProps {
    imageUrl?: string;
    name?: string;
    branch?: string;
    chidren?: any;
    logo?: string;
}

const AiDCard = (props: AiDCardProps) => {
    return (
        <Card color='red' {...props} style={{ width: "264px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className='header'>
                <img src={props.imageUrl} alt="" width={"216px"} height={"216px"} />
            </div>
            <Space style={{ paddingTop: "10px" }}>
                {
                    props.logo && <div>
                        <img src={props.logo} height={"50px"} alt='img' />
                    </div>
                }
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span className='title'>{props.name}</span>
                    <span className='subTitle'>{props.branch}</span>
                </div>
            </Space>
            <div className='footer'>
                <AiDButton>see the crowd</AiDButton>
            </div>
            <div>
                {
                    props.chidren ?? props.chidren
                }
            </div>
        </Card>
    )
}

export default AiDCard

//https://logowik.com/content/uploads/images/280_starbucks.jpg