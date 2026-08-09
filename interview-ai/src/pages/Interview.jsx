import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";

import Logo from "../components/common/Logo";
import ProgressSidebar from "../components/interview/ProgressSidebar";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import ThinkingCard from "../components/interview/ThinkingCard";
import EvaluationPanel from "../components/interview/EvaluationPanel";

import { interviewQuestions } from "../data/questions";

const MINIMUM_ANSWERED_QUESTIONS = 3;

const Interview = () => {
  const navigate = useNavigate();

  // ============================================================
  // LIVE EVALUATION VISIBILITY
  // ============================================================

  // Dashboard is CLOSED when interview starts.
  const [showEvaluation, setShowEvaluation] = useState(false);

  // ============================================================
  // INTERVIEW CONTEXT
  // ============================================================

  const {
    currentQuestion,
    currentQuestionIndex,
    questions,
    difficulty,
    isThinking,
    isFollowUpPhase,
    followUpQuestion,
    interviewCompleted,
    finishInterview,
    answers,
  } = useInterview();

  // ============================================================
  // TOTAL MAIN QUESTIONS
  // ============================================================

  const totalQuestions = 6;

  // ============================================================
  // MAIN QUESTIONS ONLY
  // ============================================================

  const mainQuestions = useMemo(() => {
    if (!Array.isArray(questions)) {
      return [];
    }

    return questions.filter(
      (question) => !question?.isFollowUp
    );
  }, [questions]);

  // ============================================================
  // CURRENT MAIN QUESTION NUMBER
  //
  // Follow-ups do NOT increment this number.
  // ============================================================

  const currentMainQuestionNumber = useMemo(() => {
    if (!Array.isArray(questions)) {
      return 1;
    }

    if (!currentQuestion) {
      return 1;
    }

    if (currentQuestion.isFollowUp) {
      const parentIndex = questions.findIndex(
        (question) =>
          question?.id === currentQuestion?.parentQuestionId
      );

      if (parentIndex >= 0) {
        return (
          questions
            .slice(0, parentIndex + 1)
            .filter(
              (question) =>
                !question?.isFollowUp
            ).length
        );
      }

      // If the backend doesn't provide parentQuestionId,
      // find the closest previous MAIN question.
      for (
        let i = currentQuestionIndex - 1;
        i >= 0;
        i--
      ) {
        if (!questions[i]?.isFollowUp) {
          return (
            questions
              .slice(0, i + 1)
              .filter(
                (question) =>
                  !question?.isFollowUp
              ).length
          );
        }
      }

      return Math.max(
        1,
        mainQuestions.length
      );
    }

    const mainIndex = mainQuestions.findIndex(
      (question) =>
        question?.id === currentQuestion?.id
    );

    return mainIndex >= 0
      ? mainIndex + 1
      : Math.max(
          1,
          mainQuestions.length
        );
  }, [
    questions,
    currentQuestion,
    currentQuestionIndex,
    mainQuestions,
  ]);

  // ============================================================
  // ANSWERED MAIN QUESTIONS
  // ============================================================

  const answeredMainQuestions = useMemo(() => {
    if (
      !Array.isArray(mainQuestions) ||
      !answers ||
      typeof answers !== "object"
    ) {
      return 0;
    }

    return mainQuestions.filter(
      (question) => {
        const answer =
          answers?.[question.id];

        if (
          typeof answer === "string"
        ) {
          return answer.trim().length > 0;
        }

        if (
          typeof answer === "object" &&
          answer !== null
        ) {
          if (
            typeof answer.answer ===
            "string"
          ) {
            return (
              answer.answer.trim()
                .length > 0
            );
          }

          if (
            typeof answer.text ===
            "string"
          ) {
            return (
              answer.text.trim()
                .length > 0
            );
          }

          return Object.values(
            answer
          ).some(
            (value) =>
              typeof value === "string" &&
              value.trim().length > 0
          );
        }

        return false;
      }
    ).length;
  }, [mainQuestions, answers]);

  // ============================================================
  // FINISH CONDITION
  // ============================================================

  const canFinish =
    answeredMainQuestions >=
    MINIMUM_ANSWERED_QUESTIONS;

  // ============================================================
  // QUESTION TEXT
  // ============================================================

  const questionText =
    isFollowUpPhase && followUpQuestion
      ? followUpQuestion
      : currentQuestion?.question ||
        currentQuestion?.questionText ||
        "Let's begin the interview.";

  // ============================================================
  // QUESTION TOPIC
  // ============================================================

  const questionTopic =
    currentQuestion?.topic ||
    "Interview";

  // ============================================================
  // QUESTION DIFFICULTY
  // ============================================================

  const questionDifficulty =
    currentQuestion?.difficulty ||
    difficulty ||
    "Medium";

  // ============================================================
  // STATUS
  // ============================================================

  const statusText = isThinking
    ? "Evoke is thinking"
    : isFollowUpPhase
    ? "Follow-up question"
    : "Your turn to answer";

  // ============================================================
  // REDIRECT TO REPORT
  // ============================================================

  useEffect(() => {
    if (interviewCompleted) {
      navigate("/report");
    }
  }, [interviewCompleted, navigate]);

  // ============================================================
  // FINISH INTERVIEW
  // ============================================================

  const handleFinishInterview = () => {
    if (!canFinish) {
      return;
    }

    if (finishInterview) {
      finishInterview();
    }
  };

  // ============================================================
  // TOGGLE EVALUATION
  // ============================================================

  const toggleEvaluation = () => {
    setShowEvaluation(
      (previous) => !previous
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#f1ede4] text-[#25231f] flex flex-col">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 h-[76px] bg-[#f1ede4]/95 backdrop-blur-xl border-b border-[#d8d1c5]">

        <div className="h-full max-w-[1600px] mx-auto px-5 sm:px-7 lg:px-9 flex items-center justify-between">

          {/* LOGO */}

          <div className="flex items-center flex-shrink-0">
            <Logo />
          </div>

          {/* CENTER HEADER */}

          <div className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">

            <div className="flex items-center gap-2 text-sm font-medium text-[#625d54]">

              <span className="w-2 h-2 rounded-full bg-[#687a65]" />

              <span>
                Live Interview
              </span>

            </div>

            <span className="w-px h-5 bg-[#d4cec3]" />

            <span className="text-sm text-[#777167]">
              Technical Interview
            </span>

          </div>

          {/* RIGHT HEADER */}

          <div className="flex items-center gap-2 sm:gap-3">

            {/* ==================================================
                LIVE EVALUATION BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={toggleEvaluation}
              aria-expanded={showEvaluation}
              aria-label={
                showEvaluation
                  ? "Hide live evaluation"
                  : "Show live evaluation"
              }
              className="
                hidden
                sm:flex
                items-center
                gap-2
                px-3.5
                py-2.5
                rounded-full
                border
                border-[#cbd5c7]
                bg-[#e9eee5]
                text-[#5f705d]
                text-xs
                font-semibold
                hover:bg-[#dfe8dc]
                transition-all
                duration-200
                cursor-pointer
              "
            >

              <span
                className={`
                  w-1.5
                  h-1.5
                  rounded-full

                  ${
                    isThinking
                      ? "bg-[#a58d6d] animate-pulse"
                      : "bg-[#687a65]"
                  }
                `}
              />

              {showEvaluation
                ? "Hide Evaluation"
                : "Live Evaluation"}

            </button>

            {/* ==================================================
                FINISH INTERVIEW
            ================================================== */}

            <button
              type="button"
              onClick={handleFinishInterview}
              disabled={!canFinish}
              title={
                canFinish
                  ? "Finish interview"
                  : `Answer ${MINIMUM_ANSWERED_QUESTIONS} main questions to finish`
              }
              className={`
                px-4
                sm:px-5
                py-2.5
                rounded-full
                text-xs
                sm:text-sm
                font-semibold
                transition-all
                duration-200

                ${
                  canFinish
                    ? "bg-[#b5b2aa] hover:bg-[#a6a39b] text-white cursor-pointer"
                    : "bg-[#d4d1ca] text-[#969188] cursor-not-allowed"
                }
              `}
            >
              Finish Interview
            </button>

          </div>

        </div>

      </header>

      {/* ======================================================
          MAIN
      ====================================================== */}

      <main
        className="
          flex-1
          w-full
          max-w-[1600px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-5
          lg:py-7
          pb-20
        "
      >

        {/* ====================================================
            MOBILE SIDEBAR
        ==================================================== */}

        <div className="lg:hidden mb-5">
          <ProgressSidebar />
        </div>

        {/* ====================================================
            MAIN GRID

            CLOSED:
            Sidebar + Interview

            OPEN:
            Sidebar + Interview + Evaluation
        ==================================================== */}

        <div
          className={`
            grid
            grid-cols-1

            ${
              showEvaluation
                ? "lg:grid-cols-[280px_minmax(0,1fr)_320px] xl:grid-cols-[300px_minmax(0,1fr)_340px]"
                : "lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]"
            }

            gap-5
            lg:gap-6
            items-start
          `}
        >

          {/* ==================================================
              LEFT SIDEBAR
          ================================================== */}

          <aside
            className="
              hidden
              lg:flex
              flex-col
              gap-4
              min-w-0
              sticky
              top-[96px]
              max-h-[calc(100vh-115px)]
              overflow-y-auto
              pr-1
            "
          >

            <ProgressSidebar />

          </aside>

          {/* ==================================================
              CENTER INTERVIEW AREA
          ================================================== */}

          <section className="min-w-0">

            {/* QUESTION TOP HEADER */}

            <div className="flex items-end justify-between gap-4 mb-4">

              <div>

                <p
                  className="
                    text-[10px]
                    sm:text-[11px]
                    uppercase
                    tracking-[0.18em]
                    font-bold
                    text-[#81786b]
                    mb-1.5
                  "
                >
                  {isFollowUpPhase
                    ? "Follow-up Question"
                    : "Interview Question"}
                </p>

                <p className="text-sm text-[#777269]">
                  Question{" "}
                  {currentMainQuestionNumber}{" "}
                  of {totalQuestions}
                </p>

              </div>

              {/* TURN STATUS */}

              <div
                className={`
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  px-3.5
                  py-2
                  rounded-full
                  border
                  text-xs
                  font-semibold
                  flex-shrink-0

                  ${
                    isThinking
                      ? "bg-[#eee6d9] border-[#d7cbbb] text-[#806f58]"
                      : "bg-[#e9eee5] border-[#cbd5c7] text-[#5f705d]"
                  }
                `}
              >

                <span
                  className={`
                    w-2
                    h-2
                    rounded-full

                    ${
                      isThinking
                        ? "bg-[#a58d6d] animate-pulse"
                        : "bg-[#687a65]"
                    }
                  `}
                />

                {statusText}

              </div>

            </div>

            {/* ==================================================
                QUESTION CARD
            ================================================== */}

            <div
              className="
                rounded-[22px]
                overflow-hidden
                border
                border-[#ddd7cd]
                bg-[#faf8f4]
                shadow-[0_8px_30px_rgba(72,65,54,0.06)]
              "
            >

              <QuestionCard
                questionNumber={
                  currentMainQuestionNumber
                }
                topic={questionTopic}
                difficulty={questionDifficulty}
                questionText={questionText}
              />

            </div>

            {/* ==================================================
                ANSWER BOX
            ================================================== */}

            <div
              className="
                mt-5
                rounded-[22px]
                overflow-hidden
                border
                border-[#ddd7cd]
                bg-[#faf8f4]
                shadow-[0_8px_30px_rgba(72,65,54,0.06)]
              "
            >

              <AnswerBox />

            </div>

            {/* ==================================================
                THINKING CARD
            ================================================== */}

            {isThinking && (

              <div className="mt-4">

                <ThinkingCard
                  isThinking={isThinking}
                />

              </div>

            )}

            {/* ==================================================
                INTERVIEW TIP
            ================================================== */}

            {!isThinking && (

              <div
                className="
                  mt-4
                  flex
                  items-start
                  gap-3
                  px-4
                  py-3.5
                  rounded-2xl
                  bg-[#ebe6dc]
                  border
                  border-[#d9d2c6]
                "
              >

                <div
                  className="
                    w-7
                    h-7
                    rounded-lg
                    bg-[#ddd5c7]
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                  "
                >

                  <span className="text-[#665f54] text-sm">
                    ✦
                  </span>

                </div>

                <div>

                  <p className="text-xs font-semibold text-[#4d4942]">
                    Interview tip
                  </p>

                  <p
                    className="
                      text-[11px]
                      text-[#817a70]
                      mt-0.5
                      leading-relaxed
                    "
                  >
                    Be specific. Explain your
                    reasoning, trade-offs, and
                    technical decisions instead
                    of only giving the final answer.
                  </p>

                </div>

              </div>

            )}

          </section>

          {/* ==================================================
              RIGHT LIVE EVALUATION

              IMPORTANT:
              This entire section is NOT rendered
              unless showEvaluation === true.
          ================================================== */}

          {showEvaluation && (

            <aside
              className="
                hidden
                lg:block
                min-w-0
                sticky
                top-[96px]
                max-h-[calc(100vh-115px)]
                overflow-y-auto
                pr-1
              "
            >

              <div className="space-y-4">

                {/* DASHBOARD HEADER */}

                <div>

                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      font-bold
                      text-[#81786b]
                    "
                  >
                    AI Dashboard
                  </p>

                  <h2 className="text-lg font-semibold text-[#302d28] mt-1">
                    Live Evaluation
                  </h2>

                  <p className="text-xs text-[#817a70] mt-1">
                    Your performance as the
                    interview progresses.
                  </p>

                </div>

                {/* ACTUAL EVALUATION */}

                <EvaluationPanel />

              </div>

            </aside>

          )}

        </div>

        {/* ====================================================
            MOBILE LIVE EVALUATION
        ==================================================== */}

        {showEvaluation && (

          <div className="lg:hidden mt-6">

            <div className="mb-3">

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  font-bold
                  text-[#81786b]
                "
              >
                AI Dashboard
              </p>

              <h2 className="text-lg font-semibold text-[#302d28] mt-1">
                Live Evaluation
              </h2>

              <p className="text-xs text-[#817a70] mt-1">
                Your performance as the
                interview progresses.
              </p>

            </div>

            <EvaluationPanel />

          </div>

        )}

      </main>

      {/* ======================================================
          MOBILE STATUS BAR
      ====================================================== */}

      <div
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          z-40
          bg-[#f1ede4]/95
          backdrop-blur-xl
          border-t
          border-[#d8d1c5]
          px-4
          py-2.5
        "
      >

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <span
              className={`
                w-2
                h-2
                rounded-full

                ${
                  isThinking
                    ? "bg-[#a58d6d] animate-pulse"
                    : "bg-[#687a65]"
                }
              `}
            />

            <span className="text-xs font-medium text-[#625d54]">
              {statusText}
            </span>

          </div>

          <span className="text-[11px] text-[#8a8379]">
            {answeredMainQuestions}/
            {MINIMUM_ANSWERED_QUESTIONS}
            {" "}required
          </span>

        </div>

      </div>

    </div>
  );
};

export default Interview;