import { Link } from "react-router-dom";

const Navbar = () => {
  const handleClick = (e) => {
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Properties</h1>
      </Link>
      <div className="links">
        <div>
          <Link to="/properties/add-property">Add Property</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <button onClick={handleClick}>Log out</button>          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;