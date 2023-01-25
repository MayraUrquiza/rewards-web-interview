import { Box } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";

interface IProps<T> {
  data: T[];
  total: number;
  fetchData: (page: number) => Promise<T[]>;
  Component: FC<{ items: T[] }>;
}

const InfiniteScroll = <T,>({
  data,
  total,
  fetchData,
  Component,
}: IProps<T>): JSX.Element => {
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [items, setItems] = useState<T[]>(data);

  const containerRef = useRef<HTMLElement>(null);

  const onScroll = () => {
    if (!containerRef?.current || !hasMore) return;

    const scrollTop = containerRef.current.scrollTop;
    const scrollHeight = containerRef.current.scrollHeight;
    const clientHeight = containerRef.current.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((oldPage) => oldPage + 1);
    }
  };

  const fetchMore = async () => {
    if (items.length === total) {
      setHasMore(false);
      return;
    }

    const newData = await fetchData(page);
    setItems((oldItems) => [...oldItems, ...newData]);
  };

  useEffect(() => {
    if (page < 1) return;
    fetchMore();
  }, [page]);

  useEffect(() => {
    if (!containerRef?.current) return;

    containerRef.current.addEventListener("scroll", onScroll);

    return () => {
      if (!containerRef?.current) return;
      containerRef.current.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!items.length) {
      setItems(data);
    }
  }, [data]);

  return (
    <Box
      style={{
        padding: "0px 400px 20px 400px",
        height: 550,
        overflowY: "scroll",
      }}
      ref={containerRef}
    >
      <Component items={items} />
    </Box>
  );
};

export default InfiniteScroll;
