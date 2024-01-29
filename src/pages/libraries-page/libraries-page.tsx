import { Col, Input, Row } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AiDCard from '../../components/aid-card/aid-card';

interface LibraryRecord {
    id: number;
    name: string;
    capacity: number;
    address: string;
    images: string[];
}

export interface LibrariesPageProps {
    list?: LibraryRecord[];
}

const LibrariesPage = (props: LibrariesPageProps) => {

    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredList = props.list?.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );





    return (
        <div >
            <Row>
                <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                    <Input style={{ width: "40%", height: "50px", fontSize: "20px" }} placeholder='Yer arayın' onChange={(e) => handleOnChange(e)} />
                </Col>
            </Row>
            <Row style={{ justifyContent: "center", paddingTop: "2rem" }}>
                {
                    props.list && (
                        filteredList?.map(p => (
                            <div style={{ padding: "20px" }} onClick={() => navigate(`/library/${p.id}`)}>
                                <Col key={p.name} >
                                    <AiDCard
                                        imageUrl={p.images.at(0)}
                                        name={p.name}
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

export default LibrariesPage