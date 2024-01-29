import { Modal, ModalProps } from 'antd'
import React from 'react'

export interface AidModalProps extends ModalProps {
    children?: JSX.Element;
    show: boolean;
    buttons?: JSX.Element[];
    buttonPosition?:'horizontal'|'vertical';
}

const AidModal = (props: AidModalProps) => {

    return (
        <Modal {...props} open={props.show} closable={true} footer={null}>
            {props.children}
        </Modal>
    )
}

export default AidModal