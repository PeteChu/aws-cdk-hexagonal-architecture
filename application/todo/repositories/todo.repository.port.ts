import { RepositoryPort } from "@app/libs/db/repository.port";
import { TodoEntity } from "../create-todo/entities/todo.entity";

export interface TodoRepositoryPort extends RepositoryPort<TodoEntity> { }
