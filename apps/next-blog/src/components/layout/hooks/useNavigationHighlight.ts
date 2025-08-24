import navlinks from "@/data/navlink";
import { useState, useEffect, useMemo, useRef } from "react";

export default function useNavigationHighlight(tabGap: number): {
  navigationMenuListRef: React.RefObject<HTMLDivElement>;
  currentBarStyle: React.CSSProperties;
  setHoverTabIdx: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedTabIdx: React.Dispatch<React.SetStateAction<number | null>>;
} {
  const [hoverTabIdx, setHoverTabIdx] = useState<number | null>(null);
  const [selectedTabIdx, setSelectedTabIdx] = useState<number | null>(0);
  const [tabWidthList, setTabWidthList] = useState<number[]>([]);
  const navigationMenuListRef = useRef<HTMLDivElement>(null);

  const currentTabIdx = hoverTabIdx !== null ? hoverTabIdx : selectedTabIdx;

  const currentBarStyle = useMemo<React.CSSProperties>(() => {
    if (tabWidthList.length === 0 || currentTabIdx === null) {
      return { width: "0px", left: "0px" };
    }

    // 현재 탭의 왼쪽 위치를 계산
    const left = tabWidthList
      .slice(0, currentTabIdx)
      .reduce((acc, width) => acc + width + tabGap, 0);
    const width = tabWidthList[currentTabIdx] || 0;

    return {
      width: `${width}px`,
      left: `${left}px`,
    };
  }, [tabWidthList, tabGap, currentTabIdx]); // 의존성에 tabWidthList 추가

  const calcTabWidth = (): number[] => {
    if (!navigationMenuListRef.current) return [];
    return Array.from(navigationMenuListRef.current.children).map((item) => {
      const element = item as HTMLElement;
      const style = getComputedStyle(element);
      const marginRight = parseFloat(style.marginRight) || 0;
      return element.getBoundingClientRect().width + marginRight;
    });
  };

  const init = () => {
    setTimeout(() => {
      const widths = calcTabWidth();
      setTabWidthList(widths);
    }, 200);
  };

  const initializeTabFromURL = () => {
    const path = window.location.pathname;
    const lastPart = path.substring(path.lastIndexOf("/") + 1);

    const tabIndex = navlinks.findIndex(
      (navlink) => navlink.link === `/${lastPart}`,
    );

    if (tabIndex !== -1) {
      setSelectedTabIdx(tabIndex);
    } else {
      setSelectedTabIdx(0); // 기본값
    }
  };

  useEffect(() => {
    initializeTabFromURL();
    init();
  }, []);

  // 창 크기 변경 시 재측정
  useEffect(() => {
    const handleResize = () => {
      const widths = calcTabWidth();
      setTabWidthList(widths);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    navigationMenuListRef,
    currentBarStyle,
    setHoverTabIdx,
    setSelectedTabIdx,
  };
}
