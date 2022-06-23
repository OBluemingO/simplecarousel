import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CarouselWrap = styled.div`
  display: flex;
  width: 1000px;
  position: relative;
`;

const Card = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const CardContent = styled.div`
  display: flex;
  gap: 10px;
  transition: all 250ms linear;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${({ show }) =>
    show >= 4
      ? css`
          width: calc(100% / 4);
        `
      : show >= 3
      ? css`
          width: calc(100% / 3);
        `
      : show === 2
      ? css`
          width: 50%;
        `
      : null}

  ::-webkit-scrollbar {
    display: none;
  }

  * {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
  }
`;

const Button = styled.button`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: white;
  border: 1px solid #ddd;
`;

const Carousel = ({ children, show, infiniteLoop }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  
  // ? bool
  const [isRepeating, setIsRepeating] = useState(
    infiniteLoop && children.length > show
  );
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // ? first dom update
  useEffect(() => {
    setLength(children.length);
    setIsRepeating(infiniteLoop && children.length > show)
  }, [children, show, infiniteLoop]);

  // ? when state have something change 
  useEffect(() => {
    if (isRepeating) {
      if (currentIndex === show || currentIndex === length) {
        setTransitionEnabled(true);
      }
    }
  }, [currentIndex, isRepeating, show, length]);

  // ? handle click next card
  const next = () => {
    // ? if loop or จำต่ำเเหน่งปัจจุบันที่ น้อยกว่า จำนวนทั้งหมดของ card - กับจำนวนที่เราต้องการจะ show , case !!!!  0 < 9 - 3  ..... true
    if (isRepeating || currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  // ? handle click prev card
  const prev = () => {
    // ? if loop or จำต่ำเเหน่งปัจจุบันไม่เป็นจำนวนลบ
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (isRepeating) {
      // ? when idx at first position
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(length);
      // ? when idx at last position
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false);
        setCurrentIndex(show);
      }
    }
  };

  const renderExtraPrev = () => {
    let output = [];
    for (let index = 0; index < show; index++) {
      // 6 - 1 - 0 = 5
      // 6 - 1 - 1 = 4
      output.push(children[length - 1 - index]);
    }
    output.reverse();
    return output;
  };

  const renderExtraNext = () => {
    let output = [];
    for (let index = 0; index < show; index++) {
      // 0 
      // 1
      output.push(children[index]);
    }
    return output;
  };

  return (
    <Container>
      <CarouselWrap>
        <Button onClick={prev} style={{ left: "24px" }}>
          {"<"}
        </Button>
        <Card>
          <CardContent
            show={show}
            style={{
              transform: `translateX(-${currentIndex * (100 + 3)}%)`,
              transition: !transitionEnabled ? "none" : undefined,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {length > show && isRepeating && renderExtraPrev()}
            {children}
            {length > show && isRepeating && renderExtraNext()}
          </CardContent>
        </Card>
        <Button onClick={next} style={{ right: "24px" }}>
          {">"}
        </Button>
      </CarouselWrap>
    </Container>
  );
};

export default Carousel;
