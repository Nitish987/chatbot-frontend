export const authRoute = Object.freeze({
  main: 'auth',
  childRoute: {
    login: 'login',
    signup: 'signup',
    recovery: 'recovery',
  },
});

export const consoleRoute = Object.freeze({
  main: 'console',
  childRoute: {
    dashboard: 'dashboard',
    createProject: 'create-project',
    project: {
        main: 'project/:id',
        childRoute: {
            dashboard: 'dashboard',
            apis: 'apis',
            settings: 'settings'
        }
    },
    billing: 'billing',
    settings: 'settings',
  },
});
