import styled from 'styled-components'

export const ActiveUsersListWrapper = styled.div`
  color: white;
  list-style: none;
  overflow-y: scroll;
  word-break: break-all;
  word-wrap: break-word;
  max-height: 100%;
  position: absolute;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: left;
`

export const ActiveUsersHeader = styled.div`
  color: white;
  position: absolute;
  margin-top: 20px;
  top: 0;
  left: 0;
  height: 40px;
  width: 150px;
  text-align: center;
  border-bottom: 1px solid white;
  font-weight: bold;
`