import styled from 'styled-components'

export const MessageWrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
  flex-shrink: 0;
`

export const MessageMessageWrapper = styled.span`
  top: 20px;
  width: 100%;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
`

export const MessageMessageInnerWrapper = styled.span`
  max-width: 100%;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: inline;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: true
  white-space: nowrap;
  background: #79787C 0% 0% no-repeat padding-box;
  border-radius: 0px 31px 31px 31px;
  border: 1px solid #FFFFFF;
  padding: 15px;
  margin: 15px 15px 15px 35px;
  color: white;
`

export const SenderNameWrapper = styled.span`
  top: 5px;
  left: 20px;
  width: 100%;
  height: 30px;
  position: relative;
`

export const AvatarWrapper = styled.img`
  top: 20px;
  left: 7px;
  height: 40px;
  width: auto;
  position: relative;
`

export const MessageMessageWrapperSelf = styled.span`
  top: 20px;
  width: 100%;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-end;
`

export const MessageMessageInnerWrapperSelf = styled.span`
  max-width: 100%;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: inline;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: true
  white-space: nowrap;
  background: #6387ED 0% 0% no-repeat padding-box;
  border-radius: 31px 0px 31px 31px;
  border: 1px solid #FFFFFF;
  padding: 15px;
  margin: 15px 35px 15px 15px;
  color: white;
  display: flex;
  justify-content: flex-end;
`

export const SenderNameWrapperSelf = styled.span`
  top: 30px;
  right: 20px;
  width: 50px;
  height: 30px;
  width: auto;
  position: relative;
`

export const RightWrapper = styled.span`
  display: flex;
  justify-content: flex-end;
`

export const AvatarWrapperSelf = styled.img`
  top: 20px;
  right: 7px;
  height: 40px;
  width: 40px;
  position: relative;
`
