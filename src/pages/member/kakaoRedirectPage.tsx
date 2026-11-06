import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../store";
import { save } from "../../slices/loginSlice";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (authCode) {
      getAccessToken(authCode).then((accessToken) => {
        console.log("accessToken--------------------------");
        console.log(accessToken);

        if (accessToken) {
          getMemberWithAccessToken(accessToken).then((memberInfo) => {
            console.log("-------------------");
            console.log(memberInfo);

            dispatch(save(memberInfo));

            if (memberInfo.social) {
              navigate("/member/modify");
            }
          });
        }
      });
    }
  }, [authCode]);

  return (
    <>
      <Navigate to={"/"}></Navigate>
    </>
  );
};

export default KakaoRedirectPage;
