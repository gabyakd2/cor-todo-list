import { useRef } from "react";
import { useTasksList } from "../../../../hooks/useTasksList";

import { CardTask } from "../CardTask/CardTask";
import { Spinner } from "../../../../shared/components/spinner/Spinner";
import { ErrorMessage } from "../../../../shared/components/error-message/ErrorMessage";

import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

export function TaskList() {
  const {
    tasksList,
    loadMoreTasks,
    loadingMoreTasks,
    hasNextPage,
    loadingInitial,
    error,
    markTask
  } = useTasksList();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    containerRef,
    hasNextPage,
    loading: loadingInitial || loadingMoreTasks,
    onLoadMore: loadMoreTasks,
  });

  return (
    <div ref={containerRef} style={{ height: "80vh", overflow: "auto" }}>
      {tasksList.map(({ id, text, completed }) => (
        <CardTask key={id} id={id} text={text} completed={completed} onMarkTask={markTask} />
      ))}

      {loadingInitial && <Spinner />}
      {error && <ErrorMessage />}
      {loadingMoreTasks && <Spinner />}
    </div>
  );
}
