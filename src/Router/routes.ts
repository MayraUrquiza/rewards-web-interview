import { BoardPage } from "../Board/pages/BoardPage";
import { BoardScrollPage } from "../Board/pages/BoardScrollPage";

type JSXComponent = () => JSX.Element;

interface IRoute {
  path: string;
  name: string;
  Component: JSXComponent;
}

export const routes: IRoute[] = [
  {
    path: "/",
    name: "Board with button",
    Component: BoardPage,
  },
  {
    path: "/infinite-scroll",
    name: "Board with infinite scroll",
    Component: BoardScrollPage,
  },
];
