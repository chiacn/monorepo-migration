import { DiagramItem } from "@/lib/types";
import { useEffect, useState } from "react";

interface HandleDataStructureProps {
  highlightItems: Array<string | number>;
  currentHighlightStatus: { value: number };
  structure: any;
  inquiryType: string | null;
}
export default function useHandleDataStructure({
  highlightItems,
  currentHighlightStatus,
  structure,
  inquiryType,
}: HandleDataStructureProps) {
  const [entireSpreadedStep, setEntireSpreadedStep] = useState<DiagramItem[]>(
    [],
  );
  const [focusSpreadedStep, setFocusSpreadedStep] = useState<DiagramItem[]>([]);

  function dfsStructure(node: any, steps: any[] = []) {
    if (!node) return steps;

    steps.push(node);

    // Note: tree일 경우 step이 아니라 content, related_elements로 구성
    if (inquiryType === "tree") {
      if (node.content && node.content.length > 0) {
        node.content.forEach((child: any) => {
          dfsStructure(child, steps);
        });
      } else if (node.related_elements && node.related_elements.length > 0) {
        node.related_elements.forEach((child: any) => {
          dfsStructure(child, steps);
        });
      }
    } else {
      // tree 제외 다른 inquiryType의 경우 steps로 구성
      if (node.steps && node.steps.length > 0) {
        node.steps.forEach((child: any) => {
          dfsStructure(child, steps);
        });
      }
    }

    return steps;
  }

  const assignDiagramIds = (node: any, depth = 0) => {
    // node가 존재하지 않거나 객체가 아닌 경우 바로 반환
    if (!node || typeof node !== "object") return null;

    // diagramId 할당 로직
    let diagramId = "";
    if (inquiryType === "tree") {
      diagramId = `${depth}-${
        node.content ? "root" : node.element_name || "unknown"
      }`;
    } else {
      diagramId = `${depth}-${node.step || "root"}`;
    }

    node.diagramId = diagramId;

    // 하위 요소가 배열인지 체크 후 재귀 호출
    if (Array.isArray(node.content)) {
      node.content.forEach((child: any) => assignDiagramIds(child, depth + 1));
    } else if (Array.isArray(node.related_elements)) {
      node.related_elements.forEach((child: any) =>
        assignDiagramIds(child, depth + 1),
      );
    } else if (Array.isArray(node.steps)) {
      node.steps.forEach((child: any) => assignDiagramIds(child, depth + 1));
    }

    return node;
  };

  // const assignDiagramIds = (node: any, depth = 0) => {
  //   // diagramId를 depth와 step으로 구성하여 고유 ID로 설정

  //   if (inquiryType === "tree") {
  //     const diagramId = `${depth}-${node.content ? "root" : node.element_name}`;

  //     node.diagramId = diagramId;
  //     if (node.content && node.content.length > 0) {
  //       node.content.forEach((child: any) => {
  //         assignDiagramIds(child, depth + 1);
  //       });
  //     } else if (node.related_elements && node.related_elements.length > 0) {
  //       node.related_elements.forEach((child: any) => {
  //         assignDiagramIds(child, depth + 1);
  //       });
  //     }
  //     return node;
  //   }
  //   const diagramId = `${depth}-${node.step || "root"}`;
  //   node.diagramId = diagramId;

  //   if (node.steps && node.steps.length > 0) {
  //     node.steps.forEach((child: any) => {
  //       assignDiagramIds(child, depth + 1);
  //     });
  //   }

  //   return node;
  // };

  const setSpreadSteps = (structure: any) => {
    setEntireSpreadedStep([]);
    setFocusSpreadedStep([]);

    if (structure) {
      const steps = dfsStructure(structure); // * 여기서 diagramId 할당
      if (inquiryType === "logical_progression" || inquiryType === "tree") {
        // Note: example의 경우 최상위 노드도 포함시켜야하지만 logicalDiagram, tree의 경우 최상위 노드는 제외
        steps.shift();
      }
      setEntireSpreadedStep([...steps]);
      setFocusSpreadedStep([...steps]); // 초기에는 전체 스텝을 설정
    }
  };

  // 2. 특정 step 하이라이트 시 focusSpreadedStep 업데이트
  function getSubstructureByStep(
    entireSpreadedStep: any[],
    highlightItems: (string | number)[],
  ): any[] {
    if (!entireSpreadedStep || highlightItems.length === 0)
      return entireSpreadedStep;

    // diagramId가 highlightSteps에 포함된 스텝만 필터링
    return entireSpreadedStep.filter((step) =>
      highlightItems.includes(step.diagramId),
    );
  }

  const resetDataStructure = () => {
    setEntireSpreadedStep([]);
    setFocusSpreadedStep([]);
  };

  useEffect(() => {
    if (highlightItems.length > 0 && entireSpreadedStep.length > 0) {
      const focusSteps = getSubstructureByStep(
        entireSpreadedStep,
        highlightItems,
      );
      setFocusSpreadedStep([...focusSteps]);
    } else {
      setFocusSpreadedStep([...entireSpreadedStep]);
    }
  }, [currentHighlightStatus, structure]); // highlightItems (array) 변경되는거 얕은 비교로 감지 못하니까 currentHighlightStatus 감지

  return {
    setSpreadSteps,
    entireSpreadedStep,
    focusSpreadedStep,
    assignDiagramIds,
    resetDataStructure,
  };
}
