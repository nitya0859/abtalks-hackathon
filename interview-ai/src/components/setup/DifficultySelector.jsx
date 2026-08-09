const difficulties = [
  {
    id: "Easy",
    label: "Easy",
    desc: "Foundational concepts & core syntax",
    number: "01",
  },
  {
    id: "Medium",
    label: "Medium",
    desc: "Practical application & architecture",
    number: "02",
  },
  {
    id: "Hard",
    label: "Hard",
    desc: "Deep internals, edge cases & scale",
    number: "03",
  },
  {
    id: "Adaptive",
    label: "Adaptive",
    desc: "Difficulty changes with your performance",
    number: "04",
  },
];

const DifficultySelector = ({
  selected,
  onSelect,
}) => {
  return (
    <div className="evoke-difficulty-grid">
      {difficulties.map((level) => {
        const isSelected =
          selected === level.id;

        return (
          <button
            key={level.id}
            type="button"
            onClick={() =>
              onSelect(level.id)
            }
            className={`evoke-difficulty-card ${
              isSelected
                ? "evoke-difficulty-selected"
                : ""
            }`}
          >
            <div className="evoke-difficulty-number">
              {level.number}
            </div>

            <div className="evoke-difficulty-content">
              <strong>
                {level.label}
              </strong>

              <p>
                {level.desc}
              </p>
            </div>

            <span className="evoke-difficulty-dot" />
          </button>
        );
      })}
    </div>
  );
};

export default DifficultySelector;