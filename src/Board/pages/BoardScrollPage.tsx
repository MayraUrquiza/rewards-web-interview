import InfiniteScroll from "../../InfiniteScroll/components/InfiniteScroll";
import { getJobs } from "../services/board.service";
import { BoardScrollUI } from "../components/BoardScrollUI";
import { useBoard } from "../hooks/useBoard";
import { Typography } from "@mui/material";
import { INITIAL_JOBS_QTY, MORE_JOBS_QTY } from "../utils/constants";

export const BoardScrollPage = () => {
  const { jobsIds, jobs } = useBoard(INITIAL_JOBS_QTY);

  const fetchMoreJobs = async (page: number) => {
    return await getJobs(
      jobsIds.slice(
        INITIAL_JOBS_QTY * page,
        INITIAL_JOBS_QTY * page + MORE_JOBS_QTY
      )
    );
  };

  if (!jobsIds.length || !jobs.length)
    return <Typography>Loading...</Typography>;

  return (
    <InfiniteScroll
      data={jobs}
      total={jobsIds.length}
      fetchData={fetchMoreJobs}
      Component={BoardScrollUI}
    />
  );
};
