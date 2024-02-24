import { Checkbox, Col, Input, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import AiDCard from '../../components/aid-card/aid-card';
import { useNavigate } from 'react-router-dom';

interface CardRecord {
    imageUrl: string;
    name: string;
    branch: string;
}

export interface MainPageProps {
    list?: CardRecord[];
}

const MainPage = (props: MainPageProps) => {

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredList = props.list?.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.branch.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    return (
        <div >
            <Row>
                <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                    <Input style={{ width: "40%", height: "50px", fontSize: "20px" }} placeholder='Search' onChange={(e) => handleOnChange(e)} />
                </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
                {
                    props.list && (
                        filteredList?.map(p => (
                            <div style={{ padding: "20px" }} onClick={() => navigate("/place")}>
                                <Col key={p.name} >
                                    <AiDCard
                                        imageUrl='https://logowik.com/content/uploads/images/280_starbucks.jpg'
                                        name={p.name}
                                        branch={p.branch}
                                    />
                                </Col>
                            </div>
                        ))
                    )
                }

            </Row>
        </div>

    )
}

export default MainPage