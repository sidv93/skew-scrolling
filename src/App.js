import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import images from './assets/images';
import useWindowResize from './useWindowResize';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
const ScrollContainer = styled.div`
  padding: 2vh 0;
  pointer-events: none;
`;
const ImageContainer = styled.div`
    width: 700px;
    height: 420px;
    overflow: hidden;
    position: relative;
    margin: 400px auto;
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(1) {
      margin-top: 200px;
    }
    &:last-child {
      margin-bottom: 200px;
    }
`;
const Image = styled.img`
    width: 100%;
    position: absolute;
`;
const Skew = styled.h2`
  font-size: 8rem;
  text-align: center;
  margin: 40px auto;
`;
const Scrolling = styled.span`
  -webkit-text-stroke: 1px black;
  -webkit-text-fill-color: #fff;
`;

function App() {
  const size = useWindowResize();
  const app = useRef();
  const scrollContainer = useRef();

  const skewConfig = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0
  };

  const skewScrolling = () => {
    skewConfig.current = window.scrollY;
    skewConfig.previous += (skewConfig.current - skewConfig.previous) * skewConfig.ease;
    skewConfig.rounded = Math.round(skewConfig.previous * 100) / 100;

    const difference = skewConfig.current - skewConfig.rounded;
    const acceleration = difference / size.width;
    const velocity = +acceleration;
    const skew = velocity * 10.5;

    scrollContainer.current.style.transform = `translateY(-${skewConfig.rounded}px) skewY(${skew}deg)`;

    requestAnimationFrame(() => skewScrolling());
  };

  useEffect(() => {
    requestAnimationFrame(() => skewScrolling());
  }, []);

  useEffect(() => {
    document.body.style.height = `${scrollContainer.current.getBoundingClientRect().height}px`;
  }, [size.height]);

  return (
    <Container ref={app}>
      <ScrollContainer ref={scrollContainer}>
        {
          images.map((image, index) => (
            <>
              <ImageContainer>
                <Image src={image} alt={`people ${index}`} />
              </ImageContainer>
              <Skew>
                Skew <Scrolling>Scrolling</Scrolling>
              </Skew>
            </>
          ))
        }
      </ScrollContainer>
    </Container>
  );
}

export default App;
