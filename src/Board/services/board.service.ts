import { AxiosResponse } from "axios";
import { instance } from "../../utils/axios";
import { IJob } from "../types/board.types";

export const getJobIds = async (): Promise<number[]> => {
  try {
    const response = await instance.get("/jobstories.json");
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};

const getTitleAndDescription = (text: string) => {
  try {
    const [title, rest] = text.split("(");
    const [_, description] = rest.split(")");

    return { title, description };
  } catch (error) {
    return { title: text, description: "" };
  }
};

export const getJobs = async (ids: number[]): Promise<IJob[]> => {
  try {
    const response = await Promise.all(
      ids.map((id) => instance.get(`/item/${id}.json`))
    );

    return response.map((job: AxiosResponse<IJob>) => {
      const { title: jobTitle, url, id } = job.data;

      const { title, description } = getTitleAndDescription(jobTitle);

      return {
        ...job.data,
        title,
        description,
        url: url || `https://news.ycombinator.com/item?id=${id}`,
      };
    });
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};
