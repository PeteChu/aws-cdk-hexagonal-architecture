import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";

export class TodoCreateLambda extends Construct {
  private _resource: NodejsFunction;

  get resource(): NodejsFunction {
    return this._resource;
  }

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this._resource = new NodejsFunction(this, "todo-create-lambda", {
      functionName: "todo-create",
      entry: "application/todo/commands/create-todo/index.ts",
      runtime: Runtime.NODEJS_18_X,
      memorySize: 1024,
      timeout: Duration.seconds(60),
      environment: {
        DYNAMODB_TABLE_NAME: process.env.DYNAMODB_TABLE_NAME ?? "todo",
      },
    });
  }
}
