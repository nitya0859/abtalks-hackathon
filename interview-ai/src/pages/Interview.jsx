import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";

import Logo from "../components/common/Logo";
import ProgressSidebar from "../components/interview/ProgressSidebar";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import ThinkingCard from "../components/interview/ThinkingCard";
import EvaluationPanel from "../components/interview/EvaluationPanel";

const Interview = () => {
  const navigate = useNavigate();

  // ============================================================
  // INTERVIEW CONTEXT
  // ============================================================

  const {
    candidateName,
    effectiveRole,
    difficulty,

    currentQuestion,
    currentQuestionIndex,
    totalQuestions,

    isThinking,
    isFollowUpPhase,

    interviewCompleted,

    finishInterview,
  } = useInterview();


  // ============================================================
  // LOCAL UI STATE
  // ============================================================

  const [showFinishConfirmation, setShowFinishConfirmation] =
    useState(false);


  // ============================================================
  // REDIRECT TO REPORT
  // ============================================================

  useEffect(() => {
    if (!interviewCompleted) {
      return;
    }

    navigate("/report", {
      replace: true,
    });
  }, [
    interviewCompleted,
    navigate,
  ]);


  // ============================================================
  // SAFETY
  // ============================================================

  if (!currentQuestion && !interviewCompleted) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">

          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <span className="text-purple-400 text-xl">
              !
            </span>
          </div>

          <h1 className="text-lg font-semibold mb-2">
            Interview could not be loaded
          </h1>

          <p className="text-sm text-slate-400 mb-5">
            We couldn't find the current interview question.
            Please return to setup and start the interview again.
          </p>

          <button
            onClick={() => navigate("/setup")}
            className="
              px-5
              py-2.5
              rounded-xl
              text-sm
              font-semibold
              text-white
              bg-gradient-to-r
              from-purple-600
              to-indigo-600
              hover:from-purple-500
              hover:to-indigo-500
              transition
            "
          >
            Back to Setup
          </button>

        </div>
      </div>
    );
  }


  // ============================================================
  // FINISH INTERVIEW
  // ============================================================

  const handleFinishInterview = () => {
    // Don't allow the candidate to finish while
    // Evoke is evaluating the current answer.

    if (isThinking) {
      return;
    }

    setShowFinishConfirmation(true);
  };


  // ============================================================
  // CONFIRM FINISH
  // ============================================================

  const confirmFinishInterview = () => {
    setShowFinishConfirmation(false);

    finishInterview();
  };


  // ============================================================
  // CANCEL FINISH
  // ============================================================

  const cancelFinishInterview = () => {
    setShowFinishConfirmation(false);
  };


  // ============================================================
  // CURRENT QUESTION NUMBER
  // ============================================================

  const questionNumber =
    currentQuestionIndex + 1;


  // ============================================================
  // FOLLOW-UP STATUS
  // ============================================================

  const sessionStatus = isThinking
    ? "Evoke is evaluating your answer"
    : isFollowUpPhase
    ? "Follow-up question"
    : "Your turn to answer";


  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col">

      {/* ======================================================
          TOP NAVIGATION
      ====================================================== */}

      <header
        className="
          h-[72px]
          flex
          items-center
          justify-between
          px-4
          sm:px-6
          border-b
          border-slate-800/70
          bg-slate-950/90
          backdrop-blur-xl
          flex-shrink-0
        "
      >

        {/* Logo */}

        <Logo />


        {/* Session information */}

        <div className="hidden md:flex items-center gap-4">

          {/* Live indicator */}

          <div className="flex items-center gap-2 text-xs text-slate-400">

            <span
              className={`
                w-2
                h-2
                rounded-full
                ${
                  isThinking
                    ? "bg-amber-400"
                    : "bg-purple-500 animate-pulse"
                }
              `}
            />

            <span>
              {isThinking
                ? "Evoke is thinking..."
                : "Live Interview"}
            </span>

          </div>


          {/* Divider */}

          <div className="h-4 w-px bg-slate-800" />


          {/* Role */}

          <div className="text-xs text-slate-500">
            {effectiveRole || "Technical Interview"}
          </div>

        </div>


        {/* Finish button */}

        <button
          type="button"
          onClick={handleFinishInterview}
          disabled={isThinking}
          className="
            py-2
            px-4
            rounded-xl
            text-xs
            font-semibold
            text-white
            bg-gradient-to-r
            from-purple-600
            via-indigo-600
            to-purple-600
            hover:from-purple-500
            hover:to-indigo-500
            disabled:opacity-40
            disabled:cursor-not-allowed
            transition
            shadow-md
            shadow-purple-900/30
          "
        >
          {isThinking
            ? "Evaluating..."
            : "Finish Interview"}
        </button>

      </header>


      {/* ======================================================
          MOBILE SESSION STATUS
      ====================================================== */}

      <div
        className="
          lg:hidden
          px-4
          pt-4
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            p-3
            rounded-xl
            bg-slate-900/60
            border
            border-slate-800
          "
        >

          <div className="min-w-0">

            <p className="text-xs text-slate-500">
              {effectiveRole || "Technical Interview"}
            </p>

            <p className="text-sm font-medium text-slate-200 truncate">
              {sessionStatus}
            </p>

          </div>


          <div
            className="
              flex-shrink-0
              px-2.5
              py-1
              rounded-lg
              bg-purple-500/10
              border
              border-purple-500/20
              text-[10px]
              font-semibold
              text-purple-300
            "
          >
            {questionNumber}/{totalQuestions}
          </div>

        </div>

      </div>


      {/* ======================================================
          MAIN INTERVIEW AREA
      ====================================================== */}

      <main
        className="
          flex-1
          p-4
          sm:p-6
          max-w-[1700px]
          w-full
          mx-auto
          flex
          flex-col
          lg:flex-row
          gap-6
        "
      >

        {/* ====================================================
            LEFT SIDEBAR
        ==================================================== */}

        <ProgressSidebar
          candidateName={
            candidateName || "Candidate"
          }

          role={
            effectiveRole ||
            "Technical Role"
          }

          difficulty={
            difficulty || "Medium"
          }

          currentQuestion={
            questionNumber
          }

          totalQuestions={
            totalQuestions
          }
        />


        {/* ====================================================
            CENTER INTERVIEW AREA
        ==================================================== */}

        <section
          className="
            flex-1
            flex
            flex-col
            gap-5
            min-w-0
          "
        >

          {/* ==================================================
              QUESTION HEADER
          ================================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >

            <div>

              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.15em]
                  text-purple-400
                  font-semibold
                  mb-1
                "
              >
                {isFollowUpPhase
                  ? "Follow-up"
                  : "Interview Question"}
              </p>

              <p className="text-xs text-slate-500">
                Question {questionNumber} of{" "}
                {totalQuestions}
              </p>

            </div>


            {/* Status */}

            <div
              className={`
                hidden
                sm:flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-lg
                border
                text-[10px]
                font-medium

                ${
                  isThinking
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-300"
                    : isFollowUpPhase
                    ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                }
              `}
            >

              <span
                className={`
                  w-1.5
                  h-1.5
                  rounded-full

                  ${
                    isThinking
                      ? "bg-amber-400 animate-pulse"
                      : isFollowUpPhase
                      ? "bg-indigo-400"
                      : "bg-emerald-400"
                  }
                `}
              />

              {sessionStatus}

            </div>

          </div>


          {/* ==================================================
              QUESTION CARD
          ================================================== */}

          <QuestionCard
            questionNumber={
              questionNumber
            }

            topic={
              currentQuestion?.topic ||
              "Technical"
            }

            difficulty={
              currentQuestion?.difficulty ||
              difficulty ||
              "Medium"
            }

            questionText={
              currentQuestion?.question ||
              "Let's begin the interview."
            }
          />


          {/* ==================================================
              ANSWER BOX
          ================================================== */}

          <AnswerBox />


          {/* ==================================================
              THINKING STATE
          ================================================== */}

          <ThinkingCard
            isThinking={
              isThinking
            }
          />


          {/* ==================================================
              INTERVIEW GUIDANCE
          ================================================== */}

          {!isThinking && (
            <div
              className="
                flex
                items-start
                gap-3
                p-3.5
                rounded-xl
                bg-slate-900/40
                border
                border-slate-800/60
              "
            >

              <div
                className="
                  w-7
                  h-7
                  rounded-lg
                  bg-purple-500/10
                  border
                  border-purple-500/20
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <span className="text-xs text-purple-300">
                  ✦
                </span>
              </div>

              <div>

                <p className="text-xs font-medium text-slate-300">
                  Interview tip
                </p>

                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Be specific. Explain your reasoning and use
                  examples from your projects or experience
                  whenever relevant.
                </p>

              </div>

            </div>
          )}

        </section>


        {/* ====================================================
            RIGHT EVALUATION PANEL
        ==================================================== */}

        <EvaluationPanel />

      </main>


      {/* ======================================================
          FINISH CONFIRMATION MODAL
      ====================================================== */}

      {showFinishConfirmation && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            px-4
            bg-slate-950/70
            backdrop-blur-sm
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              bg-slate-900
              border
              border-slate-800
              shadow-2xl
              p-6
            "
          >

            {/* Icon */}

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-purple-500/10
                border
                border-purple-500/20
                flex
                items-center
                justify-center
                mb-4
              "
            >
              <span className="text-purple-300 text-lg">
                ?
              </span>
            </div>


            <h2 className="text-lg font-semibold text-white">
              End this interview?
            </h2>


            <p
              className="
                mt-2
                text-sm
                text-slate-400
                leading-relaxed
              "
            >
              Your answers so far will be saved and Evoke
              will generate your interview report. You can
              review your strengths, weaknesses and readiness
              score afterward.
            </p>


            {/* Actions */}

            <div
              className="
                flex
                flex-col-reverse
                sm:flex-row
                gap-3
                mt-6
              "
            >

              <button
                type="button"
                onClick={
                  cancelFinishInterview
                }
                className="
                  flex-1
                  py-2.5
                  rounded-xl
                  text-sm
                  font-medium
                  text-slate-300
                  bg-slate-950
                  border
                  border-slate-800
                  hover:border-slate-700
                  hover:text-white
                  transition
                "
              >
                Continue Interview
              </button>


              <button
                type="button"
                onClick={
                  confirmFinishInterview
                }
                className="
                  flex-1
                  py-2.5
                  rounded-xl
                  text-sm
                  font-semibold
                  text-white
                  bg-gradient-to-r
                  from-purple-600
                  to-indigo-600
                  hover:from-purple-500
                  hover:to-indigo-500
                  transition
                "
              >
                End & View Report
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Interview;