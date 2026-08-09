import { useNavigate } from "react-router-dom";
import Button31 from "../components/ui/button-31";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f1eb] text-[#171717]">

      {/* =====================================================
          SOFT ABSTRACT BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Large soft light */}
        <div
          className="
            absolute
            -top-[20%]
            left-[15%]
            w-[55vw]
            h-[55vw]
            rounded-full
            bg-[#fffaf0]/60
            blur-[100px]
            animate-evoke-drift
          "
        />

        {/* Warm glow */}
        <div
          className="
            absolute
            top-[25%]
            -right-[15%]
            w-[45vw]
            h-[45vw]
            rounded-full
            bg-[#ddd0bb]/80
            blur-[110px]
            animate-evoke-drift-slow
          "
        />

        {/* Bottom glow */}
        <div
          className="
            absolute
            -bottom-[30%]
            left-[20%]
            w-[60vw]
            h-[45vw]
            rounded-full
            bg-[#e7dccb]/70
            blur-[120px]
          "
        />

        {/* Flowing lines */}
        <div className="absolute inset-0 opacity-60">

          <div className="evoke-wave evoke-wave-one" />

          <div className="evoke-wave evoke-wave-two" />

          <div className="evoke-wave evoke-wave-three" />

        </div>

      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          px-6
          sm:px-10
          lg:px-14
          py-7
          animate-evoke-fade
        "
      >

        {/* Brand */}

        <div className="flex items-center gap-2">

          <div
            className="
              w-2.5
              h-2.5
              rounded-full
              bg-[#171717]
            "
          />

          <span
            className="
              text-sm
              font-semibold
              tracking-[0.18em]
            "
          >
            EVOKE
          </span>

        </div>

        {/* Small label */}

        <span
          className="
            hidden
            sm:block
            text-[10px]
            uppercase
            tracking-[0.22em]
            text-black/40
          "
        >
          AI Interview Preparation
        </span>

      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          z-10
          min-h-[calc(100vh-92px)]
          flex
          items-center
          justify-center
          px-6
          pb-20
        "
      >

        <div
          className="
            w-full
            max-w-5xl
            mx-auto
            text-center
          "
        >

          {/* Eyebrow */}

          <div
            className="
              mb-8
              flex
              justify-center
              animate-evoke-fade-up
              [animation-delay:100ms]
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-black/10
                bg-white/45
                backdrop-blur-md
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[0.18em]
                text-black/55
              "
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black/50" />

              Prepare. Practice. Evolve.
            </div>

          </div>

          {/* Main heading */}

          <h1
            className="
              animate-evoke-title
              font-semibold
              tracking-[-0.075em]
              leading-[0.88]
              text-[clamp(4.5rem,15vw,12rem)]
              text-[#151515]
              select-none
            "
          >
            EVOKE
          </h1>

          {/* Tagline */}

          <div
            className="
              mt-8
              animate-evoke-fade-up
              [animation-delay:450ms]
            "
          >

            <p
              className="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-light
                tracking-[-0.025em]
                text-black/65
              "
            >
              Bring out your best self.
            </p>

            <p
              className="
                max-w-lg
                mx-auto
                mt-4
                text-sm
                sm:text-base
                leading-relaxed
                text-black/40
              "
            >
              An AI-powered interview experience that
              helps you think sharper, communicate better,
              and become the candidate they remember.
            </p>

          </div>

          {/* CTA */}

          <div
            className="
              mt-10
              flex
              justify-center
              animate-evoke-fade-up
              [animation-delay:650ms]
            "
          >
            <Button31
              onClick={() => navigate("/setup")}
            >
              Get Started
            </Button31>
          </div>

          {/* Bottom hint */}

          <div
            className="
              mt-16
              flex
              items-center
              justify-center
              gap-3
              animate-evoke-fade
              [animation-delay:1000ms]
            "
          >

            <div className="w-8 h-px bg-black/15" />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-black/30
              "
            >
              Your next interview starts here
            </span>

            <div className="w-8 h-px bg-black/15" />

          </div>

        </div>

      </section>

    </main>
  );
};

export default Landing;