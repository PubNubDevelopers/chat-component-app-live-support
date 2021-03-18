import React, {useEffect, useReducer, useState, useContext} from 'react'
import {ChatDemoWrapper} from './ChatDemo.style'
import {MessageListPanel} from '../MessageListPanel'
import {MessageListPanelWrapper} from '../MessageListPanel/MessageListPanel.styles'
import {ActiveUsersListPanel} from '../ActiveUsersListPanel'
import {ActiveUsersListPanelWrapper} from '../ActiveUsersListPanel/ActiveUsersListPanel.styles'

interface ChatInitProps {
  //You can set props here to send to the ChatDemo component.
  //propexample? : string,
}

export const ChatDemo: React.SFC<ChatInitProps> = (props: ChatInitProps) => {
  return (
    <ChatDemoWrapper>
      <ActiveUsersListPanelWrapper>
        <ActiveUsersListPanel />
      </ActiveUsersListPanelWrapper>
      <MessageListPanelWrapper>
        <MessageListPanel />
      </MessageListPanelWrapper>
    </ChatDemoWrapper>
  )
}
