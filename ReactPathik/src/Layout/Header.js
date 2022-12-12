import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useNavigate();

  //logout
  const Logout = () => {
    localStorage.clear();
    location("/");
  };

  return (
    <>
      <nav class="navbar justify-c+ontent-between">
        <NavLink to="/" class="navbar-brand">
          <h6>Photo Sharing Website</h6>
        </NavLink>
        <div>
          {localStorage.getItem("stdname") ? (
            <>
              <div className="d-flex">
                <NavLink to="/dashboard">
                  <p className="mt-1 mr-3">
                    <i class="far fa-user"></i>&nbsp;&nbsp;
                    {localStorage.getItem("stdname")}
                  </p>
                </NavLink>
                <button
                  class="btn-login my-2 my-sm-0"
                  type="button"
                  onClick={() => Logout()}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/">
                <button class="btn-login my-2 my-sm-0" type="button">
                  Login
                </button>
              </NavLink>
              <NavLink to="/sign-up">
                <button class="btn-login ml-3 my-2 my-sm-0" type="button">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
