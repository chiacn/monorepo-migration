"use client";
import CommonLineDivider from "@/components/CommonLineDivider";
import { projectData } from "@/data/project";
import React from "react";

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
            <section className="mt-2 text-gray-600 font-light text-sm whitespace-pre-line">
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
