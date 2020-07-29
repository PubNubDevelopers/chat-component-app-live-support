import React, {useReducer, useEffect, useRef} from 'react'
import {ActiveUsersList} from '../ActiveUsersList/ActiveUsersList'
import {ActiveUsersListPanelWrapper} from './ActiveUsersListPanel.styles'

interface ActiveUsersListPanelProps {}

export const ActiveUsersListPanel: React.SFC<ActiveUsersListPanelProps> = (props: ActiveUsersListPanelProps) => {
  return (
    <div>
        <ActiveUsersList />
    </div>
  )
}
