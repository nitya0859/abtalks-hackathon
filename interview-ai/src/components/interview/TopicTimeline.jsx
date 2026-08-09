import { useInterview } from "../../context/InterviewContext";

const TopicTimeline = () => {
  const {
    selectedTopics,
    customSkills,
    questions,
    currentQuestion,
    answers,
  } = useInterview();

  // ============================================================
  // GET ALL SELECTED TOPICS
  // ============================================================

  const selectedTopicList = [
    ...(Array.isArray(selectedTopics)
      ? selectedTopics
      : []),

    ...(Array.isArray(customSkills)
      ? customSkills
      : []),
  ]
    .filter(
      (topic) =>
        typeof topic === "string" &&
        topic.trim().length > 0
    )
    .map((topic) => topic.trim());

  // ============================================================
  // REMOVE DUPLICATE TOPICS
  // ============================================================

  const uniqueTopics = [];

  selectedTopicList.forEach((topic) => {
    const normalized =
      topic.toLowerCase().trim();

    const alreadyExists =
      uniqueTopics.some(
        (existingTopic) =>
          existingTopic
            .toLowerCase()
            .trim() === normalized
      );

    if (!alreadyExists) {
      uniqueTopics.push(topic);
    }
  });

  // ============================================================
  // BUILD TOPIC STATUS
  // ============================================================

  const topics = uniqueTopics.map(
    (topic, index) => {
      const normalizedTopic =
        topic.toLowerCase().trim();

      // --------------------------------------------------------
      // MAIN QUESTIONS FOR THIS TOPIC
      // --------------------------------------------------------

      const topicQuestions = (
        Array.isArray(questions)
          ? questions
          : []
      ).filter((question) => {
        if (question?.isFollowUp) {
          return false;
        }

        const questionTopic =
          question?.topic
            ?.toLowerCase()
            .trim() || "";

        if (!questionTopic) {
          return false;
        }

        return (
          questionTopic.includes(
            normalizedTopic
          ) ||
          normalizedTopic.includes(
            questionTopic
          )
        );
      });

      // --------------------------------------------------------
      // CHECK IF TOPIC HAS BEEN ANSWERED
      // --------------------------------------------------------

      const hasAnswered =
        topicQuestions.some(
          (question) => {
            const answer =
              answers?.[question.id];

            if (
              typeof answer === "string"
            ) {
              return (
                answer.trim().length > 0
              );
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
                  answer.answer
                    .trim()
                    .length > 0
                );
              }

              if (
                typeof answer.text ===
                "string"
              ) {
                return (
                  answer.text
                    .trim()
                    .length > 0
                );
              }

              return Object.values(
                answer
              ).some(
                (value) =>
                  typeof value ===
                    "string" &&
                  value.trim().length > 0
              );
            }

            return false;
          }
        );

      // --------------------------------------------------------
      // CHECK CURRENT TOPIC
      // --------------------------------------------------------

      const currentTopic =
        currentQuestion?.topic
          ?.toLowerCase()
          .trim() || "";

      const isCurrentTopic =
        currentTopic.length > 0 &&
        (
          currentTopic.includes(
            normalizedTopic
          ) ||
          normalizedTopic.includes(
            currentTopic
          )
        );

      // --------------------------------------------------------
      // STATUS
      // --------------------------------------------------------

      let status = "upcoming";

      if (hasAnswered) {
        status = "completed";
      } else if (isCurrentTopic) {
        status = "active";
      }

      return {
        id: `${topic}-${index}`,
        name: topic,
        status,
      };
    }
  );

  return (
    <div>

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex items-center justify-between mb-4">

        <div>

          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.15em]
              font-bold
              text-[#aaa399]
            "
          >
            Interview Flow
          </p>

          <h3
            className="
              text-sm
              font-semibold
              text-[#25231f]
              mt-1
            "
          >
            Topics
          </h3>

        </div>

        {/* NUMBER OF SELECTED TOPICS */}

        <span className="text-[9px] text-[#aaa399]">
          {topics.length}
        </span>

      </div>

      {/* ==================================================
          NO TOPICS
      ================================================== */}

      {topics.length === 0 ? (

        <div
          className="
            p-3
            rounded-xl
            bg-[#25231f]/[0.025]
            border
            border-[#25231f]/10
          "
        >

          <p className="text-[10px] text-[#777269]">
            No specific topics selected.
          </p>

        </div>

      ) : (

        <div className="relative space-y-2">

          {/* ==================================================
              VERTICAL LINE
          ================================================== */}

          {topics.length > 1 && (

            <div
              className="
                absolute
                left-[13px]
                top-4
                bottom-4
                w-px
                bg-[#25231f]/10
              "
            />

          )}

          {/* ==================================================
              TOPIC ITEMS
          ================================================== */}

          {topics.map((topic) => {

            const isCompleted =
              topic.status ===
              "completed";

            const isActive =
              topic.status ===
              "active";

            return (

              <div
                key={topic.id}
                className={`
                  relative
                  z-10
                  flex
                  items-center
                  gap-3
                  p-2.5
                  rounded-xl
                  border
                  transition-all

                  ${
                    isActive
                      ? "bg-[#292621] border-[#292621] text-[#f6f1e8]"
                      : isCompleted
                      ? "bg-[#536451]/5 border-[#536451]/15 text-[#403c35]"
                      : "bg-white/20 border-[#25231f]/8 text-[#aaa399]"
                  }
                `}
              >

                {/* STATUS ICON */}

                <div
                  className={`
                    w-7
                    h-7
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-[10px]
                    font-bold
                    flex-shrink-0

                    ${
                      isActive
                        ? "bg-[#f6f1e8]/10 text-[#f6f1e8]"
                        : isCompleted
                        ? "bg-[#536451]/10 text-[#536451]"
                        : "bg-[#25231f]/5 text-[#aaa399]"
                    }
                  `}
                >

                  {isCompleted
                    ? "✓"
                    : isActive
                    ? "•"
                    : "○"}

                </div>

                {/* TOPIC NAME */}

                <span
                  className={`
                    text-[10px]
                    font-medium
                    flex-1
                    truncate

                    ${
                      isActive
                        ? "text-[#f6f1e8]"
                        : ""
                    }
                  `}
                >
                  {topic.name}
                </span>

                {/* ACTIVE INDICATOR */}

                {isActive && (

                  <span
                    className="
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-[#f6f1e8]
                      animate-pulse
                    "
                  />

                )}

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
};

export default TopicTimeline;