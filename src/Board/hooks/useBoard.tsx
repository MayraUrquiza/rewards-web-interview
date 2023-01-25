import { useEffect, useState } from "react";
import { getJobIds, getJobs } from "../services/board.service";
import { IJob } from "../types/board.types";

export const useBoard = (initialJobsQty: number) => {
  const [jobsIds, setJobIds] = useState<number[]>([]);
  const [jobs, setJobs] = useState<IJob[]>([]);

  const fetchJobIds = async () => {
    const data = await getJobIds();
    setJobIds(data);
  };

  const fetchInitialJobs = async () => {
    const data = await getJobs(jobsIds.slice(0, initialJobsQty));
    setJobs(data);
  };

  useEffect(() => {
    fetchJobIds();
  }, []);

  useEffect(() => {
    fetchInitialJobs();
  }, [jobsIds]);

  return {
    jobsIds,
    jobs,
    setJobs,
  };
};
