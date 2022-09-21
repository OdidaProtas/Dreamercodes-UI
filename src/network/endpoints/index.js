const BASE_URLS = {
  auth: import.meta.env.VITE_AUTH_SERVICE__BASE_URL,
  onboarding: import.meta.env.VITE_ONBOARDING_SERVICE__BASE_URL,
  compiler: import.meta.env.VITE_COMPILE_SERVICE__BASE_URL,
  courses: import.meta.env.VITE_COURSES_SERVICE__BASE_URL,
};

const AUTH_URLS = {
  reg: "/signup",
  login: "/generate-token",
  verifyEmail: "/verify",
  requestReset: "/request-reset",
  resetPassword: "/reset-password",
  resendCode: "/resend-code",
};

const ONBOARDING_URLS = {
  userProfile: "/onboarding-profiles-by-user",
  profiles: "/onboarding-profiles",
};

const COURSES_URLS = {
  courses: "/courses",
  subjects:"/subjects"
};

const COMPILER_URLS = {
  exec: "/exec",
};

export default {
  BASE_URLS,
  AUTH_URLS,
  ONBOARDING_URLS,
  COURSES_URLS,
  COMPILER_URLS,
};
