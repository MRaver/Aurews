export const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, //prevent XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //prevent CSRF acttacks
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, //prevent XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //prevent CSRF acttacks
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
