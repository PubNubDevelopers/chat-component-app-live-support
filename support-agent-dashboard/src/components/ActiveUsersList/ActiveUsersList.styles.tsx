import styled from 'styled-components'

export const ActiveUsersListWrapper = styled.div`
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
  position: absolute;
  margin-top: 20px;
  top: 0;
  left: 0;
  height: 40px;
  width: 185px;
  text-align: center;
  border-bottom: 1px solid black;
  font-weight: bold;
`

export const ActiveUsersOccupancy = styled.div`
  width: auto;
  background-color: rgb(247, 247, 247);
  border-radius: 10px;
  display: inline;
  margin-right: 10px;
  margin-left: 10px;
  padding: 7px;
  text-align: center;
`
