import styled from 'styled-components';

export const StyledComponents = () => {    

    const StyledButton = styled.button`
    padding: 1rem 2rem 1rem 2rem;
    align-items: center;
    border-radius: 5rem;
    border: none;
    display: inline-block;
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    font-size: 19px;
    color: black;
    z-index: 1;
    cursor: pointer;
  `

  const StyledButtonb4 = styled.button`
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 0%;
  bottom: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
  `



const Container = styled.Container`
     display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100vw;
      background-color: #1db954;
      background: rgb(29, 185, 84);
      background: linear-gradient(
        45deg,
        rgba(29, 185, 84, 1) 0%,
        rgba(25, 20, 20, 1) 100%
      );
      gap: 5rem;
      img: height: 20vh;
      `;   

   const StyledButtonAfter = styled.button`
        content: "";
        position: absolute;
        left: 55%;
        transform: translateX(-50%) scaleY(1) scaleX(1.45);
        top: 180%;
        width: 160%;
        height: 190%;
        background-color: #1db954;
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
        z-index: -1;
      `
    
    const StyledButtonhover = styled.button`
        color: #ffffff;
        border: 1px solid #1db954;
    `
    
   const StyledButtonhoverb4 = styled.button`
        top: -35%;
        background-color: #1db954;
        transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
      `
    const StyledButtonhoverAfter = styled.button`
        top: -45%;
        background-color: #1db954;
        transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
      `
    

    return {StyledButton, StyledButtonb4, Container, StyledButtonAfter, StyledButtonhover, StyledButtonhoverb4, StyledButtonhoverAfter}}