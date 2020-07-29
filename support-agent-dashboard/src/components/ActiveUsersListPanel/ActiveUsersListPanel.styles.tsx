import styled from 'styled-components'

export const ActiveUsersListPanelWrapper = styled.div`
  width: 150px;
  height: 100%;
  top: 0px;
  z-index: 50;
  opacity: 0.7;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  -o-background-size: contain;
  background-size: contain;
  object-fit: contain;
  //background: url("images/scaffolding2.png") center repeat;
  //background-color: rgba(0, 255, 0, 1);
  background-blend-mode: hard-light;
  border-right: 1px solid white;
`

export const ActiveUsersHeader = styled.div`
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 100%;
  text-align: center;
`