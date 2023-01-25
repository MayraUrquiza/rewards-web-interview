import { FC } from "react";
import { Grid } from "@mui/material";
import { IJob } from "../types/board.types";
import { JobCard } from "./JobCard";

interface IProps {
  jobs: IJob[];
}

export const JobsGrid: FC<IProps> = ({ jobs }) => (
  <Grid container spacing={3}>
    {jobs.map((job) => (
      <Grid key={job.id} item xs={4}>
        <JobCard job={job} />
      </Grid>
    ))}
  </Grid>
);
