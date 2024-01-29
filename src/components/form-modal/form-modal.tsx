import React from 'react'
import './form-modal.css'
import AidModal, { AidModalProps } from '../aid-modal/aid-modal'
import { Space } from 'antd'
import TitleText from '../title-text/title-text'
import SubtitleText from '../subtitle-text/subtitle-text'

export interface FormModalProps extends AidModalProps {
    buttons?: JSX.Element[];
    buttonPosition?:'horizontal'|'vertical';
}

const FormModal = (props: FormModalProps) => {

    return (
        <AidModal {...props}>
            <div className='form-container'>
                <Space direction='vertical' >
                    <TitleText text='Buraya gelecek misiniz ? ' />
                    <SubtitleText text='Bu mekana mesafeniz 16 dakika olarak ölçülmüştür' />
                </Space>
                {props.buttons && (
                    <div
                        className={'buttonsContainer'}
                        style={
                            props.buttonPosition === 'horizontal'
                                ? { flexDirection: 'row' }
                                : { flexDirection: 'column' }
                        }
                    >
                        {props.buttons}
                    </div>
                )}
            </div>
        </AidModal>
    )
}

export default FormModal