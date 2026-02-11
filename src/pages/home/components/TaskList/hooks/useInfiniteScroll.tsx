import { useEffect, type RefObject } from "react";

interface useInfiteScrollInterface {
  containerRef: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  loading: boolean;
  onLoadMore: () => void;
};

export const useInfiniteScroll = ({
  containerRef,
  hasNextPage,
  loading,
  onLoadMore,
}: useInfiteScrollInterface) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isNearBottom && hasNextPage && !loading) {
        onLoadMore();
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef, hasNextPage, loading, onLoadMore]);
};
