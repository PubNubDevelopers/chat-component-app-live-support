import React, {useReducer, useEffect, useRef} from 'react'
import {MessageListPanelWrapper} from './MessageListPanel.styles'
import {
  TextInputWrapper,
  ComposeMessageBoxWrapper,
  UserImgWrapper,
  EmojiInputWrapper,
} from '../ComposeMessageBox/ComposeMessageBox.styles'
import {MessageList} from '../MessageList/MessageList'
import {useAppState} from '../../AppStateContext'
import {ComposeMessageBox, SendMessageField} from '../ComposeMessageBox/ComposeMessageBox'

interface MessageListPanelProps {}

export const MessageListPanel: React.SFC<MessageListPanelProps> = (props: MessageListPanelProps) => {
  //const [state, dispatch] = useReducer(appStateReducer, appData)
  const {state, dispatch} = useAppState()
  return (
    <div>
      <MessageList />
      <ComposeMessageBoxWrapper>
        <UserImgWrapper src={state.selfAvatar} />
        <TextInputWrapper>
          <SendMessageField />
        </TextInputWrapper>
        {/*<EmojiInputWrapper src="/images/emojiInput@3x.png" />*/}
      </ComposeMessageBoxWrapper>
    </div>
  )
}
