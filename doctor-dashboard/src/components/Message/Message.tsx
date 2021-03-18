import React from 'react'
import {MessageMessageInnerWrapper, RightWrapper, MessageMessageWrapper, MessageMessageInnerWrapperSelf, MessageMessageWrapperSelf, MessageWrapper, AvatarWrapper, SenderNameWrapper, AvatarWrapperSelf, SenderNameWrapperSelf} from './Message.styles'
import {useAppState} from '../../AppStateContext'

interface MessageProps {
  message: Array<string>
}

export const Message: React.SFC<MessageProps> = (props: MessageProps) => {
	const { state } = useAppState();

	if (props.message.senderName == state.selfName) { // Display messages from yourself on the right.
      const userAvatar = "https://uc.uxpin.com/files/879252/879907/asian_young_main_group_hospital_professional-c0ba747cc87f47e9e774a98d96ab200e.png";
      return (
	    	<MessageWrapper key={props.message.internalKey}>
	  			<RightWrapper>
					<SenderNameWrapperSelf>{props.message.senderName}</SenderNameWrapperSelf>
				  	<AvatarWrapperSelf src={userAvatar} />
				</RightWrapper>
				 <MessageMessageWrapperSelf><MessageMessageInnerWrapperSelf>{props.message.message}</MessageMessageInnerWrapperSelf></MessageMessageWrapperSelf>
			</MessageWrapper>
		)
	} else {
		let userAvatar = "https://ui-avatars.com/api/?name="+props.message.senderName+"?size=100&rounded=true&uppercase=true&bold=true&background=5EB977&color=FFF";
		if (props.message.senderName == "Doctor Dashboard Alert"){ // Use red for alerts
			userAvatar = "https://ui-avatars.com/api/?name=%21+%21?size=100&rounded=true&uppercase=true&bold=true&background=FF6B56&color=FF6B56";
		}
		return (
			<MessageWrapper key={props.message.internalKey}>
			  	<AvatarWrapper src={userAvatar} />
			  	<SenderNameWrapper>{props.message.senderName}</SenderNameWrapper>
				<MessageMessageWrapper><MessageMessageInnerWrapper>{props.message.message}</MessageMessageInnerWrapper></MessageMessageWrapper>
			</MessageWrapper>
		)
	}
}
