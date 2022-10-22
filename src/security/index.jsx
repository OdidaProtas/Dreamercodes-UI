const security = {
  pages: {
    portal() {
      return {
        loginRequired: true,
        roles: ["ADMIN", "STUDENT"],
      };
    },
    profile() {
      return {
        loginRequired: true,
        ownsResource: () => {},
        roles: ["*"],
      };
    },
    mentor() {
      return {
        loginRequired: true,
        roles: ["ADMIN", "STAFF"],
      };
    },
    dashboard() {
      return {
        loginRequired: true,
        roles: ["ADMIN", "ORGANIZATION_OWNER"],
      };
    },
    rooms() {
      return {
        loginRequired: true,
        roles: ["*"],
      };
    },
  },
};

export default security;
