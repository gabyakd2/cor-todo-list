export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface TasksResponse {
  tasks: Task[];
  hasNextPage: boolean;
}