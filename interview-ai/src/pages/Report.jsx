import Logo from "../components/common/Logo";
import OverallScore from "../components/report/OverallScoreCard";
import SummaryCard from "../components/report/SummaryCard";
import Performance from "../components/report/PerformanceChart";
import StrengthCard from "../components/report/StrengthCard";
import Weakness from "../components/report/WeaknessCard";
import TimelineCard from "../components/report/TimelineCard";
import LearningRoadmap from "../components/report/LearningRoadmap";
import ActionButtons from "../components/report/ActionButtons";

const Report = () => {
  // ============================================================
  // TEMPORARY FRONTEND DATA
  // We will connect this to InterviewContext / AI later.
  // ============================================================

  const candidate = {
    name: "jj",
    role: "Software Engineer",
    assessmentDate: "August 9, 2026",
  };

  const overallScore = 0;

  const summary = `
    "jj demonstrated developing performance during the Software Engineer
    interview, achieving an overall score of 0%. The assessment was based
    on 6 evaluated responses. The strongest area was technical accuracy,
    while technical accuracy represents the biggest opportunity for
    improvement. The candidate has a strong background in programming
    languages and data structures, as evident from their resume. The
    candidate needs to work on providing clear and relevant answers to
    technical questions. Based on the evaluated responses, the current
    recommendation is Needs Improvement."
  `;

  const strengths = [
    "The candidate has a strong background in programming languages and data structures, as evident from their resume.",
    "The candidate has experience with various projects and technologies, which could be beneficial in a software development role.",
  ];

  const weaknesses = [
    "The candidate needs to work on providing clear and relevant answers to technical questions.",
    "The candidate should review the fundamentals of data structures, specifically queues and linked lists, to improve their understanding and ability to explain these concepts.",
    "Provide a clear and concise answer to the question, focusing on the implementation of a simple stack using an array in Python and the trade-offs of using an array versus a linked list.",
    "Review the fundamentals of data structures, particularly stacks, and practice explaining technical concepts in a structured and logical manner.",
    "The candidate needs to improve their ability to communicate technical ideas and provide accurate answers to technical questions.",
  ];

  const timeline = [
    {
      question:
        "Can you explain how you would implement a simple queue data structure using a linked list?",
      topic: "Data Structures & Algorithms",
      score: 0,
      rating: "Needs Improvement",
    },
    {
      question:
        "Can you explain how you would implement a simple stack using an array?",
      topic: "Data Structures & Algorithms",
      score: 0,
      rating: "Needs Improvement",
    },
    {
      question:
        "How would you implement a simple stack using an array in Python?",
      topic: "Data Structures & Algorithms",
      score: 0,
      rating: "Needs Improvement",
    },
    {
      question:
        "How would you implement a simple array-based stack in Python?",
      topic: "Data Structures & Algorithms",
      score: 0,
      rating: "Needs Improvement",
    },
    {
      question:
        "How would you implement a simple stack using a linked list in Python?",
      topic: "Data Structures & Algorithms",
      score: 0,
      rating: "Needs Improvement",
    },
    {
      question:
        "What are the trade-offs between an array-based and linked-list-based stack?",
      topic: "Data Structures & Algorithms",
      score: 0,
      rating: "Needs Improvement",
    },
  ];

  const roadmap = [
    {
      number: "01",
      topic: "Data Structures & Algorithms",
      description:
        "The candidate needs to work on providing clear and relevant answers to technical questions.",
      action: "Review",
    },
    {
      number: "02",
      topic: "Data Structures & Algorithms",
      description:
        "The candidate should review the fundamentals of data structures, specifically queues and linked lists, to improve their understanding and ability to explain these concepts.",
      action: "Practice",
    },
    {
      number: "03",
      topic: "Data Structures & Algorithms",
      description:
        "Provide a clear and concise answer to the question, focusing on the implementation of a simple stack using an array in Python and the trade-offs of using an array versus a linked list.",
      action: "Strengthen",
    },
    {
      number: "04",
      topic: "Data Structures & Algorithms",
      description:
        "Review the fundamentals of data structures, particularly stacks, and practice explaining technical concepts in a structured and logical manner.",
      action: "Apply",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f1ede4] text-[#25231f]">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 h-[76px] bg-[#f1ede4]/95 backdrop-blur-xl border-b border-[#d8d1c5]">

        <div className="h-full max-w-[1500px] mx-auto px-5 sm:px-7 lg:px-9 flex items-center justify-between">

          {/* LOGO */}

          <div className="flex items-center">
            <Logo />
          </div>

          {/* CENTER NAV */}

          <div className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">

            <div className="flex items-center gap-2 text-sm font-medium text-[#625d54]">

              <span className="w-2 h-2 rounded-full bg-[#687a65]" />

              <span>Assessment Report</span>

            </div>

            <span className="w-px h-5 bg-[#d4cec3]" />

            <span className="text-sm text-[#777167]">
              Technical Interview
            </span>

          </div>

          {/* RIGHT STATUS */}

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#e9eee5] border border-[#cbd5c7]">

            <span className="w-1.5 h-1.5 rounded-full bg-[#687a65]" />

            <span className="text-xs font-semibold text-[#5f705d]">
              Report Ready
            </span>

          </div>

        </div>
      </header>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">


        {/* ===================================================
            REPORT HERO
        =================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-[#ddd7cd]
            bg-[#faf8f4]
            shadow-[0_8px_30px_rgba(72,65,54,0.06)]
            p-6
            sm:p-8
            lg:p-10
          "
        >

          {/* Background glow */}

          <div
            className="
              absolute
              -top-24
              -right-24
              w-64
              h-64
              rounded-full
              bg-[#dfe7dc]
              opacity-40
              blur-3xl
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              -bottom-24
              -left-24
              w-64
              h-64
              rounded-full
              bg-[#e8dfd2]
              opacity-50
              blur-3xl
              pointer-events-none
            "
          />


          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* =================================================
                HERO LEFT
            ================================================= */}

            <div className="min-w-0">

              {/* STATUS */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-1.5
                  rounded-full
                  bg-[#eee9e0]
                  border
                  border-[#dcd5ca]
                  text-[#71695f]
                  text-xs
                  font-semibold
                  mb-5
                "
              >

                <span className="w-1.5 h-1.5 rounded-full bg-[#687a65]" />

                Interview Assessment Complete

              </div>


              {/* TITLE */}

              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-bold
                  tracking-tight
                  text-[#292721]
                "
              >
                Candidate Evaluation Report
              </h1>


              {/* DESCRIPTION */}

              <p
                className="
                  mt-4
                  text-sm
                  sm:text-base
                  text-[#777269]
                  max-w-2xl
                  leading-relaxed
                "
              >
                Comprehensive AI technical evaluation for{" "}

                <span className="font-semibold text-[#3f3b35]">
                  {candidate.name}
                </span>{" "}

                applying for the position of{" "}

                <span className="font-semibold text-[#5f705d]">
                  {candidate.role}
                </span>
                .
              </p>


              {/* META */}

              <div className="flex flex-wrap items-center gap-3 mt-6">

                <span className="text-xs text-[#817a70]">
                  Assessment Date:
                </span>

                <span className="text-xs font-semibold text-[#4f4a43]">
                  {candidate.assessmentDate}
                </span>

                <span className="hidden sm:block text-[#c9c2b7]">
                  •
                </span>

                <span className="text-xs text-[#817a70]">
                  Recommendation:
                </span>

                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-[#f1e9dc]
                    border
                    border-[#dfcfb8]
                    text-[#806f58]
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                  "
                >
                  Needs Improvement
                </span>

              </div>

            </div>


            {/* =================================================
                SCORE
            ================================================= */}

            <div className="flex-shrink-0 flex justify-center lg:justify-end">

              <OverallScore
                score={overallScore}
                recommendation="Needs Improvement"
                candidateName={candidate.name}
                role={candidate.role}
                date={candidate.assessmentDate}
              />

            </div>

          </div>

        </section>


        {/* ===================================================
            EXECUTIVE SUMMARY
        =================================================== */}

        <section className="mt-6">

          <SummaryCard
            candidateName={candidate.name}
            role={candidate.role}
            summary={summary}
            summaryText={summary}
          />

        </section>


        {/* ===================================================
            PERFORMANCE SUMMARY
        =================================================== */}

        <section className="mt-6">

          <Performance />

        </section>


        {/* ===================================================
            STRENGTHS + WEAKNESSES
        =================================================== */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">


          {/* =================================================
              KEY STRENGTHS
          ================================================= */}

          <div
            className="
              rounded-[22px]
              border
              border-[#ddd7cd]
              bg-[#faf8f4]
              shadow-[0_8px_30px_rgba(72,65,54,0.05)]
              p-5
              sm:p-6
            "
          >

            <div className="mb-5">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-[#e9eee5]
                    border
                    border-[#cbd5c7]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <span className="text-[#687a65] text-sm">
                    ✓
                  </span>
                </div>

                <div>

                  <h2 className="text-lg font-semibold text-[#302d28]">
                    Key Strengths
                  </h2>

                  <p className="text-xs text-[#817a70] mt-1">
                    Verified competencies from your interview responses
                  </p>

                </div>

              </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {strengths.map((strength, index) => (

                <StrengthCard
                  key={index}
                  text={strength}
                />

              ))}

            </div>

          </div>


          {/* =================================================
              AREAS TO IMPROVE
          ================================================= */}

          <div
            className="
              rounded-[22px]
              border
              border-[#ddd7cd]
              bg-[#faf8f4]
              shadow-[0_8px_30px_rgba(72,65,54,0.05)]
              p-5
              sm:p-6
            "
          >

            <div className="mb-5">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-[#f1e9dc]
                    border
                    border-[#dfcfb8]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <span className="text-[#806f58] text-sm font-bold">
                    !
                  </span>
                </div>

                <div>

                  <h2 className="text-lg font-semibold text-[#302d28]">
                    Areas to Improve
                  </h2>

                  <p className="text-xs text-[#817a70] mt-1">
                    Targeted growth areas identified from your responses
                  </p>

                </div>

              </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {weaknesses.map((weakness, index) => (

                <Weakness
                  key={index}
                  text={weakness}
                />

              ))}

            </div>

          </div>

        </section>


        {/* ===================================================
            AI INTERVIEW TIMELINE
        =================================================== */}

        <section className="mt-6">

          <TimelineCard
            timeline={timeline}
          />

        </section>


        {/* ===================================================
            LEARNING ROADMAP
        =================================================== */}

        <section className="mt-6">

          <LearningRoadmap
            roadmap={roadmap}
          />

        </section>


        {/* ===================================================
            FOOTER ACTIONS
        =================================================== */}

        <section className="mt-8 pt-6 border-t border-[#d8d1c5]">

          <ActionButtons />

        </section>

      </main>

    </div>
  );
};

export default Report;