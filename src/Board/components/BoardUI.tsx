import { FC, RefObject } from "react";
import { Box, Typography } from "@mui/material";
import { IJob } from "../types/board.types";
import Button from "@mui/material/Button";
import { JobsGrid } from "./JobsGrid";
import { BoardTitle } from "./BoardTitle";

interface IProps {
  jobs: IJob[];
  fetchMoreJobs: () => Promise<void>;
}

export const BoardUI: FC<IProps> = ({ jobs, fetchMoreJobs }) => {
  return (
    <>
      <BoardTitle />
      <Box sx={{ padding: "0px 400px 20px 400px" }}>
        <JobsGrid jobs={jobs} />
      </Box>
      <Button variant="outlined" onClick={fetchMoreJobs}>
        More
      </Button>
    </>
  );
};
