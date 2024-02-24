import React, { useEffect, useState } from 'react'
import TitleText from '../../components/title-text/title-text'
import SubtitleText from '../../components/subtitle-text/subtitle-text'
import { Col, Divider, Progress, Row, Space } from 'antd'
import FormModal from '../../components/form-modal/form-modal';
import FormNegativeModal from '../../components/form-negative-modal/form-negative-modal';
import { useParams } from 'react-router-dom';
import AiDButton from '../../components/aid-button/aid-button';
import './bank-detail-page.css'
import axios from 'axios';

export interface Bank {
    id: number;
    name: string;
    branch: string;
    capacity: number;
    city: string;
    country: string;
    address: string;
    logo: string;
    images: string;
}

const BankDetailPage = () => {

    const { id } = useParams();
    const [bank, setBank] = useState<Bank | null>(null)
    const [isOpenFormModal, setOpenFormModal] = useState<boolean>(false)
    const [isOpenFormNegativeModal, setOpenFormNegativeModal] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(20)       //yolodan gelecek
    const [thinkingGoCounter, setThinkingGoCounter] = useState<number>(8)

    const banks = [
        { id: 1, name: 'Akbank', branch: 'Akbank Başakşehir Şubesi', capacity: 48, city: 'İstanbul', country: 'Başakşehir', address: 'Ziya Gökalp, TÜMSAN 1. Kısım Sanayi Sitesi No:23, 34490 İkitelli Osb/Başakşehir/İstanbul', logo: 'https://www.akbank.com/SiteAssets/img/akbfa.jpg', images: 'https://fastly.4sqi.net/img/general/600x600/63268521_UTe0ul5oCsbTBDnmD4L1vNXwChCNe3NU0MaYt0pErrE.jpg' },
        { id: 2, name: 'Vakıfbank', branch: 'Vakıfbank Beşiktaş Şubesi', capacity: 45, city: 'İstanbul', country: 'Beşiktaş', address: 'Cihannüma, Barbaros Blv. No:89A, 34353 Beşiktaş/İstanbul', logo: 'https://www.vakifbank.com.tr/images/vakifbank.logo.jpg', images: 'https://lh3.googleusercontent.com/p/AF1QipMONVfnZsamEYT0DIXB3umOseavSgvWaoGEJ8gq=s680-w680-h510' },
        { id: 3, name: 'Vakıfbank', branch: 'Vakıfbank Kadıköy Şubesi', capacity: 45, city: 'İstanbul', country: 'Kadıköy', address: 'Osmanağa, Söğütlü Çeşme Cd No:5, 34714 Kadıköy/İstanbul', logo: 'https://www.vakifbank.com.tr/images/vakifbank.logo.jpg', images: 'https://lh3.googleusercontent.com/p/AF1QipP344i2CG9sbRmzWNei9nmzowj8EkHktbqVqNsS=s680-w680-h510' },
        { id: 4, name: 'Vakıfbank', branch: 'Vakıfbank Çevik Kuvvet Şubesi', capacity: 35, city: 'İstanbul', country: 'Bayrampaşa', address: 'Ortamahalle Mah. Abdi İpekçi Cad. No:3-5 Bayrampaşa/İstanbul', logo: 'https://www.vakifbank.com.tr/images/vakifbank.logo.jpg', images: 'https://haritane.com/yer/vakifbank-bayrampasa-subesi-553473.jpg' },
        { id: 5, name: 'Ziraatbank', branch: 'Ziraat Bankası İstanbul Mecidiyeköy Şubesi', capacity: 52, city: 'İstanbul', country: 'Şişli', address: 'Merkez, Büyükdere Cd. No:83, 34381 Şişli/İstanbul', logo: 'https://www.ziraatbank.com.tr/PublishingImages/Subpage/bankamiz/BankamizGorselleri/zb_logo.jpg', images: 'https://lh3.googleusercontent.com/p/AF1QipOF_LUIKx5QM55d3sQ8kQwBZGiN0s3DNxdQNTVl=s680-w680-h510' },
        { id: 6, name: 'Kuveyt Türk', branch: 'Kuveyt Türk Avcılar Şubesi', capacity: 43, city: 'İstanbul', country: 'Avcılar', address: 'Reşitpaşa Cad. Yazgan Apartmanı A Blok No:39/1 Avcilar / Istanbul', logo: 'https://katilimfinans.com.tr/images/haberler/2023/12/kuveyt_turk_tuzel_musterilerin_ihale_sureclerini_kolaylastiran_bankpro_ile_is_birligi_yapti_h14455_f6d87.jpg', images: 'https://avatars.mds.yandex.net/get-altay/2004078/2a00000170188296fde07a980acdf6235704/orig' },
        { id: 7, name: 'Yapı Kredi', branch: 'Yapı Kredi - Fatih Akdeniz Caddesi Şubesi', capacity: 47, city: 'İstanbul', country: 'Fatih', address: 'Akşemsettin, Mah. No: /A, Akdeniz Cd. No:99, 34080 Fatih', logo: 'https://www.otostil.com/wp-content/uploads/2017/07/Yap%C4%B1-kredi-bank-logo.jpg', images: 'https://avatars.mds.yandex.net/get-altay/1546239/2a0000016b31d564e189d28d1fbef4e8dcc4/L_height' },
        { id: 8, name: 'DenizBank', branch: 'DenizBank Silivri Şubesi', capacity: 52, city: 'İstanbul', country: 'Silivri', address: 'DenizBank Silivri branchsi', logo: 'https://sbmguvenlik.com.tr/wp-content/uploads/2020/11/denizbank-logo.png', images: 'https://ozkankac.files.wordpress.com/2011/05/denizbankcivril.jpg' },
        { id: 9, name: 'İş Bankası', branch: 'Türkiye İş Bankası Zeytinburnu/İstanbul Şubesi', capacity: 48, city: 'İstanbul', country: 'Zeytinburnu', address: 'Nuripaşa, Merv Cd. No:46A, 34025 Zeytinburnu/İstanbul', logo: 'https://logowik.com/content/uploads/images/turkiye-is-bankasi9178.jpg', images: 'https://static-pano.maps.yandex.ru/v1/?panoid=1246204497_806657233_23_1412759032&size=500%2C240&azimuth=-1.4&tilt=10&api_key=maps&signature=2k1V6u4qz9nb6QWrGpua_c6qCG3y8SGeE5k7qM3bbnU=' },
        { id: 10, name: 'Halkbank', branch: 'Halkbank Üsküdar Şubesi', capacity: 39, city: 'İstanbul', country: 'Üsküdar', address: 'Ahmediye Mah, Halk Cd. No: 7, 34672 Üsküdar/İstanbul', logo: 'https://www.halkbank.com.tr/content/dam/halkbank/tr/gorseller/bankam%C4%B1z/logolarimiz/hblogoerkek.jpg', images: 'https://static.daktilo.com/sites/1192/uploads/2023/04/14/halkb.png' },
        { id: 11, name: 'Garanti BBVA', branch: 'Garanti BBVA Beykoz Şubesi', capacity: 55, city: 'İstanbul', country: 'Beykoz', address: 'Merkez, Kelle İbrahim Cd. No: 2, 34820 Beykoz/İstanbul', logo: 'https://cdnuploads.aa.com.tr/uploads/sirkethaberleri/Contents/2018/11/30/thumbs_b_c_eee85060d5e32db6d1bb1e2da1ca285e.jpg', images: 'https://static-pano.maps.yandex.ru/v1/?panoid=1247327735_805902217_23_1415449747&size=500%2C240&azimuth=-119.8&tilt=10&api_key=maps&signature=lXphMrcwESI8EN-bjpHbGqSQO6dEEtcyf4Sot2nUgRE=' },
        { id: 12, name: 'Şekerbank', branch: 'Şekerbank Kadıköy Şubesi', capacity: 49, city: 'İstanbul', country: 'Kadıköy', address: 'Osmanağa mah. Efes iş hanı, Kuşdili Cd. 12/A, Kadıköy/İstanbul', logo: 'https://www.logovector.org/wp-content/uploads/logos/png/s/sekerbank_logo.png', images: 'https://avatars.mds.yandex.net/get-altay/467304/2a0000015c0131bccd127cb6d962e13676d7/orig' }
    ];

    useEffect(() => {
        const fetchBankData = () => {
            const foundBank = banks.find((bank) => bank.id === Number(id));
            if (foundBank) {
                setBank(foundBank);
                console.log(foundBank)
            } else {
                console.error(`Coffee shop with id ${id} not found.`);
            }
        };
        fetchBankData();
    }, [id, bank])


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
    }, [counter]); // 

    const buttons = [
        <AiDButton onClick={() => {
            localStorage.setItem('comeBank', 'true');
            setThinkingGoCounter((prevState) => prevState + 1)
            setOpenFormModal(false)
        }}>Yes</AiDButton>,
        <AiDButton onClick={() => {
            setOpenFormModal(false)
        }}>No</AiDButton>

    ]

    const formNegativeButtons = [
        <AiDButton onClick={() => {
            localStorage.removeItem('comeBank')
            setThinkingGoCounter((prevState) => prevState - 1)
            setOpenFormNegativeModal(false)
        }}>Yes</AiDButton>,
        <AiDButton onClick={() => {
            setOpenFormNegativeModal(false)
        }}>No</AiDButton>
    ]

    return (
        <div className='bank-place-container'>
            <Row justify={'space-evenly'}>
                <Col>
                    <Space align='start' size={'large'}>
                        <img src={bank?.logo} alt='photo_logo' width={300} />
                        <Space direction='vertical'>
                            <TitleText text={bank?.branch || ''} />
                            <SubtitleText text={`Address: ${bank?.address}`} />
                            <SubtitleText text={`Capacity: ${bank?.capacity}`} />
                            <SubtitleText text={`Current Number of People: ${counter}`} />
                            {
                                localStorage.getItem('comeBank') === 'true'
                                    ? <SubtitleText text={`Siz ve ${thinkingGoCounter - 1} other people are thinking of coming here`} />
                                    : <SubtitleText text={` ${thinkingGoCounter} people are thinking of coming here`} />

                            }

                            <Space>
                                {
                                    localStorage.getItem('comeBank') === 'true'
                                        ? <div style={{ cursor: "pointer" }} onClick={() => {
                                            setOpenFormNegativeModal(true)
                                        }}>
                                            <p style={{ color: "red" }}>Has your arrival situation changed? </p>
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
                        percent={Math.floor(counter * 100 / (bank?.capacity || 60))}
                    />
                </Col>
            </Row>
            <Divider />
            <Row justify={'start'} style={{ paddingLeft: "198px" }}>
                <Col><TitleText text='Images of the bank' /></Col>
            </Row>
            <Row justify={'start'} style={{ paddingLeft: "198px", paddingTop: "24px" }}>
                <Col>
                    <Space size={'large'}>
                        <img src={bank?.images} alt='id+1' />
                    </Space>
                </Col>
                <Col></Col>
            </Row>
            <FormModal
                show={isOpenFormModal}
                closable={true}
                onCancel={() => { setOpenFormModal(false) }}
                buttons={buttons}
                buttonPosition='horizontal' />
            <FormNegativeModal
                show={isOpenFormNegativeModal}
                closable={true}
                buttons={formNegativeButtons}
                buttonPosition='horizontal'
            />
        </div>
    )
}

export default BankDetailPage