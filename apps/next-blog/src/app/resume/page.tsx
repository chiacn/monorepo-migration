"use client";
import React, { useState } from "react";
import CommonLineDivider from "@/components/CommonLineDivider";
import { workExperienceData } from "@/data/resume";

function CollapsibleItem({
  title,
  description,
}: {
  title: string;
  description: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasDescription = description.length > 0;

  return (
    <div className="mb-4">
      <button
        onClick={() => hasDescription && setIsOpen(!isOpen)}
        className="w-full text-left font-medium focus:outline-none flex items-center justify-between"
      >
        <span>{title}</span>
        {/* 화살표 아이콘: 열렸을 때 회전 */}
        {hasDescription ? (
          <svg
            className={`w-4 h-4 transition-transform duration-300 ml-4 shrink-0 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        ) : (
          <div className="w-2 h-4" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 mt-2" : "max-h-0"
        }`}
        style={{ willChange: "max-height, margin", transform: "translateZ(0)" }}
      >
        <ul className="ml-4" style={{ listStyleType: "circle" }}>
          {description.map((desc, i) => (
            <li key={i} className="mb-1">
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="my-4 px-4 flex flex-col items-center sm:px-6 lg:px-8 sm:items-start">
      <CommonLineDivider>
        {/* 상단 정보 */}
        <section className="mb-3 text-center sm:text-left">
          <h1 className="font-black text-lg text-slate-700">최한봄</h1>
        </section>

        <section className="text-center sm:text-left">
          <span className="text-lg font-bold">Frontend Engineer</span>
        </section>

        <section className="flex justify-center sm:justify-start mt-6">
          <span>devhhbb@gmail.com</span>
        </section>

        <section className="mt-4 text-gray-600 font-light text-sm whitespace-pre-line">
          안녕하세요 프론트엔드 개발자 최한봄입니다 <br />
          <br />
          저는 업무를 하면서 어떠한 문제에 직면했을 때 단순히 그 문제를
          봉합하는데 그치지 않고 근본적인 문제를 해결하고자 노력하는 태도를
          가지고 있으며 완성도 있는 서비스를 위한 집요함이 저의 장점이라고
          생각합니다. <br />
          <br />
          저는 독학으로 개발을 공부해 개발자로서의 첫 발을 내딛은 후, 항저우
          아시안게임 GMS라는 비교적 큰 규모의 프로젝트를 맡아 세 번의 강도 높은
          테스트 절차 동안 약 500개 이상의 이슈를 처리하며 오픈 과정까지
          참여했습니다. <br />
          <br />
          새벽 근무를 하며 서비스의 완성도를 높히는 경험을 하면서 제가 맡은
          서비스를 끝까지 마무리하며 성장할 수 있었고, 이후에는 약 20개 이상의
          하위 서비스를 가지고 있는 골프 플랫폼 서비스 회사에서 개발 및 운영을
          경험하면서 프론트엔드 개발자로서 더 좋은 유저 경험과 코드에 대해
          고민하며 제가 하는 일에 흥미와 보람을 느끼게 되었습니다.
          <br />
          <br />
          이러한 저의 경험과 새로운 문제를 해결하는데 적극적인 자세로 제가 맡게
          될 서비스의 완성도에 기여하고 싶습니다.
          <br />
          <br />
        </section>
      </CommonLineDivider>

      <CommonLineDivider>
        {/* Work Experiences 헤더 */}
        <section className="flex flex-col mt-6">
          <h1 className="text-xl text-slate-500 font-bold">Work Experiences</h1>
        </section>

        {workExperienceData.map((experience, index) => (
          <div key={index}>
            {/* Work Experience Details */}
            <section className="mt-4">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <h3 className="text-[15px] font-bold text-lime-600 whitespace-pre-line">
                      {experience.title}
                    </h3>
                    <span className="text-gray-500 font-medium text-sm sm:text-right">
                      {experience.date}
                    </span>
                  </div>
                  <div className="flex flex-col mt-2">
                    <div className="text-gray-500 font-light text-sm">
                      {experience.position}
                    </div>
                    <div className="mt-4 text-gray-600 font-light text-sm">
                      {experience.description}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Projects */}
            {experience.projects.map((project, projIndex) => (
              <div key={projIndex}>
                <section className="mt-6">
                  <div className="text-gray-600 font-light text-[13px]">
                    <div className="flex flex-col sm:flex-row ml-0 sm:ml-4">
                      <span className="text-base font-bold flex flex-col min-w-[100px] sm:w-1/4">
                        <span>{project.title}</span>
                        <span className="text-sm text-slate-400 font-light whitespace-pre-line">
                          {project.date}
                        </span>
                      </span>
                      <span className="mt-2 sm:mt-0 sm:ml-6 whitespace-pre-line sm:w-3/4">
                        {project.description}

                        {/* 하위 설명(sub_description) 처리 */}
                        <ul className="mt-4">
                          {project.sub_description.map((item, itemIndex) => {
                            // 문자열 배열인 경우 그대로 렌더링
                            if (typeof item === "string") {
                              return (
                                <li
                                  key={itemIndex}
                                  className="mb-2 ml-4"
                                  style={{ listStyleType: "circle" }}
                                >
                                  {item}
                                </li>
                              );
                            }
                            // title과 description 배열을 가진 객체인 경우 -> CollapsibleItem으로 처리
                            else {
                              return (
                                <li key={itemIndex} className="mb-4">
                                  <CollapsibleItem
                                    title={item.title}
                                    description={item.description}
                                  />
                                </li>
                              );
                            }
                          })}
                        </ul>
                      </span>
                    </div>
                  </div>
                </section>

                {/* 기술 스택 */}
                <section>
                  <div className="flex ml-0 sm:ml-4">
                    <span className="text-sm font-medium flex flex-col min-w-[100px] sm:w-1/4"></span>
                    <div className="sm:w-3/4">
                      <span className="mt-4 sm:ml-6 inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        {project.techStack}
                      </span>
                    </div>
                  </div>
                </section>

                {/* 프로젝트 간 구분선 */}
                {projIndex !== experience.projects.length - 1 && (
                  <div className="border-t border-gray-300 my-4"></div>
                )}
              </div>
            ))}

            {/* 경험 간 구분선 */}
            {index !== workExperienceData.length - 1 && (
              <div className="border-t border-black my-6"></div>
            )}
          </div>
        ))}
      </CommonLineDivider>
    </div>
  );
}
