import { Col, Divider, Progress, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import TitleText from '../../components/title-text/title-text'
import SubtitleText from '../../components/subtitle-text/subtitle-text'
import { useParams } from 'react-router-dom';
import AiDButton from '../../components/aid-button/aid-button';
import FormModal from '../../components/form-modal/form-modal';
import FormNegativeModal from '../../components/form-negative-modal/form-negative-modal';
import './library-detail-page.css'
import axios from 'axios';

export interface Library {
    id?: number;
    name?: string;
    address?: string;
    images?: string[];
    capacity?: number;
}

const libraries =[
    {id: 13, name:'Merkezefendi Kütüphanesi',capacity:125 , address:'Merkezefendi, Dere Sk. No:7, 34015 Zeytinburnu/İstanbul', images: ['https://kulturvadisi.com/images/media/zeytinburnu_kultur_vadisi_merkezefendi_2.jpg','https://cdnuploads.aa.com.tr/uploads/PhotoGallery/2018/06/17/thumbs_b2_59df3cfd5c8735f91b62b2081473aeed.jpg']},
    {id: 14, name:'Başakşehir Millet Kıraathanesi',capacity:144 , address:'Kayabaşı, Adnan Menderes Bulvari, 34494 Başakşehir/İstanbul', images: ['https://articephe.com/wp-content/uploads/2016/06/SKYLIGHT-1920x960.jpg','https://www.basaksehir.bel.tr/Content/images/projeler/proje-galerileri/Bakmer/Millet%20k%C4%B1raathanesi/millet%20k%C4%B1rathanesi%203.png']},
    {id: 15, name:'Avcılar İlçe Halk Kütüphanesi',capacity:92 , address:'Merkez Reşit Paşa Cad. Barış Manço Kültür Merkezi, 34310 Avcılar/İstanbul', images: ['https://images.gonulluyuzbiz.gov.tr/public/165.jpg?width=520&height=370&mode=crop','https://cicicee.com/wp-content/uploads/2013/04/avcilar-baris-manco-kultur-merkezi-1000x600.jpg']},
    {id: 16, name:'Beyazıt Devlet Kütüphanesi',capacity:128 , address:'Beyazıt, Çadırcılar Cd. No:34126, 34126 Fatih/İstanbul', images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Beyaz%C4%B1t_Library.jpg/800px-Beyaz%C4%B1t_Library.jpg','https://arkitektuel.com/wp-content/uploads/2017/02/beyazit8-640x427.jpg']},
    {id: 17, name:'Büyükçekmece Mimar Sinan Halk Kütüphanesi',capacity:112 , address:'Dızdarıye, Yurt Sk. No:6, 34500 Büyükçekmece/İstanbul', images: ['https://istanbul.ktb.gov.tr/Resim/348090,ktpbuyukcekmece-mimar-sinan-halk-kutuphanesipng.png?0','']},
    {id: 18, name:'Gaziosmanpaşa İlçe Halk Kütüphanesi',capacity:102 , address:'Merkez, Kültür Sanat Merkezi, 1, Cumhuriyet Meydanı Kat:1, 34245 Gaziosmanpaşa/İstanbul', images: ['https://istanbul.ktb.gov.tr/Resim/348404,ktpgaziosmanpasa-ilce-halk-kutuphanesijpg.png?0','']},
    {id: 19, name:'İstanbul Havalimanı Kütüphanesi',capacity:98 , address:'Taşoluk, AIRPORT TRANSFER COMPANY, Terminal Caddesi No:1, 34283 Arnavutköy/İstanbul', images: ['https://www.istairport.com/media/xsjfiqlz/kutuphane.jpg?format=webp','https://www.basyaybir.org/SFolder/Haber/7592_R1_B3.jpg']},
    {id: 20, name:'İstanbul Akyakapark AVM Kütüphanesi',capacity:115 , address:'kütüphane, Saray, Küçüksu Cd. No: 7, 34768 Ümraniye/İstanbul Akyaka avm, D:2.kat, 34768 Ümraniye/İstanbul', images: ['https://cdnuploads.aa.com.tr/uploads/VideoGallery/2021/03/31/a2433a11587155ae1915e0852f2b50fa.jpg','https://cdnuploads.aa.com.tr/uploads/Contents/2020/11/21/thumbs_b_c_5b10be161e34c070c732cfc53d2dfaf3.jpg?v=155615']},
    {id: 21, name:'Akm Sanat Kütüphanesi',capacity:88 , address:'Gümüşsuyu, AKM, Mete Cd. No: 2, 34437 Beyoğlu/İstanbul', images: ['https://www.tuketicipostasi.com/images/haberler/2021/10/vitali-hakko-kreatif-endustriler-kutuphanesi-akm-de.jpg','https://img.piri.net/mnresize/600/-/resim/imagecrop/2021/11/12/07/25/resized_e91c3-837ce3c71635538894_vitali_hakko_kreatif_endustriler_kutuphanesi__2_.jpg']},
    {id: 22, name:'Üsküdar Şemsipaşa İlçe Halk Kütüphanesi',capacity:102 , address:'Mimar Sinan, Harem Yolu No:6, 34664 Üsküdar/İstanbul', images: ['https://workindoor.com/dimg/istanbul/uskudar/semsipasa-ilce-halk-kutuphanesi/247403091723699234051351672952_SAM_1653.JPG.jpeg','https://i.ytimg.com/vi/xjxGzBWaIOo/maxresdefault.jpg']},
    ];

const LibraryDetailPage = () => {

    const { id } = useParams();
    const [library, setLibrary] = useState<Library | null>(null)
    const [isOpenFormModal, setOpenFormModal] = useState<boolean>(false)
    const [isOpenFormNegativeModal, setOpenFormNegativeModal] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(20)       //yolodan gelecek
    const [thinkingGoCounter, setThinkingGoCounter] = useState<number>(8)



    const buttons = [
        <AiDButton onClick={() => {
            localStorage.setItem('comeLibrary', 'true');
            setThinkingGoCounter((prevState) => prevState + 1)
            setOpenFormModal(false)
        }}>Yes</AiDButton>,
        <AiDButton onClick={() => {
            setOpenFormModal(false)
        }}>No</AiDButton>

    ]

    const formNegativeButtons = [
        <AiDButton onClick={() => {
            localStorage.removeItem('comeLibrary')
            setThinkingGoCounter((prevState) => prevState - 1)
            setOpenFormNegativeModal(false)
        }}>Yes</AiDButton>,
        <AiDButton onClick={() => {
            setOpenFormNegativeModal(false)
        }}>No</AiDButton>

    ]

    useEffect(() => {
        const fetchCaffeData = () => {
            const foundLibrary = libraries.find((library) => library.id === Number(id));
            if (foundLibrary) {
                setLibrary(foundLibrary);
                console.log(foundLibrary)
            } else {
                console.error(`Coffee shop with id ${id} not found.`);
            }
        };
        fetchCaffeData();
    }, [id])

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
        <div className='libryary-place-container'>
            <Row justify={'space-evenly'}>
                <Col>
                    <Space align='start' size={'large'}>
                        {/* <img src={library?.logo} alt='photo_logo' width={300} /> */}
                        <Space direction='vertical'>
                            <TitleText text={library?.name || ''} />
                            <SubtitleText text={`Address: ${library?.address}`} />
                            <SubtitleText text={`Capacity: ${library?.capacity}`} />
                            <SubtitleText text={`Current Number of People: ${counter}`} />
                            {
                                localStorage.getItem('comeLibrary') === 'true'
                                    ? <SubtitleText text={`You And ${thinkingGoCounter - 1} other people are thinking of coming here`} />
                                    : <SubtitleText text={` ${thinkingGoCounter} people are thinking of coming here`} />

                            }

                            <Space>
                                {
                                    localStorage.getItem('comeLibrary') === 'true'
                                        ? <div style={{ cursor: "pointer" }} onClick={() => {
                                            setOpenFormNegativeModal(true)
                                        }}>
                                            <p style={{ color: "red" }}>Has your arrival status changed? </p>
                                        </div>
                                        : <div style={{ cursor: "pointer" }} onClick={() => {
                                            setOpenFormModal(true)
                                        }}>
                                            <p >Are you thinking of going here? </p>
                                        </div>
                                }
                            </Space>
                        </Space>
                    </Space>
                </Col>
                <Col> 
                
                <Progress
                        type="circle"
                        percent={Math.floor(counter * 100 / (library?.capacity || 60))}
                    />

                </Col>
            </Row>
            <Divider />
            <Row justify={'start'} style={{ paddingLeft: "198px" }}>
                <Col><TitleText text='images of the library' /></Col>
            </Row>
            <Row justify={'start'} style={{ paddingLeft: "198px", paddingTop: "24px" }}>
                <Col>
                    <Space size={'large'}>
                        {
                            library?.images?.map((caf) => (<img src={caf} alt='' width={300} />))
                        }
                    </Space>
                </Col>
                <Col></Col>
            </Row>
            <FormModal
                show={isOpenFormModal}
                buttons={buttons}
                buttonPosition='horizontal'
                onCancel={() => { setOpenFormModal(false) }}
            />
            <FormNegativeModal
                show={isOpenFormNegativeModal}
                closable={true}
                buttons={formNegativeButtons}
                buttonPosition='horizontal'
            />
        </div>
    )
}

export default LibraryDetailPage