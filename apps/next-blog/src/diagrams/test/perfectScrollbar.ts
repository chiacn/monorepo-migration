const perfectScrollbar = {
  example: {
    target: "function animateScroll(psInstance, to, duration = 300)",
    example:
      "사용자가 특정 요소로 스크롤하려고 할 때, 부드러운 스크롤 애니메이션을 적용하는 기능",
    steps: [
      {
        step: "1",
        target: "const start = psInstance.ps.element.scrollTop;",
        example: "현재 스크롤 위치를 가져와서 저장",
        description:
          "현재 요소의 스크롤 위치를 가져와서 애니메이션 시작 지점으로 설정함.",
        result: {
          start: "현재 스크롤 위치",
        },
        steps: [
          {
            step: "2",
            target: "const change = to - start;",
            example:
              "목표 위치(to)에서 현재 위치(start)를 빼서 이동할 거리 계산",
            description:
              "스크롤 애니메이션의 최종 목표 위치와 현재 위치의 차이를 계산하여 스크롤 이동 거리를 구함.",
            result: {
              change: "목표 위치 - 현재 위치",
            },
            steps: [
              {
                step: "3",
                target: "const startTime = performance.now();",
                example: "애니메이션 시작 시간을 저장",
                description:
                  "현재 시간을 저장하여 애니메이션이 얼마나 진행되었는지 측정할 기준을 만듦.",
                result: {
                  startTime: "애니메이션 시작 시간",
                },
                steps: [
                  {
                    step: "4",
                    target: "function step(currentTime) {",
                    example: "애니메이션 진행을 관리하는 재귀 함수 선언",
                    description:
                      "requestAnimationFrame을 사용하여 지속적으로 호출될 콜백 함수를 정의함.",
                    result: {
                      stepFunction: "애니메이션 단계별 진행 함수",
                    },
                    steps: [
                      {
                        step: "5",
                        target: "const elapsed = currentTime - startTime;",
                        example: "경과된 시간 계산",
                        description:
                          "현재 시간에서 애니메이션 시작 시간을 빼서 애니메이션이 진행된 시간을 계산함.",
                        result: {
                          elapsed: "경과 시간",
                        },
                        steps: [
                          {
                            step: "6",
                            target:
                              "const progress = Math.min(elapsed / duration, 1);",
                            example: "애니메이션 진행률 계산",
                            description:
                              "경과된 시간을 전체 지속 시간(duration)으로 나누어 진행률을 계산하고, 최대값을 1로 제한함.",
                            result: {
                              progress: "0 ~ 1 사이의 진행률",
                            },
                            steps: [
                              {
                                step: "7",
                                target:
                                  "const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;",
                                example: "이징 함수 적용",
                                description:
                                  "부드러운 애니메이션 효과를 위해 ease-in-out 이징 함수를 적용함.",
                                result: {
                                  ease: "이징이 적용된 진행률",
                                },
                                steps: [
                                  {
                                    step: "8",
                                    target:
                                      "const newY = start + change * ease;",
                                    example: "새로운 스크롤 위치 계산",
                                    description:
                                      "현재 위치(start)에서 목표 위치까지의 거리(change)를 ease 값과 곱하여 새로운 스크롤 위치를 결정함.",
                                    result: {
                                      newY: "새로운 스크롤 위치",
                                    },
                                    steps: [
                                      {
                                        step: "9",
                                        target:
                                          "psInstance.ps.element.scrollTop = newY;",
                                        example:
                                          "계산된 위치로 스크롤 이동 적용",
                                        description:
                                          "계산된 newY 값을 적용하여 화면의 스크롤 위치를 업데이트함.",
                                        result: {
                                          scrollTop: "업데이트된 스크롤 위치",
                                        },
                                        steps: [
                                          {
                                            step: "10",
                                            target: "psInstance.ps.update();",
                                            example: "스크롤 상태 업데이트",
                                            description:
                                              "스크롤 위치가 변경되었으므로, psInstance의 상태도 갱신함.",
                                            result: {
                                              psUpdated: true,
                                            },
                                            steps: [
                                              {
                                                step: "11",
                                                target:
                                                  "if (progress < 1) { requestAnimationFrame(step); }",
                                                example:
                                                  "애니메이션이 완료되지 않았다면 다음 프레임 요청",
                                                description:
                                                  "애니메이션 진행률이 1보다 작으면 requestAnimationFrame을 호출하여 다음 프레임을 계속 실행함.",
                                                result: {
                                                  animationLooping:
                                                    "progress < 1이면 true, 아니면 false",
                                                },
                                                steps: [],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
export default perfectScrollbar;
