import { Menu, About, Options, GameScreen } from "../pages";

const routes = [
    {
        path: '/',
        exact: true,
        component: Menu,
    },
    {
        path: '/gamescreen',
        exact: true,
        component: GameScreen,
    },
    {
        path: '/options',
        exact: true,
        component: Options,
    },
    {
        path: '/about',
        exact: true,
        component: About,
    },
];

export default routes;