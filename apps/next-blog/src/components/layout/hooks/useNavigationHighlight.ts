import { useState, useEffect, useMemo, useRef } from "react";

export default function useNavigationHighlight(tabGap: number): {
  navigationMenuListRef: React.RefObject<HTMLDivElement>;
  currentBarStyle: React.CSSProperties;
  setHoverTabIdx: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedTabIdx: React.Dispatch<React.SetStateAction<number | null>>;
} {
  const [hoverTabIdx, setHoverTabIdx] = useState<number | null>(null);
  const [selectedTabIdx, setSelectedTabIdx] = useState<number | null>(0); // 초기값: 첫번째 메뉴 선택 등 상황에 맞게 설정 가능
  const calcTabWidthList = useRef<number[]>([]);
  const navigationMenuListRef = useRef<HTMLDivElement | null>(null);

  const currentTabIdx = hoverTabIdx !== null ? hoverTabIdx : selectedTabIdx;

  const currentBarStyle = useMemo<React.CSSProperties>(() => {
    const left = calcTabWidthList.current.reduce((acc, cur, curIdx) => {
      if (currentTabIdx === null) return 0;
      if (curIdx < currentTabIdx) {
        return acc + cur + tabGap;
      }
      return acc;
    }, 0);

    return {
      width:
        currentTabIdx !== null
          ? `${calcTabWidthList.current[currentTabIdx]}px`
          : 0,
      left: `${left}px`,
    };
  }, [calcTabWidthList, tabGap, hoverTabIdx, selectedTabIdx]);

  const calcTabWidth = (): number[] => {
    if (!navigationMenuListRef.current) return [];
    return [...navigationMenuListRef.current.children].map((item) => {
      return (item as HTMLElement).getBoundingClientRect().width;
    });
  };

  const init = () => {
    setTimeout(() => {
      calcTabWidthList.current = calcTabWidth();
    }, 500);
  };

  useEffect(() => {
    init();
  }, []);

  return {
    navigationMenuListRef,
    currentBarStyle,
    setHoverTabIdx,
    setSelectedTabIdx,
  };
}
