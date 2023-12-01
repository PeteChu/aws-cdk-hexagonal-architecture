import { RepositoryPort } from "@app/libs/db/repository.port";
import { TodoModel } from "../domain/todo.model";

export interface TodoRepositoryPort extends RepositoryPort<TodoModel> { }
