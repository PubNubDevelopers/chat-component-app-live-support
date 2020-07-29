import React, {useCallback, FunctionComponent, useReducer, useEffect, useState, useContext, useRef} from 'react'
import {ActiveUsersListWrapper, ActiveUsersHeader} from './ActiveUsersList.styles'
import {ActiveUser} from '../ActiveUser/ActiveUser'
import {useAppState} from '../../AppStateContext'
import {useScrollPosition} from '@n8tb1t/use-scroll-position'

interface ActiveUsersListProps {
  activeUser?: Array<any>
}

export const ActiveUsersList: React.SFC<ActiveUsersListProps> = (props: ActiveUsersListProps) => {
  const { state } = useAppState();
  const [stopOnScroll, setStopOnScroll] = useState(false);
  const activeUserEndRef = useRef<null | HTMLDivElement>(null) //This is our reference to the instance of this component in the DOM
 
  const scrollToBottom = () => {
    activeUserEndRef?.current?.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" });
  }

  useScrollPosition(({ prevPos, currPos }) => {
    const isShow = currPos.y > prevPos.y
    console.log(`${isShow}`);
    if (isShow !== stopOnScroll) setStopOnScroll(isShow)
  }, [])

  useEffect(scrollToBottom, [state.activeUsers])

  const ActiveUsers = Array.from(state.activeUsers).map((activeUserName: string, i: number) => {
    return (
      <React.Fragment key={i}>
        <ActiveUser activeUser={activeUserName} />
        <div ref={activeUserEndRef} />
      </React.Fragment>
    );
  });

  return <><ActiveUsersHeader>Active Users</ActiveUsersHeader><ActiveUsersListWrapper>{ActiveUsers}</ActiveUsersListWrapper></>
}
