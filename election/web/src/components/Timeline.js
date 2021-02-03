import clamp from "lodash/clamp";
import React, { useState } from "react";
import { useSprings, useTransition, animated, config } from "react-spring";
import { useMeasure, useKeyPressEvent } from "react-use";
import { useDrag } from "react-use-gesture";

const Timeline = ({ setIsTimelineMode, setYear, years }) => {
  const [timelineElement, { width }] = useMeasure();
  const [index, setIndex] = useState(0);

  const [springs, set] = useSprings(
    years.length,
    (i) => ({
      x: (index - i) * (480 / 3) + 480 / 2 - 35,
      color: i === 0 ? "#6c757d" : "#6c757d99",
      opacity: i < 2 ? 1 : 0,
    }),
    config.stiff
  );

  const bind = useDrag(
    ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
      const clampedIndex = getClampedIndex(xDir);
      if (down && distance > 25) {
        cancel(setIndex(clampedIndex));
        setClampedYear(clampedIndex);
      }

      if (index === 0 && xDir < 0) {
        hideTimeline();
      }

      setSprings({ clampedIndex: index, xDir, down, xDelta });
    }
  );

  const getClampedIndex = (direction) => {
    return clamp(index + (direction > 0 ? 1 : -1), 0, years.length - 1);
  };

  const setSprings = ({ direction, clampedIndex, down, xDelta }) => {
    set((i) => {
      if (i < clampedIndex - 1) {
        return { x: width, color: "#6c757d99", opacity: 0, display: "none" };
      } else if (i > clampedIndex + 1) {
        return { x: -40, color: "#6c757d99", opacity: 0, display: "none" };
      }

      let x = 0;
      if (xDelta) {
        x =
          (clampedIndex - i) * (width / 3) +
          width / 2 -
          35 +
          (down ? xDelta : 0);
      } else {
        x = (clampedIndex - i) * (width / 3) + width / 3 + 45;
      }

      if (i === clampedIndex) {
        return { x, color: "#6c757d", display: "block" };
      }
      return { x, color: "#6c757d99", opacity: 1, display: "block" };
    });
  };

  const handleKeyPress = (direction) => {
    if (index < years.length) {
      const clampedIndex = getClampedIndex(direction);
      setSprings({ direction, clampedIndex });
      setIndex(clampedIndex);
      setClampedYear(clampedIndex);
    }
    if (index === 1 && direction === -1) {
      hideTimeline();
    }
  };

  useKeyPressEvent("ArrowLeft", () => {
    handleKeyPress(1);
  });

  useKeyPressEvent("ArrowRight", () => {
    handleKeyPress(-1);
  });

  useKeyPressEvent("Escape", () => {
    setIsTimelineMode(false);
    setYear("");
  });

  const hideTimeline = () => {
    setTimeout(() => {
      setIsTimelineMode(false);
    }, 1000);
  };

  const getYear = (index) => {
    return years[index];
  };

  const setClampedYear = (clampedIndex) => {
    if (clampedIndex === 0) {
      setYear("");
    } else {
      setYear(years[clampedIndex]);
    }
  };

  const timeline = {
    1976: "P. Jimmy Carter | V.P. Walter Mondale | [40,831,881] [50.1%] [297/538]",
    1980: "P. Ronald Reagan	| V.P. George H. W. Bush | [43,903,230] [50.7%] [489/538]",
    1984: "P. Ronald Reagan	| V.P. George H. W. Bush | [54,455,472] [58.8%] [525/538]",
    1988: "P. George H. W. Bush	| V.P. Dan Quayle	| [48,886,597]	[53.4%] [426/538]",
    1992: "P. Bill Clinton	| V.P. Al Gore | [44,909,806] [43.0%]	[370/538]",
    1996: "P. Bill Clinton	| V.P. Al Gore | [47,401,185] [49.2%] [379/538]",
    2000: "P. George W. Bush	| V.P. Dick Cheney | [50,456,002]	[47.9%] [271/538]",
    2004: "P. George W. Bush	| V.P. Dick Cheney | [62,040,610]	[50.7%] [286/538]",
    2008: "P. Barack Obama	| V.P. Joe Biden | [69,498,516]	[52.9%]	[365/538]",
    2012: "P. Barack Obama	| V.P. Joe Biden | [65,915,795]	[51.1%]	[332/538]",
    2016: "P. Donald Trump	| V.P. Mike Pence | [62,979,636] [46.1%] [304/538]",
    2020: "P. Joe Biden	| V.P. Kamala Harris | [81,268,867] [51.31%] [306/538]",
  };

  const transition = useTransition(
    timeline.hasOwnProperty(years[index]),
    null,
    {
      from: { transform: "translate3d(0, 20px, 0)", opacity: 0 },
      enter: { transform: "translate3d(0, 0px, 0)", opacity: 1 },
      leave: { transform: "translate3d(0, 20px, 0)", opacity: 0 },
    }
  );

  const handleClick = (clampedIndex) => {
    if (clampedIndex > index) {
      handleKeyPress(+1);
    } else {
      handleKeyPress(-1);
    }
  };

  return (
    <React.Fragment>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.h5 className="highlight" key={key} style={props}>
              {timeline[years[index]]}
            </animated.h5>
          )
      )}

      <div className="Timeline" ref={timelineElement} {...bind()}>
        {springs
          .filter(
            ({ opacity }, i) =>
              i < years.length &&
              (i === index + 1 ||
                i === index - 1 ||
                i === index + 2 ||
                i === index - 2 ||
                i === index)
          )
          .map(({ x, color, opacity, display }, i) => (
            <animated.div
              className="day"
              key={i}
              style={{
                transform: x.interpolate((x) => `translate3d(${x}px,0,0)`),
                opacity,
                display,
              }}
            >
              {index < 2 && (
                <animated.h5
                  style={{ color }}
                  onClick={() => {
                    handleClick(i);
                  }}
                >
                  {getYear(i)}
                </animated.h5>
              )}
              {index > 1 && index < years.length && (
                <animated.h5
                  style={{ color }}
                  onClick={() => {
                    handleClick(index + i - 2);
                  }}
                >
                  {getYear(index + i - 2)}
                </animated.h5>
              )}
            </animated.div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default React.memo(Timeline);
