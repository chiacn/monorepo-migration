"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import DiagramItem from "./DiagramItem";
import useLLM from "./commonHooks/useLLM";

import SubmittedText from "./SubmittedText";
import useHighlight from "./hooks/useHighlight";
import useHandleDataStructure from "./hooks/useHandleDataStructure";
import test from "node:test";
import useDiagram from "./hooks/useDiagram";
import PromptButton from "./PromptButton";

import { Loader2 } from "lucide-react";

import {
  CommonToggleGroups,
  Textarea,
  CommonButton,
  toast,
} from "@monorepo/ui";
import { Structures } from "@/lib/types";

export default function DiagramContainerForText({
  displayText,
  structures,
  type,
}: {
  displayText: string;
  structures: Structures;
  type?: string;
}) {
  // LLM 테스트 ---------------------------------------------

  const {
    getAnswerFromModel,
    inquiryType,
    setInquiryType,
    inquiryTypeList,
    getPromptByInputText,
  } = useLLM({});
  const [question, setQuestion] = useState("");
  const [structure, setStructure] = useState(null);
  const [submittedText, setSubmittedText] = useState("");
  const [isOpenSubmittedText, setIsOpenSubmittedText] = useState(false); // 영역 접기/펼치기 상태

  const {
    highlightItems,
    handleDiagramItem,
    diagramItemsListRef,
    currentHighlightStatus,
    colorPalette,
    targetColorMap,
    resetHighlight,
  } = useHighlight({ inquiryType });
  const {
    setSpreadSteps,
    entireSpreadedStep,
    focusSpreadedStep,
    assignDiagramIds,
    resetDataStructure,
  } = useHandleDataStructure({
    highlightItems,
    currentHighlightStatus,
    structure,
    inquiryType,
  });

  const { renderDiagramItems } = useDiagram({
    diagramItemsListRef,
    currentHighlightStatus,
    colorPalette,
    targetColorMap,
    handleDiagramItem,
    highlightItems,
    inquiryType,
  });

  const [isLoading, setIsLoading] = useState(false);

  function extractText(elements: any) {
    const result = elements.props.children.props.children
      .map((element: any) => {
        if (element.type === "img") {
          return `[이미지: ${element.props.src}, 크기: ${element.props.width}x${element.props.height}]`;
        }

        if (Array.isArray(element.props.children)) {
          return element.props.children
            .map((child: any) => {
              if (typeof child === "string") return child; // 공백 유지
              if (child.type === "span" || child.type === "p")
                return child.props.children;
              if (child.type === "strong") return child.props.children;
              if (child.type === "br") return "\n"; // br 태그는 줄바꿈으로 처리
            })
            .join("")
            .replace(/\r\n/g, "\n"); // 줄바꿈 문자 일관성 유지
        }
        return element.props.children;
      })
      .join("");
    // .filter((text: string) => text.trim() !== "") // 빈 줄 제거
    // .join("\n"); // 각 코드 라인 사이에 하나의 줄바꿈 추가
    return result;
  }

  const injectPrompt = () => {
    const initInquiryType = type ? type : "tree";
    setInquiryType(initInquiryType); // 처음에는 tree 설정.
    setSubmittedText(
      typeof displayText === "object"
        ? // ? (displayText as { props: { children: string } }).props.children
          extractText(displayText)
        : displayText,
    );
    setStructure({
      ...assignDiagramIds(structures[initInquiryType]), // 처음에는 tree 설정.
    });
    setIsOpenSubmittedText(true);
    setSpreadSteps({ ...assignDiagramIds(structures[initInquiryType]) });
  };

  useEffect(() => {
    injectPrompt();
  }, []);

  // const resetData = () => {
  //   setStructure(null);
  //   setSubmittedText("");
  //   setIsOpenSubmittedText(false);
  //   resetHighlight();
  //   resetDataStructure();
  // };

  const [contentWidth, setContentWidth] = useState(0);
  const contentWrapperRef = useRef<any>(null); // 최상위 depth=1의 width만 추적할 ref

  type InquiryType = "example" | "tree" | "logical_progression" | string;
  const changeInquiryType = (type: InquiryType) => {
    setInquiryType(type);
  };

  // Note: changeInquiryType에서 바로 setSpreadSteps를 하면 inquiryType이 변경되기 전에 실행돼서 useEffect 사용으로 변경.
  useEffect(() => {
    setStructure({
      ...assignDiagramIds(structures[inquiryType ?? "tree"] || null), // 처음에는 tree 설정.
    });
    setSpreadSteps({
      ...assignDiagramIds(structures[inquiryType ?? "tree"] || null),
    });
  }, [inquiryType]);
  useEffect(() => {
    const updateContentWidth = () => {
      if (contentWrapperRef.current) {
        console.log(
          "contentWrapperRef.current.offsetWidth",
          contentWrapperRef.current.offsetWidth,
        );
        setContentWidth(contentWrapperRef.current.offsetWidth + 40);
      }
    };

    updateContentWidth(); // 초기 렌더링 시 설정

    window.addEventListener("resize", updateContentWidth); // 윈도우 리사이즈 시 업데이트
    return () => {
      window.removeEventListener("resize", updateContentWidth); // 컴포넌트 언마운트 시 클린업
    };
  }, []);

  const topScrollRef = useRef<HTMLDivElement | any>(null);
  const bottomScrollRef = useRef<HTMLDivElement | any>(null);
  const syncScroll = (source: string) => {
    if (source === "top") {
      bottomScrollRef.current.scrollLeft = topScrollRef.current.scrollLeft;
    } else {
      topScrollRef.current.scrollLeft = bottomScrollRef.current.scrollLeft;
    }
  };

  return (
    // Note: <></>로 구성 시 DOM 요소를 생성하지 않아서 flow에 문제가 발생할 수 있음.
    <div className="flex flex-col items-center h-[80vh]">
      <div
        className="flex flex-col justify-center items-center w-[80vw]"
        style={{
          maxWidth: `${
            !contentWidth || contentWidth < 500 ? 1000 : contentWidth
          }px`,
        }}
      >
        {/* <CommonToggleGroups
          items={inquiryTypeList}
          selectedValue={inquiryType}
          changeInquiryType={changeInquiryType}
          gap={80}
        /> */}
        <div className="flex w-full mt-4"></div>
      </div>

      <div className="sticky top-0 z-20 ml-4 mr-4">
        <SubmittedText
          submittedText={submittedText}
          isOpenSubmittedText={isOpenSubmittedText}
          setIsOpenSubmittedText={setIsOpenSubmittedText}
          currentHighlightStatus={currentHighlightStatus.value}
          entireSpreadedStep={entireSpreadedStep}
          focusSpreadedStep={focusSpreadedStep}
          targetColorMap={targetColorMap.current}
          inquiryType={inquiryType}
        />

        {/* 상단 스크롤 ---------------------------------------------------- */}
        <div
          ref={topScrollRef}
          onScroll={() => syncScroll("top")}
          className="scrollbar-custom w-[80vw] mt-2"
        >
          <div
            className="h-[2px]"
            style={{ width: `${contentWidth}px` }} // Inner div
          ></div>
        </div>
        {/* ---------------------------------------------------------------- */}
      </div>

      <div
        ref={bottomScrollRef}
        onScroll={() => syncScroll("bottom")}
        className="scrollbar-custom w-[80vw] flex flex-col overflow-x-auto"
      >
        <div style={{ maxHeight: "calc(100% - 200px)" }}>
          {structure && renderDiagramItems(structure)}
        </div>
        {/* {testStructure && renderDiagramItems(testStructure)} */}
      </div>
    </div>
  );
}
