import { useCallback, useEffect, useRef, useState } from "react";

import type {
  Task,
  TasksResponse,
} from "../shared/interfaces/task/task.interface";

import mockApi from "../api/mockApi";

export const useTasksList = () => {
  const INITIAL_PAGE = 1;

  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [page, setPage] = useState<number>(INITIAL_PAGE);

  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [loadingMoreTasks, setLoadingMoreTasks] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchingRef = useRef(false);

  const getListTasks = useCallback(async () => {
    try {
      setLoadingInitial(true);

      const response = (await mockApi.fetchTasks({
        page: INITIAL_PAGE,
      })) as TasksResponse;
      setTasksList(response.tasks);
      setHasNextPage(response.hasNextPage);
      setPage(2);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoadingInitial(false);
    }
  }, []);

  const loadMoreTasks = useCallback(async () => {
    if (fetchingRef.current || !hasNextPage) return;

    fetchingRef.current = true;

    try {
      setLoadingMoreTasks(true);

      const response = (await mockApi.fetchTasks({ page })) as TasksResponse;
      setTasksList((prev) => [...prev, ...response.tasks]);
      setHasNextPage(response.hasNextPage);
      setPage((prev) => prev + 1);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoadingMoreTasks(false);
      fetchingRef.current = false;
    }
  }, [hasNextPage, page]);

  const markTask = useCallback((id: string) => {
    setTasksList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  useEffect(() => {
    getListTasks();
  }, [getListTasks]);

  return {
    tasksList,
    loadingInitial,
    loadingMoreTasks,
    error,
    hasNextPage,
    loadMoreTasks,
    markTask
  };
};
