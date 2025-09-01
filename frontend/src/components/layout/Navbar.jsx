import { Link, NavLink} from "react-router-dom";

export default function Navbar() {
    const active = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

    return (
    <nav className="navbar navbar-expand navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">CampusTrade</Link>
        <div className="navbar-nav">
          <NavLink className={active} to="/produtos">Produtos</NavLink>
        </div>
      </div>
    </nav>
    );
}