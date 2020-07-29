import styled from 'styled-components'

export const MessageWrapper = styled.div`
  width: 100%;
  padding-right: 75px;
  padding-bottom: 10px;
  margin-bottom: 50px;
  flex-shrink: 0;
`

export const MessageMessageWrapper = styled.span`
top: 20px;
left: 50px;
width: 100%;
position: relative;
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
overflow: hidden;
text-overflow: ellipsis;
overflow-wrap: true
white-space: nowrap;
background: #323233 0% 0% no-repeat padding-box;
border-radius: 0px 31px 31px 31px;
border: 1px solid #FEFFFE;
padding: 15px;
`

export const SenderNameWrapper = styled.span`
  top: 5px;
  //margin-left: 7px;
  left: 20px;
  width: 50px;
  //display: inline;
  height: 30px;
  width: auto;
  //display: flex;
  position: relative;
`

export const AvatarWrapper = styled.img`
  top: 20px;
  //margin-left: 14px;
  left: 7px;
  //display: inline;
  height: 40px;
  width: auto;
  position: relative;
`
