import { Typography } from "@mui/material";
import { useState } from "react";
import { BoardUI } from "../components/BoardUI";
import { useBoard } from "../hooks/useBoard";
import { getJobs } from "../services/board.service";
import { INITIAL_JOBS_QTY, MORE_JOBS_QTY } from "../utils/constants";

export const BoardPage = () => {
  const [last, setLast] = useState<number>(INITIAL_JOBS_QTY);

  const { jobsIds, jobs, setJobs } = useBoard(INITIAL_JOBS_QTY);

  const fetchMoreJobs = async () => {
    const data = await getJobs(jobsIds.slice(last, last + MORE_JOBS_QTY));
    setJobs((oldJobs) => oldJobs.concat(data));
    setLast((oldLast) => oldLast + MORE_JOBS_QTY);
  };

  if (!jobsIds.length || !jobs.length)
    return <Typography>Loading...</Typography>;

  return <BoardUI jobs={jobs} fetchMoreJobs={fetchMoreJobs} />;
};
