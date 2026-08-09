import { Button } from "@/components/ui/button";

const Button31 = ({
  children = "Get Started",
  onClick,
  className = "",
}) => {
  return (
    <Button
      onClick={onClick}
      className={`
        group
        relative
        overflow-hidden
        h-12
        px-7
        rounded-full
        border
        border-black/10
        bg-[#171717]
        text-white
        text-sm
        font-medium
        tracking-wide
        shadow-[0_12px_30px_rgba(0,0,0,0.12)]
        transition-all
        duration-500
        hover:bg-[#252525]
        hover:-translate-y-0.5
        hover:shadow-[0_16px_35px_rgba(0,0,0,0.16)]
        active:translate-y-0
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}

        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>

      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />
    </Button>
  );
};

export default Button31;