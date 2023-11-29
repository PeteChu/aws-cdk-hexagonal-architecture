export enum TodoStatus {
  IN_PROGRESS = 'In-Progress',
  COMPLETED = 'Completed'
}

export class TodoModel {
  id?: string;
  text: string;
  status?: TodoStatus;
  createdAt?: number;
}
