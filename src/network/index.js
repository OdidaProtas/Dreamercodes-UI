import { compilerAxiosInstance } from "./compiler";
import { coursesAxiosInstance } from "./courses";
import { onboardingAxiosInstance } from "./onboarding";
import { authAxiosInstance } from "./auth";

import endpoints from "./endpoints";

const axiosInstances = {
  auth: authAxiosInstance,
  onboarding: onboardingAxiosInstance,
  courses: coursesAxiosInstance,
  compiler: compilerAxiosInstance,
};

export default {
  axiosInstances,
  endpoints,
};
