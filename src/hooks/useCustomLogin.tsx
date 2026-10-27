import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store";
import { loginPostAsync, logout, save } from "../slices/loginSlice";
import { Navigate, useNavigate } from "react-router";
import { getCookie } from "../util/cookieUtil";
import { useEffect } from "react";

const useCustomLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  //로그인 상태 객체
  const loginState = useSelector((state: RootState) => state.loginSlice);
  //로그인 여부
  const loginStatus = loginState.status; //fulfilled, pending, rejected

  //새로고침 대응
  useEffect(() => {
    if (!loginStatus) {
      const member = getCookie("member");

      console.log("member from cookie ");
      console.log(member);
      
      if (member) {
        dispatch(save(member));
      }
    }
  }, []);

  const navigate = useNavigate();

  const doLogin = async (email: string, pw: string) => {
    dispatch(loginPostAsync({ email, pw }));
  };

  const doLogout = () => {
    dispatch(logout(null));
  };

  const moveToLogin = () => {
    navigate("/member/login");
  };

  const moveToLoginReturn = () => {
    //--------로그인 페이지로 이동 컴포넌트
    return <Navigate replace to="/member/login" />;
  };

  const moveToPath = (path: string) => {
    //----------------페이지 이동
    navigate({ pathname: path }, { replace: true });
  };

  return {
    loginState,
    loginStatus,
    doLogin,
    doLogout,
    moveToLogin,
    moveToLoginReturn,
    moveToPath,
  };
};

export default useCustomLogin;
