import styled from 'styled-components'

export const ActiveUserWrapper = styled.div`
  width: 185px;
  padding-bottom: 40px;
  flex-shrink: 0;
  border-bottom: 1px dashed black;
`

export const ActiveUserWrapperSelected = styled.div`
  width: 185px;
  padding-bottom: 40px;
  flex-shrink: 0;
  background: rgb(247,247,247);
  border-bottom: 1px dashed black;
`

export const ActiveUserNameWrapper = styled.span`
  top: 10px;
  left: 20px;
  width: 50px;
  height: 30px;
  position: relative;
`

export const ActiveUserAvatarWrapper = styled.img`
  top: 20px;
  left: 7px;
  height: 30px;
  width: auto;
  position: relative;
`
