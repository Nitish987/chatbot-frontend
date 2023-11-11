export const authRoute = Object.freeze({
    main: 'auth',
    login: 'login',
    signup: 'signup',
    recovery: 'recovery'
});

export const consoleRoute = Object.freeze({
    main: 'console',
    childRoute: {
        dashboard: 'dashboard',
        createProject: 'create-project',
        project: 'project/:id',
        billing: 'billing',
        settings: 'settings'
    }
});