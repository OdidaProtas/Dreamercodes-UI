import { compilerAxiosInstance } from "./compiler";
import { coursesAxiosInstance } from "./courses";
import { onboardingAxiosInstance } from "./onboarding";
import { authAxiosInstance } from "./auth";

import endpoints from "./endpoints";
import { rtAxiosInstance } from "./rt";

const axiosInstances = {
  auth: authAxiosInstance,
  onboarding: onboardingAxiosInstance,
  courses: coursesAxiosInstance,
  compiler: compilerAxiosInstance,
  rt: rtAxiosInstance,
};

export default {
  axiosInstances,
  endpoints,
};
