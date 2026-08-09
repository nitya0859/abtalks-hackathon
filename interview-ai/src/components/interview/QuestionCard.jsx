const QuestionCard = ({
  questionNumber = 1,
  topic = "Interview",
  difficulty = "Medium",
  questionText = "Let's begin the interview.",
}) => {
  return (
    <div className="bg-[#faf8f4]">

      {/* =====================================================
          TOP META BAR
      ===================================================== */}

      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#e2ddd4]">

        {/* Left badges */}

        <div className="flex items-center gap-2">

          <span
            className="
              px-3
              py-1.5
              rounded-full
              bg-[#eeece7]
              border
              border-[#ddd9d1]
              text-[10px]
              sm:text-[11px]
              font-bold
              uppercase
              tracking-wide
              text-[#625e56]
            "
          >
            {topic}
          </span>

          <span
            className="
              px-3
              py-1.5
              rounded-full
              bg-[#eeece7]
              border
              border-[#ddd9d1]
              text-[10px]
              sm:text-[11px]
              font-bold
              uppercase
              tracking-wide
              text-[#625e56]
            "
          >
            {difficulty}
          </span>

        </div>

        {/* Right label */}

        <span
          className="
            hidden
            sm:block
            text-[10px]
            uppercase
            tracking-wide
            font-semibold
            text-[#817b71]
          "
        >
          Main Question
        </span>

      </div>


      {/* =====================================================
          QUESTION CONTENT
      ===================================================== */}

      <div className="px-5 sm:px-6 py-7 sm:py-8">

        {/* Question number */}

        <div className="flex items-center gap-2 mb-4">

          <span
            className="
              text-[10px]
              sm:text-[11px]
              uppercase
              tracking-[0.16em]
              font-bold
              text-[#777066]
            "
          >
            Question {questionNumber}
          </span>

          <span className="text-[#b4aea3]">
            •
          </span>

          <span
            className="
              text-[10px]
              sm:text-[11px]
              font-medium
              text-[#8a8379]
            "
          >
            Core interview
          </span>

        </div>


        {/* Question */}

        <h2
          className="
            text-[22px]
            sm:text-[25px]
            lg:text-[27px]
            font-semibold
            tracking-[-0.025em]
            leading-[1.35]
            text-[#292722]
            max-w-5xl
          "
        >
          {questionText}
        </h2>

      </div>

    </div>
  );
};

export default QuestionCard;