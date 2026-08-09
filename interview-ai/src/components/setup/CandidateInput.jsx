const CandidateInput = ({
  value,
  onChange,

  educationLevel = "",
  onEducationLevelChange,

  degree = "",
  onDegreeChange,

  fieldOfStudy = "",
  onFieldOfStudyChange,

  institution = "",
  onInstitutionChange,

  graduationYear = "",
  onGraduationYearChange,
}) => {
  return (
    <div className="evoke-candidate-form">

      {/* Name */}
      <div className="evoke-field">
        <label>
          Candidate Name
        </label>

        <div className="evoke-input-wrap">
          <span className="evoke-input-mark">
            01
          </span>

          <input
            type="text"
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
            placeholder="Your full name"
          />
        </div>
      </div>

      {/* Education */}
      <div className="evoke-field">
        <label>
          Education
        </label>

        <div className="evoke-input-grid">

          <select
            value={educationLevel}
            onChange={(e) =>
              onEducationLevelChange(
                e.target.value
              )
            }
          >
            <option value="">
              Education level
            </option>
            <option value="High School">
              High School
            </option>
            <option value="Diploma">
              Diploma
            </option>
            <option value="Undergraduate">
              Undergraduate
            </option>
            <option value="Postgraduate">
              Postgraduate
            </option>
            <option value="PhD">
              PhD
            </option>
            <option value="Other">
              Other
            </option>
          </select>

          <select
            value={degree}
            onChange={(e) =>
              onDegreeChange(
                e.target.value
              )
            }
          >
            <option value="">
              Degree / Program
            </option>
            <option value="B.Tech">
              B.Tech
            </option>
            <option value="B.E.">
              B.E.
            </option>
            <option value="BCA">
              BCA
            </option>
            <option value="B.Sc">
              B.Sc
            </option>
            <option value="MCA">
              MCA
            </option>
            <option value="M.Tech">
              M.Tech
            </option>
            <option value="M.E.">
              M.E.
            </option>
            <option value="M.Sc">
              M.Sc
            </option>
            <option value="MBA">
              MBA
            </option>
            <option value="Other">
              Other
            </option>
          </select>
        </div>
      </div>

      {/* Field */}
      <div className="evoke-field">
        <label>
          Field of Study
        </label>

        <select
          value={fieldOfStudy}
          onChange={(e) =>
            onFieldOfStudyChange(
              e.target.value
            )
          }
        >
          <option value="">
            Select your field
          </option>

          <option value="Computer Science">
            Computer Science
          </option>

          <option value="Information Technology">
            Information Technology
          </option>

          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>

          <option value="Data Science">
            Data Science
          </option>

          <option value="Electronics & Communication">
            Electronics & Communication
          </option>

          <option value="Electrical Engineering">
            Electrical Engineering
          </option>

          <option value="Mechanical Engineering">
            Mechanical Engineering
          </option>

          <option value="Civil Engineering">
            Civil Engineering
          </option>

          <option value="Other">
            Other
          </option>
        </select>
      </div>

      {/* Institution */}
      <div className="evoke-field">
        <label>
          Institution
        </label>

        <input
          type="text"
          value={institution}
          onChange={(e) =>
            onInstitutionChange(
              e.target.value
            )
          }
          placeholder="College / University"
        />
      </div>

      {/* Graduation */}
      <div className="evoke-field">
        <label>
          Graduation Year
        </label>

        <select
          value={graduationYear}
          onChange={(e) =>
            onGraduationYearChange(
              e.target.value
            )
          }
        >
          <option value="">
            Select year
          </option>

          <option value="2026">
            2026
          </option>

          <option value="2027">
            2027
          </option>

          <option value="2028">
            2028
          </option>

          <option value="2029">
            2029
          </option>

          <option value="2030">
            2030
          </option>

          <option value="Other">
            Other
          </option>
        </select>
      </div>
    </div>
  );
};

export default CandidateInput;