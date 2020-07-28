import React from 'react'
import {MessageMessageWrapper, MessageWrapper, AvatarWrapper, SenderNameWrapper} from './Message.styles'

interface MessageProps {
  message: Array<string>
}

export const Message: React.SFC<MessageProps> = (props: MessageProps) => {
  return (
    <MessageWrapper key={props.message.internalKey}>
      <AvatarWrapper src={props.message.userAvatar} />
      <SenderNameWrapper>{props.message.senderName}</SenderNameWrapper>
      <MessageMessageWrapper>{props.message.message}</MessageMessageWrapper>
    </MessageWrapper>
  )
}
