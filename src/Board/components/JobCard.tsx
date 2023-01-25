import { FC } from "react";
import { Card, CardHeader, Typography } from "@mui/material";
import { IJob } from "../types/board.types";

interface IProps {
  job: IJob;
}

export const JobCard: FC<IProps> = ({ job }) => {
  const { title, description, time, url } = job;

  return (
    <a
      href={url}
      target="_blank"
    >
      <Card sx={{ height: "100%" }}>
        <CardHeader
          title={title}
          subheader={<Typography variant="h6">{description}</Typography>}
        />
        <Typography>
          {new Date(time * 1000).toLocaleDateString("ES-es")}
        </Typography>
      </Card>
    </a>
  );
};
