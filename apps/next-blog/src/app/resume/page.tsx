import CommonLineDivider from "@/components/CommonLineDivider";
import { workExperienceData } from "@/data/resume";
import React from "react";

export default function Page() {
  return (
    <div className="my-4">
      <CommonLineDivider>
        <section className="mb-3">
          <h1 className="font-black text-lg text-slate-700">최한봄</h1>
        </section>

        <section>
          <span className="text-lg text-bold">Frontend Engineer</span>
        </section>

        <section className="flex mt-6">
          <span>devhhbb@gmail.com</span>
        </section>
      </CommonLineDivider>
      <CommonLineDivider>
        <section className="flex flex-col mt-6">
          <h1 className="text-xl text-slate-500 font-bold">Work Experiences</h1>
        </section>

        {workExperienceData.map((experience, index) => (
          <div key={index}>
            {/* Work Experience Details */}
            <section className="mt-4">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <h3 className="text-[15px] font-bold text-lime-600 whitespace-pre-line">
                      {experience.title}
                    </h3>
                    <span className="text-gray-500 font-medium text-sm">
                      {experience.date}
                    </span>
                  </div>
                  <div className="flex flex-col">
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
                    <div className="flex ml-4">
                      <span
                        className="text-base font-bold flex flex-col min-w-[100px]"
                        style={{ flex: 1 }}
                      >
                        <span>{project.title}</span>
                        <span className="text-sm text-slate-400 font-light whitespace-pre-line">
                          {project.date}
                        </span>
                      </span>
                      <span
                        className="ml-6 whitespace-pre-line"
                        style={{ flex: 4 }}
                      >
                        {project.description}
                        <ul
                          className="mt-4 ml-4"
                          style={{ listStyleType: "circle" }}
                        >
                          {project.sub_description.map((desc, descIndex) => (
                            <li key={descIndex} className="mb-2">
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </span>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="flex ml-4">
                    <span
                      className="text-sm font-medium flex flex-col min-w-[100px]"
                      style={{ flex: 1 }}
                    ></span>
                    {/* <span className="mt-4 ml-6 text-sm" style={{ flex: 4 }}>
                      {project.techStack}
                    </span> */}
                    <span style={{ flex: 4 }}>
                      <span className="mt-4 ml-6 inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        {project.techStack}
                      </span>
                    </span>
                  </div>
                </section>

                {/* 구분선 추가 */}
                {projIndex !== experience.projects.length - 1 && (
                  <div className="border-t border-gray-300 my-4"></div>
                )}
              </div>
            ))}
            {/* 구분선 추가 (Experience) */}
            {index !== workExperienceData.length - 1 && (
              <div className="border-t border-black my-6"></div>
            )}
          </div>
        ))}
      </CommonLineDivider>
    </div>
  );
}
