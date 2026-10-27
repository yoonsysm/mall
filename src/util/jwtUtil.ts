import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { getCookie } from "./cookieUtil";

const jwtAxios = axios.create();

//before request
//요청 보내기 전에 추가 작업
const beforeReq = (config: InternalAxiosRequestConfig) => {

  console.log("before request.............");

  const memberInfo = getCookie("member");

  if (!memberInfo) {
    console.log("Member Not Found");
    return Promise.reject(new Error("REQUIRE_LOGIN"));
  }

  const { accessToken } = memberInfo; 
  
  // Authorization 헤더 처리
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

//fail request
const requestFail = (err: AxiosError) => {
  console.log("request error............");

  return Promise.reject(err);
};

//before return response
//성공적인 응답이 왔을 때 추가 작업
const beforeRes = async (res: AxiosResponse): Promise<AxiosResponse> => {
  console.log("before return response...........");

  console.log(res);

  return res;
};

//fail response
const responseFail = async (err: AxiosError) => {
  console.log("response fail error.............");
  console.log(err);

  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);

jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
