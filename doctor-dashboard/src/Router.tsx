import React, {useContext} from 'react'
import {Wrapper} from './style'
import {ChatDemo} from './components/ChatDemo/ChatDemo'
import {AppStateProvider} from './AppStateContext'

interface ApplicationRouterInitProps {}

export const ApplicationRouter = (props: ApplicationRouterInitProps) => {
  return (
    <Wrapper>
        <ChatDemo />
    </Wrapper>
  )
}
