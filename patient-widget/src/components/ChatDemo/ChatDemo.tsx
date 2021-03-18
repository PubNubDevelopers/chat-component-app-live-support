import React, {useEffect, useState, useContext} from 'react'
import {ChatDemoWrapper} from './ChatDemo.style'
import {MessageListPanel} from '../MessageListPanel'
import {MessageListPanelWrapper} from '../MessageListPanel/MessageListPanel.styles'
import {useAppState, AppStateProvider, AppStateContext} from '../../AppStateContext'

interface ChatInitProps {
  //You can set props here to send to the ChatDemo component.
  //propexample? : string,
}

export const ChatDemo: React.SFC<ChatInitProps> = (props: ChatInitProps) => {
  return (
    <ChatDemoWrapper>
      <MessageListPanelWrapper>
        <MessageListPanel />
      </MessageListPanelWrapper>
    </ChatDemoWrapper>
  )
}
