import { FC } from "react";
import { BoardTitle } from "./BoardTitle";
import { JobsGrid } from "./JobsGrid";
import { IJob } from "../types/board.types";

export const BoardScrollUI: FC<{ items: IJob[] }> = ({ items }) => (
  <>
    <BoardTitle />
    <JobsGrid jobs={items} />
  </>
);
