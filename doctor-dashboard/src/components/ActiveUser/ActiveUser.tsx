import React, {useReducer, useEffect} from 'react'
import {ActiveUserWrapper, ActiveUserWrapperSelected, ActiveUserAvatarWrapper, ActiveUserNameWrapper} from './ActiveUser.styles'
import {useAppState} from '../../AppStateContext'

interface ActiveUserProps {
  activeUser: string
}

export const ActiveUser: React.SFC<ActiveUserProps> = (props: ActiveUserProps) => {
  	const {state, dispatch} = useAppState()
  	const ActiveAvatarURL = "https://ui-avatars.com/api/?name="+props.activeUser+"?size=100&rounded=true&uppercase=true&bold=true&background=5EB977&color=FFF";
	
	const handleChannelChange = (event) => {
    	dispatch({
			type: 'CHANGE_CHANNEL',
			payload: props.activeUser,
		})
  	}

  	if ("support."+props.activeUser == state.activeChannel) {
	  	return (
			<ActiveUserWrapperSelected onClick={handleChannelChange}>
				<ActiveUserAvatarWrapper src={ActiveAvatarURL} />
				<ActiveUserNameWrapper>{props.activeUser}</ActiveUserNameWrapper>
			</ActiveUserWrapperSelected>
		)
  	}
	return (
		<ActiveUserWrapper onClick={handleChannelChange}>
			<ActiveUserAvatarWrapper src={ActiveAvatarURL} />
			<ActiveUserNameWrapper>{props.activeUser}</ActiveUserNameWrapper>
		</ActiveUserWrapper>
	)
}
