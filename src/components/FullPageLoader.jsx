import styled from "styled-components";

export default function FullPageLoader() {
  return (
    <Container>
      <div className="loader" />
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  // background: rgba(255, 255, 255, 0.8);
  top: 0;
  left: 0;

  .loader {
    width: 22px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #f10c49;
    animation: l10 1.5s infinite linear;
  }
  @keyframes l10 {
    0% {
      box-shadow: 0 -30px #f4dd51, calc(30px * 0.707) calc(-30px * 0.707) #e3aad6, 30px 0 #f4dd51, 0 0 #e3aad6,
        0 0 #f4dd51, 0 0 #e3aad6, 0 0 #f4dd51, 0 0 #e3aad6;
    }
    12.5% {
      box-shadow: 0 0 #f4dd51, calc(30px * 0.707) calc(-30px * 0.707) #e3aad6, 30px 0 #f4dd51,
        calc(30px * 0.707) calc(30px * 0.707) #e3aad6, 0 0 #f4dd51, 0 0 #e3aad6, 0 0 #f4dd51, 0 0 #e3aad6;
    }
    25% {
      box-shadow: 0 0 #f4dd51, 0 0 #e3aad6, 30px 0 #f4dd51, calc(30px * 0.707) calc(30px * 0.707) #e3aad6,
        0 30px #f4dd51, 0 0 #e3aad6, 0 0 #f4dd51, 0 0 #e3aad6;
    }
    37.5% {
      box-shadow: 0 0 #f4dd51, 0 0 #e3aad6, 0 0 #f4dd51, calc(30px * 0.707) calc(30px * 0.707) #e3aad6, 0 30px #f4dd51,
        calc(-30px * 0.707) calc(30px * 0.707) #e3aad6, 0 0 #f4dd51, 0 0 #e3aad6;
    }
    50% {
      box-shadow: 0 0 #f4dd51, 0 0 #e3aad6, 0 0 #f4dd51, 0 0 #e3aad6, 0 30px #f4dd51,
        calc(-30px * 0.707) calc(30px * 0.707) #e3aad6, -30px 0 #f4dd51, 0 0 #e3aad6;
    }
    62.5% {
      box-shadow: 0 0 #f4dd51, 0 0 #e3aad6, 0 0 #f4dd51, 0 0 #e3aad6, 0 0 #f4dd51,
        calc(-30px * 0.707) calc(30px * 0.707) #e3aad6, -30px 0 #f4dd51, calc(-30px * 0.707) calc(-30px * 0.707) #e3aad6;
    }
    75% {
      box-shadow: 0 -30px #f4dd51, 0 0 #e3aad6, 0 0 #f4dd51, 0 0 #e3aad6, 0 0 #f4dd51, 0 0 #e3aad6, -30px 0 #f4dd51,
        calc(-30px * 0.707) calc(-30px * 0.707) #e3aad6;
    }
    87.5% {
      box-shadow: 0 -30px #f4dd51, calc(30px * 0.707) calc(-30px * 0.707) #e3aad6, 0 0 #f4dd51, 0 0 #e3aad6, 0 0 #f4dd51,
        0 0 #e3aad6, 0 0 #f4dd51, calc(-30px * 0.707) calc(-30px * 0.707) #e3aad6;
    }
    100% {
      box-shadow: 0 -30px #f4dd51, calc(30px * 0.707) calc(-30px * 0.707) #e3aad6, 30px 0 #f4dd51, 0 0 #e3aad6,
        0 0 #f4dd51, 0 0 #e3aad6, 0 0 #f4dd51, 0 0 #e3aad6;
    }
  }
`;
