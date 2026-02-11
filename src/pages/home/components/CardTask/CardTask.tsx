import { Button } from "@mui/material";

interface CardTaskInterface {
  id: string;
  text: string;
  completed: boolean;
  onMarkTask: (id: string) => void;
}

export function CardTask({ id, text, completed, onMarkTask }: CardTaskInterface) {
  return (
    <div>
      <p style={{ textDecoration: completed ? "line-through" : "none" }}>
        {text}
      </p>

      <Button variant="contained" onClick={() => onMarkTask(id)}>
        {completed ? "Deshacer" : "Completa"}
      </Button>
    </div>
  );
}
