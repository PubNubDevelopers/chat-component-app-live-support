import React, {useContext} from 'react'
import {Wrapper} from './style'
import {ChatDemo} from './components/ChatDemo/ChatDemo'

interface ApplicationRouterInitProps {}

export const ApplicationRouter = (props: ApplicationRouterInitProps) => {
  return (
    <Wrapper>
        <ChatDemo />
    </Wrapper>
  )
}
