import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import type { LoginInfo } from "../../slices/loginSlice";
import type { RootState } from "../../store";

function BasicMenu() {
  const loginState: LoginInfo = useSelector(
    (state: RootState) => state.loginSlice,
  );

  return (
    <nav id="navbar" className=" flex bg-blue-300">
      <div className="w-4/5 bg-gray-500">
        <ul className="flex p-4 text-white font-bold">
          <li className="pr-6 text-2xl">
            <NavLink to="/">Main</NavLink>
          </li>
          <li className="pr-6 text-2xl">
            <NavLink to="/about">About</NavLink>
          </li>

          {loginState.email && ( //로그인한 사용자만 출력되는 메뉴
            <>
              <li className="pr-6 text-2xl">
                <NavLink to="/todo/">Todo</NavLink>
              </li>

              <li className="pr-6 text-2xl">
                <NavLink to="/products/">Products</NavLink>
              </li>
            </>
          )}
          
        </ul>
      </div>
    </nav>
  );
}

export default BasicMenu;
