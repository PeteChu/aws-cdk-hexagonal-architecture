import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

export class TodoCreateLambda extends Construct {

  private _resource: NodejsFunction

  get resource(): NodejsFunction {
    return this._resource
  }

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this._resource = new NodejsFunction(this, 'todo-create-lambda', {
      functionName: "todo-create",
      entry: 'application/todo/create-todo/create-todo.ts',
      runtime: Runtime.NODEJS_18_X
    });
  }
}
