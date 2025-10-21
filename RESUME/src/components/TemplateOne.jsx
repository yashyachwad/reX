import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, Github, Globe, ExternalLink } from "lucide-react";
import { Linkedin } from "lucide-react";
import { formatYearMonth } from "../utils/helper";

const sectionTitleClass =
  "text-base font-bold uppercase tracking-wide mb-1 pb-1 border-b border-gray-300";

const TemplateTwo = ({ resumeData = {}, containerWidth }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    languages = [],
    workExperience = [],
    projects = [],
    skills = [],
    certifications = [],
    interests = [],
  } = resumeData;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (resumeRef.current && containerWidth > 0) {
      const actualWidth = resumeRef.current.offsetWidth;
      setBaseWidth(actualWidth);
      setScale(containerWidth / actualWidth);
    }
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="resume-section p-4 bg-white font-sans text-black max-w-4xl mx-auto"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
        height: "1123px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight mb-2">{profileInfo.fullName}</h1>
        <p className="text-sm text-gray-600 font-medium mb-2">{profileInfo.designation}</p>
        <div className="flex flex-wrap justify-center gap-1 text-[11px] text-gray-700">
          {contactInfo.phone && <span>{contactInfo.phone}</span>}
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} className="hover:underline text-blue-600">
              {contactInfo.email}
            </a>
          )}
          {contactInfo.linkedin && (
            <a href={contactInfo.linkedin} className="hover:underline text-blue-600">
              LinkedIn
            </a>
          )} { "|"}
          {contactInfo.github && (
            <a href={contactInfo.github} className="hover:underline text-blue-600">
              GitHub
            </a>
          )}
          {contactInfo.website && (
            <a href={contactInfo.website} className="hover:underline text-blue-600">
              Portfolio
            </a>
          )}
        </div>
      </div>

      <hr className="border-gray-300 mb-2" />

      {/* Summary */}
      {profileInfo.summary && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Summary</h2>
          <p className="text-[11px] text-gray-800 leading-tight">{profileInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Experience</h2>
          <div className="space-y-2">
            {workExperience.map((exp, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[12px] pb-2 text-gray-800">{exp.role}</h3>
                    <p className="italic text-[11px] pb-2 text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-[11px] text-right text-gray-600">
                    <p className="italic">
                      {formatYearMonth(exp.startDate)} - {formatYearMonth(exp.endDate)}
                    </p>
                    {exp.location && <p className="text-[11px]">{exp.location}</p>}
                  </div>
                </div>
                {exp.technologies && (
                  <p className="bg-gray-100 text-[10px] font-mono px-1.5 py-0.5 rounded inline-block">
                    {exp.technologies}
                  </p>
                )}
                <ul className=" mt-0.5 text-[12px] text-gray-700">
                  {exp.description?.split("\n").map((line, i) => (
                    <li key={i} className="pb-1">{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Projects</h2>
          <div className="space-y-2">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-[12px] text-gray-800">{proj.title}</h3>
                  {proj.link && (
                    <a href={proj.link} className="text-blue-600 text-[11px] hover:underline">
                      {proj.linkType || "Link"}
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <p className="bg-gray-100 pb-2 text-[10px] font-mono px-1.5 py-0.5 rounded inline-block">
                    {proj.technologies}
                  </p>
                )}
                <p className="text-[11px] pb-2 text-gray-700">{proj.description}</p>
                <div className="flex gap-1 mt-0.5 pt-2 text-[11px]">
                  {proj.github && (
                    <a href={proj.github} className="flex items-center gap-0.5 hover:underline text-blue-600">
                      <Github size={10} /> GitHub
                    </a>
                  )}
                  {proj.liveDemo && (
                    <a href={proj.liveDemo} className="flex items-center gap-0.5 hover:underline text-blue-600">
                      <ExternalLink size={10} /> Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}



{/* Skills */}
{skills.length > 0 && (
  <section className="mb-2">
    <h2 className={sectionTitleClass}>Skills</h2>
    <div className="flex flex-wrap gap-2 text-[11px]">
      {skills.map((skill, idx) => {
        // Example: pick a color based on index
        const colors = ["#facc15", "#60a5fa", "#34d399", "#f472b6", "#f97316", "#a78bfa"];
        const bgColor = colors[idx % colors.length] + "33"; // 33 for light transparency
        const textColor = colors[idx % colors.length];

        return (
          <div
            key={idx}
            className="px-3 py-1 rounded-md font-medium"
            style={{
              backgroundColor: bgColor,
              color: textColor,
            }}
          >
            {skill.name}
            {skill.progress > 0 && (
              <span className="ml-1 text-sm font-normal">({skill.progress}%)</span>
            )}
          </div>
        );
      })}
    </div>
  </section>
)}


{/* Education */}
{education.length > 0 && (
  <section className="mb-2">
    <h2 className={sectionTitleClass}>Education</h2>
    <div className="space-y-1">
      {education.map((edu, idx) => (
        <div key={idx} className="text-[11px] text-gray-700">
          <h3 className="font-semibold text-[12px] text-gray-800">
            {edu.degree}
          </h3>
          <p className="italic text-gray-600">{edu.institution}</p>
          <p className="text-gray-500">
            {edu.startDate} - {edu.endDate}
          </p>
        </div>
      ))}
    </div>
  </section>
)}

{/* Languages */}
{languages.length > 0 && (
  <section className="mb-2">
    <h2 className={sectionTitleClass}>Languages</h2>
    <div className="space-y-1">
      {languages.map((lang, idx) => (
        <div key={idx} className="flex items-center justify-between text-[11px] text-gray-700">
          <span className="font-medium text-gray-800">{lang.name}</span>
          {lang.progress && (
            <div className="w-32 bg-gray-200 rounded-full h-1.5 ml-2">
              <div
                className="h-1.5 rounded-full bg-blue-500"
                style={{ width: `${lang.progress}%` }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
)}

{/* Interests */}
{interests.length > 0 && (
  <section className="mb-2">
    <h2 className={sectionTitleClass}>Interests</h2>
    <div className="flex flex-wrap gap-2 text-[11px]">
      {interests.map((interest, idx) => (
        <div
          key={idx}
          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md"
        >
          {interest}
        </div>
      ))}
    </div>
  </section>
)}

{/* Certifications */}
{certifications.length > 0 && (
  <section className="mb-2">
    <h2 className={sectionTitleClass}>Certifications</h2>
    <div className="space-y-1 text-[11px] text-gray-700">
      {certifications.map((cert, idx) => (
        <div key={idx} className="bg-gray-100 px-2 py-1 rounded-md">
          <h3 className="font-semibold text-gray-800">{cert.title}</h3>
          <p className="text-gray-600">{cert.issuer}</p>
          {cert.year && <p className="text-gray-500">{cert.year}</p>}
        </div>
      ))}
    </div>
  </section>
)}





    </div>
  );
};

export default TemplateTwo;
