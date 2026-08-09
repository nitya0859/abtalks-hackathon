import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="evoke-brand"
    >
      <div className="evoke-brand-symbol">
        <span />
        <span />
        <span />
      </div>

      <div className="evoke-brand-word">
        EVOKE
      </div>
    </Link>
  );
};

export default Logo;