import { Button, ButtonProps } from 'antd'
import React from 'react'

export interface AiDButtonProps extends ButtonProps {

}

const AiDButton = (props: AiDButtonProps) => {
  return (
    <Button {...props} size='large' style={{width:"100%"}}>
      {props.children}
    </Button>
  )
}

export default AiDButton