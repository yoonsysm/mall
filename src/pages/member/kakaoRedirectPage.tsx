import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";

const KakaoRedirectPage = () => {

  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  useEffect(() => {
    if (authCode) {
      getAccessToken(authCode).then((accessToken) => {
        
        console.log("access Token------------------");
        console.log(accessToken);

        if (accessToken) {
          getMemberWithAccessToken(accessToken).then((memberInfo) => {
            console.log("memberInfo-------------------");
            console.log(memberInfo);
          });
        }
      });
    }
  }, [authCode]);

  return (
    <div>
       <div>Kakao Login Redirect</div> <div>{authCode}</div>
    </div>
  );
};
export default KakaoRedirectPage;
