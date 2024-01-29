import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AiDCard from '../../components/aid-card/aid-card';
import './place-page.css'
import AiDButton from '../../components/aid-button/aid-button';

export interface PlacePageProps {
    imageUrl?: string | undefined;
    name?: string | undefined;
    branch?: string | undefined;
}


const PlacePage = (props: PlacePageProps) => {

    const [counter, setCounter] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // İlk render'dan sonra her saniyede bir API isteği yap
        const intervalId = setInterval(() => {
            axios.get('http://localhost:9090/api/people-count')
                .then(response => {
                    // API yanıtını kullanmak için burada işlem yapabilirsiniz
                    setCounter(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('API isteği başarısız:', error);
                });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []); // 



    return (
        <div>
            <Row style={{ justifyContent: "center" }}>

                <div style={{ padding: "20px" }}>
                    <Col key={props.name} >
                        <Card style={{ width: "264px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                            <div className='header'>
                                <img src="https://logowik.com/content/uploads/images/626_kahvedunyasi.jpg" alt="" width={"216px"} />
                            </div>
                            <div className='body'>
                                <span className='title'>Kahve Dünyası</span>
                                <span className='subTitle'>Beşiktaş</span>
                            </div>
                            <div className='footer'>
                                <span
                                    style={{
                                        color: '#344054',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >Kapasite : 224</span>
                                {counter != null ? <span style={{
                                    color: '#344054',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                }}>Kişi Sayısı : {20+counter}</span> : ""}
                            </div>
                        </Card>

                    </Col>
                </div>


            </Row>
        </div>
    )
}

export default PlacePage


{/* <AiDCard
imageUrl='https://logowik.com/content/uploads/images/626_kahvedunyasi.jpg'
name='Kahve Dünyası'
branch='Beşiktaş'
>
<div className='footerSpan'>
    <span>Kapasite : 224</span>
    {counter != null ? <span>Kişi Sayısı : {counter}</span> : ""}
</div>
</AiDCard> */}