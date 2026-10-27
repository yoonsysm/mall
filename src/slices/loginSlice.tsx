import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUtil";

//API 서버의 결과를 받도록 변경
export interface LoginInfo {
  email: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
  roleNames: string[];
  status: string;
}

const initState: LoginInfo = {
  email: "",
  nickname: "",
  accessToken: "",
  refreshToken: "",
  roleNames: [],
  status: "",
};

export const loginPostAsync = createAsyncThunk(
  "loginPostAsync",
  ({ email, pw }: { email: string; pw: string }) => {
    console.log("---------------loginPostAsync---------------------");
    console.log(email, pw);
    return loginPost(email, pw);
  },
);

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: initState,
  reducers: {
    //쿠키에서 로딩한 데이터를 반영
    save: (state, action) => {
      console.log("save........................");
      return action.payload;
    },
    //login은 사용하지 않음
    logout: (state, action) => {
      console.log("logout.................................");
      removeCookie("member");

      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        const newState = { ...action.payload };

        console.log("payload", action.payload);

        newState.status = "fulfilled";

        setCookie("member", JSON.stringify(newState), 1); //1day

        return newState;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("loginPostAsync.pending");
        state.status = "pending";
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("loginPostAsync.rejected");
        state.status = "rejected";
      });
  },
});

//login은 사용하지 않음 - save추가
export const { save, logout } = loginSlice.actions;

export default loginSlice.reducer;
