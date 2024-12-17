"use client";
import CommonLineDivider from "@/components/CommonLineDivider";
import React from "react";

// 프로젝트 데이터 예시
const projectData = [
  {
    title: "Text to Diagram",
    date: "",
    link: "https://textdiagram.com/",
    description:
      "주어진 text의 효율적인 이해를 위해, LLM을 이용하여 입력된 TEXT를 각각 tree, example, logical progression의 형태로 제공하는 서비스",
    sub_description: [],
    techStack: "React | Typescript | Next | tailwind | Langchain.js",
  },
  {
    title: "Save your time",
    date: "22.11 - 23.01",
    link: "https://chiacn.github.io/saveyourtime/home",
    description: "효율적인 자습을 위한 시간 관리 타이머",
    sub_description: [
      "React의 기본적인 상태관리를 이해하기 위한 useEffect, useState, useRef, useReducer 등 기본 Hook 사용",
      "React 환경에서 setInterval 사용의 문제점을 다룬 Article 내용 실습\n( https://overreacted.io/making-setinterval-declarative-with-react-hooks/ )",
    ],
    techStack: "React, TypeScript",
  },
];

const goToLink = (link: string) => {
  if (link && link !== "") {
    window.open(link, "_blank");
  }
};

export default function Page() {
  return (
    <div className="my-4 px-4 flex flex-col items-center sm:px-6 lg:px-8 sm:items-start">
      {/* 프로젝트 헤더 */}
      <CommonLineDivider>
        <h2 className="text-2xl font-bold">Side Projects</h2>
        {projectData.map((project, index) => (
          <div key={index} className="mt-6">
            {/* 프로젝트 타이틀 및 기간 */}
            <section className="flex flex-col sm:flex-row justify-between">
              <div
                className={`flex items-center ${
                  !project.link || project.link === ""
                    ? ""
                    : "hover:cursor-pointer"
                }`}
                onClick={() => goToLink(project.link)}
              >
                <h3 className="text-[15px] font-bold whitespace-pre-line">
                  {project.title}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right h-4 w-4"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </div>
              <span className="text-gray-500 font-medium text-sm sm:text-right">
                {!project.date || project.date === "" ? "" : project.date}
              </span>
            </section>

            {/* 프로젝트 설명 */}
            <section className="mt-2 text-gray-600 font-light text-sm">
              <p>{project.description}</p>
              <ul
                className="mt-4 ml-4 whitespace-pre-line"
                style={{ listStyleType: "disc" }}
              >
                {project.sub_description.map((desc, descIndex) => (
                  <li key={descIndex} className="mb-2">
                    {desc}
                  </li>
                ))}
              </ul>
            </section>

            {/* 기술 스택 */}
            <section className="mt-4">
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                {project.techStack}
              </span>
            </section>

            {/* 프로젝트 간 구분선 */}
            {index !== projectData.length - 1 && (
              <div className="border-t border-gray-300 my-6"></div>
            )}
          </div>
        ))}
      </CommonLineDivider>
    </div>
  );
}
