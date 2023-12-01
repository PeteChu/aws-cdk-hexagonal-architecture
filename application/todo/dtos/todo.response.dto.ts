import { ResponseBase } from "@app/libs/api/response.base";

export class TodoResponseDto extends ResponseBase {
  text: string;
  status: string
}
