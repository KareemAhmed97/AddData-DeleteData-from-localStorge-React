import { useNavigate } from 'react-router-dom'


export default function Header() {
    const navigate = useNavigate()
  return (
    <header className="p-3    " style={{backgroundColor:"#ffe9a6"}}>
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a className="nav-link px-2 link-secondary " onClick={()=>navigate("/")} style={{cursor:"pointer"}}>
              Home
            </a>
          </li>
          <li>
            <a  className="nav-link px-2 link-dark " onClick={()=>navigate("/products")} style={{cursor:"pointer"}}>
              Products
            </a>
          </li>
        </ul>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        <div className="dropdown text-end">
          <a
            href="#"
            className="d-block link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width="32"
              height="32"
              className="rounded-circle"
            />
          </a>
          <ul
            className="dropdown-menu text-small"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
            <a className="dropdown-item" href="#">
              Log Out
            </a>
          </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  )
}
