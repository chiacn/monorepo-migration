const test = {
  tree: {
    displayType: "tree",
    content: [
      {
        element_name: "solution 함수",
        related_elements: [
          {
            element_name: "입력: s",
            relationTypeWithParent: "입력 매개변수",
            relationship: [],
            description: "문자열 s가 함수에 입력으로 제공됩니다.",
          },
          {
            element_name: "출력: minLen",
            relationTypeWithParent: "출력값",
            relationship: [],
            description: "압축 후 최소 길이를 나타내는 변수입니다.",
          },
          {
            element_name: "압축 단위 증가 루프",
            relationTypeWithParent: "핵심 처리 로직",
            relationship: [],
            description:
              "1부터 s 길이의 절반까지 압축 단위를 증가시키며 문자열을 처리합니다.",
            related_elements: [
              {
                element_name: "unit 변수",
                relationTypeWithParent: "루프 컨트롤 변수",
                relationship: [],
                description: "현재 압축 단위를 나타냅니다.",
              },
              {
                element_name: "압축 문자열 생성",
                relationTypeWithParent: "루프 내 처리 단계",
                relationship: [],
                description:
                  "현재 단위로 문자열을 자르고 패턴을 비교하여 압축된 문자열을 생성합니다.",
                related_elements: [
                  {
                    element_name: "prev 변수",
                    relationTypeWithParent: "현재 비교 기준",
                    relationship: [],
                    description: "이전 압축 단위를 기준으로 자른 문자열입니다.",
                  },
                  {
                    element_name: "current 변수",
                    relationTypeWithParent: "현재 비교 대상",
                    relationship: [],
                    description: "현재 단위로 자른 문자열입니다.",
                  },
                  {
                    element_name: "count 변수",
                    relationTypeWithParent: "패턴 반복 횟수",
                    relationship: [],
                    description:
                      "연속된 동일 패턴의 개수를 세는 데 사용됩니다.",
                  },
                  {
                    element_name: "compressed 변수",
                    relationTypeWithParent: "압축된 결과 문자열",
                    relationship: [],
                    description: "현재까지 생성된 압축 문자열입니다.",
                  },
                ],
              },
              {
                element_name: "최소 길이 업데이트",
                relationTypeWithParent: "루프 내 처리 단계",
                relationship: [],
                description:
                  "압축된 문자열의 길이를 확인하여 minLen을 업데이트합니다.",
              },
            ],
          },
        ],
        description:
          "문자열을 입력받아 특정 압축 규칙을 기반으로 최소 길이를 계산하는 함수입니다.",
      },
    ],
  },
  example: {
    target: "문자열 압축 함수",
    example: "예를 들어, 문자열 'aabbaccc'를 압축하는 경우",
    steps: [
      {
        step: 1,
        target: "초기 설정",
        example: "문자열 'aabbaccc'의 길이는 8로 minLen을 8로 설정",
        description:
          "함수는 입력 문자열의 길이를 minLen으로 설정하여 초기화합니다.",
        result: {
          minLen: 8,
        },
        steps: [],
      },
      {
        step: 2,
        target: "단위 크기 1로 압축 시도",
        example: "unit=1으로 설정하고 문자열을 단위별로 압축",
        description:
          "unit을 1로 설정하여 각 문자별로 연속된 문자를 카운트하며 압축 문자열을 만듭니다.",
        result: {
          compressed: "2a2ba3c",
          minLen: 7,
        },
        steps: [],
      },
      {
        step: 3,
        target: "단위 크기 2로 압축 시도",
        example: "unit=2로 설정하고 문자열을 단위별로 압축",
        description:
          "unit을 2로 설정하여 두 글자 단위로 연속된 패턴을 카운트하며 압축 문자열을 만듭니다.",
        result: {
          compressed: "aabbaccc",
          minLen: 7,
        },
        steps: [],
      },
      {
        step: 4,
        target: "단위 크기 3으로 압축 시도",
        example: "unit=3으로 설정하고 문자열을 단위별로 압축",
        description:
          "unit을 3으로 설정하여 세 글자 단위로 연속된 패턴을 카운트하며 압축 문자열을 만듭니다.",
        result: {
          compressed: "aabbaccc",
          minLen: 7,
        },
        steps: [],
      },
      {
        step: 5,
        target: "단위 크기 4로 압축 시도",
        example: "unit=4으로 설정하고 문자열을 단위별로 압축",
        description:
          "unit을 4으로 설정하여 네 글자 단위로 연속된 패턴을 카운트하며 압축 문자열을 만듭니다.",
        result: {
          compressed: "aabbaccc",
          minLen: 7,
        },
        steps: [],
      },
    ],
  },
  logical_progression: {
    title: "문자열 압축 알고리즘의 논리적 진행",
    steps: [
      {
        step: "1",
        target: "let minLen = s.length;",
        statement: "초기 최소 압축 길이를 문자열의 전체 길이로 설정한다.",
        description:
          "문자열의 전체 길이를 최소 압축 길이로 초기화하여, 이후 압축된 문자열의 길이를 비교할 기준을 마련한다.",
        implications:
          "초기 설정으로 인해 최소 압축 길이가 현재 문자열의 길이보다 작아질 수 있는 가능성을 확보한다.",
      },
      {
        step: "2",
        target:
          "for (let unit = 1; unit <= Math.floor(s.length / 2); unit++) { ... }",
        statement:
          "압축 단위를 1부터 문자열 길이의 절반까지 증가시키며 반복한다.",
        description:
          "압축 단위를 점차 늘려가며 다양한 단위로 문자열을 압축해보고, 가장 짧은 압축 결과를 찾기 위한 반복문을 설정한다.",
        implications:
          "모든 가능한 압축 단위를 시도함으로써 최적의 압축 길이를 찾을 수 있다.",
      },
      {
        step: "2.1",
        target:
          "let compressed = ''; let prev = s.slice(0, unit); let count = 1;",
        statement: "압축된 문자열, 이전 패턴, 패턴 반복 횟수를 초기화한다.",
        description:
          "새로운 압축 단위에 대해 압축 결과를 저장할 변수를 초기화하고, 첫 번째 패턴과 반복 횟수를 설정한다.",
        implications:
          "각 압축 단위별로 독립적인 압축 결과를 관리할 수 있게 된다.",
      },
      {
        step: "2.2",
        target: "for (let i = unit; i < s.length; i += unit) { ... }",
        statement: "단위 크기만큼 문자열을 순차적으로 비교한다.",
        description:
          "현재 단위 크기(unit)만큼 이동하며 문자열을 분할하여 이전 패턴과 비교하는 내부 반복문을 실행한다.",
        implications: "연속된 패턴을 찾아 압축할 수 있는 구조를 형성한다.",
      },
      {
        step: "2.2.1",
        target: "let current = s.slice(i, i + unit);",
        statement: "현재 단위의 문자열을 추출한다.",
        description:
          "현재 위치(i)에서 단위 크기(unit)만큼의 문자열을 잘라내어 현재 패턴으로 설정한다.",
        implications: "패턴 비교를 위한 현재 문자열 조각을 확보한다.",
      },
      {
        step: "2.2.2",
        target:
          "if (prev === current) { count++; } else { compressed += (count > 1 ? count : '') + prev; prev = current; count = 1; }",
        statement:
          "현재 패턴이 이전 패턴과 동일한지 비교하고, 동일하면 반복 횟수를 증가시키고, 그렇지 않으면 압축된 문자열에 추가한다.",
        description:
          "연속된 패턴을 감지하여 반복 횟수를 세고, 패턴이 달라질 때마다 압축된 문자열에 해당 패턴과 반복 횟수를 추가한다.",
        implications:
          "연속된 패턴을 효율적으로 압축하여 문자열의 길이를 줄일 수 있다.",
      },
      {
        step: "2.3",
        target: "compressed += (count > 1 ? count : '') + prev;",
        statement: "마지막으로 남은 패턴을 압축된 문자열에 추가한다.",
        description:
          "반복문 종료 후 남아있는 마지막 패턴과 그 반복 횟수를 압축된 문자열에 덧붙인다.",
        implications:
          "모든 패턴이 압축된 문자열에 포함되어 전체 압축 결과의 완전성을 보장한다.",
      },
      {
        step: "2.4",
        target: "minLen = Math.min(minLen, compressed.length);",
        statement:
          "현재 압축된 문자열의 길이와 기존 최소 길이를 비교하여 최소 길이를 업데이트한다.",
        description:
          "압축된 문자열의 길이가 기존 최소 길이보다 짧으면 최소 길이를 해당 값으로 갱신한다.",
        implications: "최종적으로 가장 짧은 압축 결과를 찾을 수 있게 된다.",
      },
      {
        step: "3",
        target: "return minLen;",
        statement: "최종 최소 압축 길이를 반환한다.",
        description:
          "모든 단위 크기에 대한 압축을 시도한 후, 가장 짧은 압축 결과를 함수의 반환값으로 제공한다.",
        implications: "함수의 호출자는 최적화된 압축 길이를 이용할 수 있다.",
      },
    ],
    conclusion:
      "이 알고리즘은 다양한 단위 크기로 문자열을 압축하여 가장 짧은 압축 결과를 찾아 반환함으로써 문자열 압축의 최적화를 달성한다.",
  },
};
export default test;
