import React, {useReducer, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {UserImgWrapper} from './ComposeMessageBox.styles'
import {useAppState} from '../../AppStateContext'

interface ComposeMessageBoxProps {}
export const ComposeMessageBox: React.SFC<ComposeMessageBoxProps> = (props: ComposeMessageBoxProps) => {
  return (
    <>
      <SendMessageField></SendMessageField>
    </>
  )
}
interface SendMessageProps {}

export const SendMessageField = () => {
  const textAreaEl = useRef(null)
  const {state, dispatch} = useAppState()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch({
        type: 'SEND_MESSAGE',
        payload: textAreaEl.current.value,
      })
      textAreaEl.current.value = ''
    }
    // textAreaEl.current.value =  "";
    // textAreaEl.current.focus();
  }

  return (
    <section
      style={{
        textAlign: 'center',
        paddingTop: '12px',
        top: '-4px',
        width: '100%',
        height: '46px',
        position: 'relative',
        borderWidth: '0px',
        borderRadius: '230px',
        backgroundColor: 'white',
        color: 'white',
      }}
    >
      <input
        onKeyPress={handleKeyDown}
        style={{
          position: 'absolute',
          fontSize: 'larger',
          width: '100%',
          borderWidth: '0px',
          borderRadius: '230px',
          backgroundColor: 'white',
          top: '0',
          left: '0',
          paddingLeft: '20px',
          paddingRight: '60px',
          height: '45px',
        }}
        maxLength="250"
        ref={textAreaEl}
        autoComplete="off"
        placeholder="Tell us how we can help..."
        id="messageContent"
      />
    </section>
  )
}
