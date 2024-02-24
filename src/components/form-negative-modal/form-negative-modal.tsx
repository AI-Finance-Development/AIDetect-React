import React from 'react'
import AidModal, { AidModalProps } from '../aid-modal/aid-modal'
import { Space } from 'antd'
import TitleText from '../title-text/title-text'
import SubtitleText from '../subtitle-text/subtitle-text'

export interface FormNegativeModalProps extends AidModalProps {}

const FormNegativeModal = (props: FormNegativeModalProps) => {
  return (
    <AidModal {...props}>
    <div className='form-container'>
        <Space direction='vertical' >
            <TitleText text='Have you given up? ' />
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

export default FormNegativeModal