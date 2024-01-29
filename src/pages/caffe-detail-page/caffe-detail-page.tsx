import { Col, Divider, Progress, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import TitleText from '../../components/title-text/title-text';
import SubtitleText from '../../components/subtitle-text/subtitle-text';
import { useParams } from 'react-router-dom';
import FormModal from '../../components/form-modal/form-modal';
import AiDButton from '../../components/aid-button/aid-button';
import FormNegativeModal from '../../components/form-negative-modal/form-negative-modal';
import './caffe-detail-page.css'
import axios from 'axios';

export interface Caffe {
    id?: number;
    name?: string;
    branch?: string;
    address?: string;
    images?: string[];
    logo?: string;
    capacity?: number;
}

const caffes = [
    { id: 23, name: 'Kahve Dünyası', capacity: 125, branch: 'Akaretler', city: 'İstanbul', country: 'Beşiktaş', address: 'Vişnezade, Şair Nedim Cd. No:13 D:15, 34357 Beşiktaş/İstanbul', logo: 'https://logowik.com/content/uploads/images/626_kahvedunyasi.jpg', images: ['https://live.staticflickr.com/5275/6935215630_e3d223b4b8_b.jpg', 'https://s3-media0.fl.yelpcdn.com/bphoto/qKXSJUFLVYzWtEcrFOqyxQ/348s.jpg'] },
    { id: 24, name: 'Kahve Dünyası', capacity: 70, branch: 'Maslak', city: 'İstanbul', country: 'Sarıyer', address: 'Windowist Tower Reşitpaşa Mah. Eski Büyükdere Cad. No:26/2', logo: 'https://logowik.com/content/uploads/images/626_kahvedunyasi.jpg', images: ['https://www.pausedergi.com/wp-content/uploads/2019/11/1574061071_Kahve_D__nyas___Levent_Alg__t__r__6_.jpg', 'https://foodinlife.com/wp-content/uploads/2022/12/Adsiz-tasarim-24-1.png'] },
    { id: 25, name: 'Kahve Dünyası', capacity: 68, branch: 'Kabataş', city: 'İstanbul', country: 'Beşiktaş', address: 'Levent Mah. Büyükdere Cad. No:146', logo: 'https://logowik.com/content/uploads/images/626_kahvedunyasi.jpg', images: ['https://ayhanmuhendislik.com.tr/wp-content/uploads/2021/09/kabatas-kahve-dunyasi-3.jpeg', 'https://media-cdn.tripadvisor.com/media/photo-s/17/77/47/0f/photo0jpg.jpg'] },
    { id: 26, name: 'Kahve Dünyası', capacity: 92, branch: 'Galataport', city: 'İstanbul', country: 'Beyoğlu', address: 'Kılıçali Paşa, Meclis-i Mebusan Cd. No:10, 34425 Beyoğlu/İstanbul', logo: 'https://logowik.com/content/uploads/images/626_kahvedunyasi.jpg', images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw4fLRqxpT0KPlHkr1jCIwpqRonbN31mTeZJMeSvEXvVwqJJBKgqRMARcrx_XxV8bhXK4&usqp=CAU', 'https://mudavim.net/wp-content/uploads/2021/11/kahve-dunyasi-galataport-1-scaled.jpeg'] },
    { id: 27, name: 'Kahve Dünyası', capacity: 78, branch: 'Moda', city: 'İstanbul', country: 'Kadıköy', address: 'Moda Mahallesi, Moda Caddesi Aylin Apartmanı No:188 D:3, 34710 Kadıköy/İstanbul', logo: 'https://logowik.com/content/uploads/images/626_kahvedunyasi.jpg', images: ['https://kahve-pazari.com/wp-content/uploads/2021/03/7-Kahve-Dunyasi-Kadikoy-Medium.jpg', 'https://kadikoytarihicarsi.com/wp-content/uploads/2021/03/kc-kahve-dunyasi1-1024x768.jpg'] },
    { id: 28, name: 'Espressolab', capacity: 250, branch: 'Roastery-Merter', city: 'İstanbul', country: 'Merter', address: 'Tozkoparan Mahallesi General Ali Rıza Gürcan Caddesi Çırpıcı Çıkmazı Sokak No:2 Merter, Güngören/İstanbul', logo: 'https://mir-s3-cdn-cf.behance.net/projects/404/f4feb7135239355.61e94ba480d66.jpg', images: ['https://espressolab.s3.eu-central-1.amazonaws.com/Upload/Sube/Buyuk/1392022-merter-app8-101632.jpg', 'https://espressolab.s3.eu-central-1.amazonaws.com/Upload/Sube/Buyuk/21102022-merter-mimari-app-22-102742.jpg'] },
    { id: 29, name: 'Espressolab', capacity: 92, branch: 'Galataport', city: 'İstanbul', country: 'Beyoğlu', address: 'Kılıçali Paşa, Meclis-i Mebusan Cd. No: 6, 34433 Beyoğlu/İstanbul', logo: 'https://mir-s3-cdn-cf.behance.net/projects/404/f4feb7135239355.61e94ba480d66.jpg', images: ['https://lh3.googleusercontent.com/p/AF1QipP0NiNDFwF1fKNFvgU0GTr_b0RWBd36sr8C5rrq=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipPyJs7WYT8gNd2TvzEpUJQfw6PDvTBVp4zMs9uW=s680-w680-h510'] },
    { id: 30, name: 'Espressolab', capacity: 72, branch: 'Moda', city: 'İstanbul', country: 'Kadıköy', address: 'Caferağa, Moda Cd. No: 171/A, 34710 Kadıköy/İstanbul', logo: 'https://mir-s3-cdn-cf.behance.net/projects/404/f4feb7135239355.61e94ba480d66.jpg', images: ['https://lh3.googleusercontent.com/p/AF1QipNVQE7F3Li_PY_z_VJIJleu1J71Asw5K8_FTEtl=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipOt-wYG-byvHisOygGLZLzBcW_eiOBD_YTpF6By=s680-w680-h510'] },
    { id: 31, name: 'Espressolab', capacity: 68, branch: 'Caddebostan', city: 'İstanbul', country: 'Kadıköy', address: 'Caddebostan, Erenköy Mah, Funda Çk Sk. No: 1, 34738 Kadıköy/İstanbul', logo: 'https://mir-s3-cdn-cf.behance.net/projects/404/f4feb7135239355.61e94ba480d66.jpg', images: ['https://lh3.googleusercontent.com/p/AF1QipM0n6m2K0mDURp5AxndjWDIngsLkT1be0Cbl8GY=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipNVPHp4uNONrbyTQcThJLautXvhn0NaMAfkvbqf=s680-w680-h510'] },
    { id: 32, name: 'Espressolab', capacity: 92, branch: 'Rumeli Hisarı', city: 'İstanbul', country: 'Sarıyer', address: 'Rumeli Hisarı, Yahya Kemal Cd. No: 8, 34450 Sarıyer/İstanbul', logo: 'https://mir-s3-cdn-cf.behance.net/projects/404/f4feb7135239355.61e94ba480d66.jpg', images: ['https://lh3.googleusercontent.com/p/AF1QipMWxnVRxNTpy04YqmvuDvGFYJlDPTwq8SMfR0g5=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipPwlqZ-c6vTUIlpuX8vMLcqxJMcF5hT-oZ2-4eA=s680-w680-h510'] },
    { id: 33, name: 'Gloria Jeans', capacity: 52, branch: 'AVCILAR', city: 'İstanbul', country: 'Avcılar', address: 'MERKEZ MAH. AHMET TANER KIŞLALI CAD. NO:25/A AVCILAR / İSTANBUL AVCILAR - İSTANBUL', logo: 'https://www.gloriajeans.com.tr/assets/images/config/loader.png', images: ['https://gjcsweb.limonistcustomer.com/GJC1979/mobil_tr/imgs/branch_images/1-20180910-163355.jpg', 'https://lh5.googleusercontent.com/p/AF1QipNxsj3QG4jXhkeCCPzru0jJLJs5CLjUDKljFWHD=w500-h500-k-no'] },
    { id: 34, name: 'Gloria Jeans', capacity: 63, branch: 'Aqua Florya', city: 'İstanbul', country: 'Florya', address: 'Şenlikköy, Aqua Florya, 34153 Bakırköy/İstanbul', logo: 'https://www.gloriajeans.com.tr/assets/images/config/loader.png', images: ['https://lh3.googleusercontent.com/p/AF1QipMk-Zx7055RuLLl2oLqtCmAEwduo58as1OlGaAC=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipOlV1ZjhrpCTbdJa9OvVyd5ld3PqxYzjEvnjUqb=s680-w680-h510'] },
    { id: 35, name: 'Gloria Jeans', capacity: 71, branch: 'Yeşilköy', city: 'İstanbul', country: 'Bakırköy', address: 'Yeşilköy, Serbesti Cd. NO:8-10, 34140 Bakırköy/İstanbul', logo: 'https://www.gloriajeans.com.tr/assets/images/config/loader.png', images: ['https://lh3.googleusercontent.com/p/AF1QipMgTlkspbVBWFDZG8OgdDDcc0id2JxUxx0y8IVj=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipN_8CE37AEg1E2kIsHOItQTrdviCREAu5AWkejh=s680-w680-h510'] },
    { id: 36, name: 'Gloria Jeans', capacity: 90, branch: 'Mall of İstanbul', city: 'İstanbul', country: 'Başakşehir', address: 'Ziya Gökalp Mah. Süleyman Demirel Cad. No: 7 Mall Of İstanbul D: 79-280 K: 2, 34480 Başakşehir/İstanbul', logo: 'https://www.gloriajeans.com.tr/assets/images/config/loader.png', images: ['https://lh3.googleusercontent.com/p/AF1QipMnyXl_ves6AyEdbfGAxZok8zkBzIXrw1YrG8T8=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipMLTiBoC4Q3mqX0HmbzoIivUhUOkEHu1ptJ-15e=s680-w680-h510'] },
    { id: 37, name: 'Gloria Jeans', capacity: 69, branch: 'Beşyol', city: 'İstanbul', country: 'Küçükçekmece', address: 'Beşyol, Birlik Cd. No:2, 34295 Küçükçekmece/İstanbul', logo: 'https://www.gloriajeans.com.tr/assets/images/config/loader.png', images: ['https://lh3.googleusercontent.com/p/AF1QipNroFXdQBnuS9e9tJGGGdVRbrQUY2Eb_w8teRyF=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipPEpkOrA4Kwy0PnXdzjBoO-CkivrLzTPaZ_aTD0=s680-w680-h510'] },
    { id: 38, name: 'MENDELs Chocolatier', capacity: 62, branch: 'Akaretler', city: 'İstanbul', country: 'Beşiktaş', address: 'Sinanpaşa, Şair Nedim Cd. 18/A, 34357 Beşiktaş/İstanbul', logo: 'https://media.licdn.com/dms/image/D5603AQEfFQj6EqPWEg/profile-displayphoto-shrink_800_800/0/1666364351459?e=2147483647&v=beta&t=YKKXC5pNXImNj35J2Eda7medq2MjuYKVpMBx22-wvUY', images: ['https://media-cdn.tripadvisor.com/media/photo-p/13/de/fd/ea/largejpg.jpg', 'https://biyudum.com/images/vitrin/v24fe35eeb.jpg'] },
    { id: 39, name: 'Viyana Kahvesi', capacity: 65, branch: 'Fişekhane', city: 'İstanbul', country: 'Zeytinburnu', address: 'Kazlıçeşme, No:52T İç Kapı, Kennedy Cad. No: B03, 34020 Zeytinburnu/İstanbul', logo: 'https://upload-isinolsun-com.mncdn.com/Company/Job/2023/12/22/750222520231222015850547.jpg', images: ['https://viyanakahvesi.com/wp-content/uploads/2022/10/BAGDAT-CADDESI-scaled.jpg', 'https://viyanakahvesi.com/wp-content/uploads/2021/07/viyana-kahvesi-kosuyolu.gif'] },
    { id: 40, name: 'Viyana Kahvesi', capacity: 72, branch: 'Beşiktaş', city: 'İstanbul', country: 'Beşiktaş', address: 'Sinanpaşa, Yeni Hamam Sk. No:4, 34353 Beşiktaş/İstanbul', logo: 'https://upload-isinolsun-com.mncdn.com/Company/Job/2023/12/22/750222520231222015850547.jpg', images: ['https://viyanakahvesi.com/wp-content/uploads/2021/07/viyana-kahvesi-besiktas.gif', 'https://biyudum.com/images/slider/s21k9y31lk.jpg'] },
    { id: 41, name: 'Viyana Kahvesi', capacity: 52, branch: 'GALATA', city: 'İstanbul', country: 'Beyoğlu', address: 'Bereketzade, Büyük Hendek Cd. No:19/A, 34421 Beyoğlu/İstanbul', logo: 'https://upload-isinolsun-com.mncdn.com/Company/Job/2023/12/22/750222520231222015850547.jpg', images: ['https://lh3.googleusercontent.com/p/AF1QipNAF4nVYQDfbJ4zSAmcGzILkxYDz1pUGGH-9cho=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipPGrbm-8exOKCJyFLcnHvtkTbppsoy-uMkD9CuV=s680-w680-h510'] },
    { id: 42, name: 'Viyana Kahvesi', capacity: 91, branch: 'Kadıköy', city: 'İstanbul', country: 'Kadıköy', address: 'Caferağa mah. Neşet Ömer sok Kadıköy İş Merkezi No: 1/B307, 34710 Kadıköy', logo: 'https://upload-isinolsun-com.mncdn.com/Company/Job/2023/12/22/750222520231222015850547.jpg', images: ['https://lh3.googleusercontent.com/p/AF1QipMfaebpykE5ElpLgY3a5-QuXhAaf_2tCkhMELfn=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipM6z6aUpj7mbvy8KB-AQm46sOzM-JPWwiw6_J_N=s680-w680-h510'] },
    { id: 43, name: 'Viyana Kahvesi', capacity: 78, branch: 'VIALAND AVM', city: 'İstanbul', country: 'Eyüpsultan', address: 'Yeşilpınar, Şht. Metin Kaya Sk. No: 11, 34065 Eyüpsultan/İstanbul', logo: 'https://upload-isinolsun-com.mncdn.com/Company/Job/2023/12/22/750222520231222015850547.jpg', images: ['https://lh3.googleusercontent.com/p/AF1QipNUsFjoOPzVN_yH-96MiTMwgUhRQC5poiGYrtaV=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipPn1vqs9D8pMtvl87E3hAx0Gmc0_0iQlaX-Q8UP=s680-w680-h510'] },
  ];
const CaffeDetailPage = () => {

    const { id } = useParams();
    const [caffe, setCaffe] = useState<Caffe | null>(null)
    const [isOpenFormModal, setOpenFormModal] = useState<boolean>(false)
    const [isOpenFormNegativeModal, setOpenFormNegativeModal] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(20)       //yolodan gelecek
    const [thinkingGoCounter, setThinkingGoCounter] = useState<number>(8)

    useEffect(() => {
        const fetchCaffeData = () => {
            const foundCaffe = caffes.find((coffeeShop) => coffeeShop.id === Number(id));
            if (foundCaffe) {
                setCaffe(foundCaffe);
                console.log(foundCaffe)
            } else {
                console.error(`Coffee shop with id ${id} not found.`);
            }
        };
        fetchCaffeData();
    }, [id, counter])


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
            localStorage.setItem('come', 'true');
            setThinkingGoCounter((prevState) => prevState + 1)
            setOpenFormModal(false)
        }}>Evet</AiDButton>,
        <AiDButton onClick={() => {
            setOpenFormModal(false)
        }}>Hayır</AiDButton>

    ]

    const formNegativeButtons = [
        <AiDButton onClick={() => {
            localStorage.removeItem('come')
            setThinkingGoCounter((prevState) => prevState - 1)
            setOpenFormNegativeModal(false)
        }}>Evet</AiDButton>,
        <AiDButton onClick={() => {
            setOpenFormNegativeModal(false)
        }}>Hayır</AiDButton>
    ]

    return (
        <div className='caffe-place-container'>
            <Row justify={'space-evenly'}>
                <Col>
                    <Space align='start' size={'large'}>
                        <img src={caffe?.logo} alt='photo_logo' width={300} />
                        <Space direction='vertical'>
                            <TitleText text={caffe?.branch || ''} />
                            <SubtitleText text={`Adres: ${caffe?.address}`} />
                            <SubtitleText text={`Kapasite: ${caffe?.capacity}`} />
                            <SubtitleText text={`Şu An Mevcut Kişi Sayısı: ${counter}`} />
                            {
                                localStorage.getItem('come') === 'true'
                                    ? <SubtitleText text={`Siz ve ${thinkingGoCounter-1} kişi buraya gelmeyi düşünüyor`} />
                                    : <SubtitleText text={` ${thinkingGoCounter} kişi buraya gelmeyi düşünüyor`} />

                            }

                            <Space>
                                {
                                    localStorage.getItem('come') === 'true' 
                                    ? <div style={{ cursor: "pointer" }} onClick={() => {
                                        setOpenFormNegativeModal(true)
                                    }}>
                                        <p style={{color:"red"}}>Gelme durumunuz değişti mi ? </p>
                                    </div>
                                    : <div style={{ cursor: "pointer" }} onClick={() => {
                                        setOpenFormModal(true)
                                    }}>
                                        <p >Buraya gitmeyi düşünüyor musun ? </p>
                                    </div>
                                }
                            </Space>
                        </Space>

                    </Space>
                </Col>
                <Col>
                
                <Progress
                        type="circle"
                        percent={Math.floor(counter * 100 / (caffe?.capacity || 60))}
                    />

                </Col>
            </Row>
            <Divider />
            <Row justify={'start'} style={{ paddingLeft: "198px" }}>
                <Col><TitleText text='Mekana Ait Görseller' /></Col>
            </Row>
            <Row justify={'start'} style={{ paddingLeft: "198px", paddingTop: "24px" }}>
                <Col>
                    <Space size={'large'}>
                        {
                            caffe?.images?.map((caf) => (<img src={caf} width={300} alt='' />))
                        }
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

export default CaffeDetailPage