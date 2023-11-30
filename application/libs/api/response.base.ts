import { IdResponse } from "./id.response.dto";

export interface BaseResponseProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ResponseBase extends IdResponse {

  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(props: BaseResponseProps) {
    props
    super(props.id)
    this.createdAt = new Date(props.createdAt).toISOString()
    this.updatedAt = new Date(props.updatedAt).toISOString()
  }
}
