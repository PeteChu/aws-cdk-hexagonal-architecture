import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import { TodoCreateLambda } from './todo-create-lambda';
import { TodoDynamoDBTable } from './todo-dynamodb-table';

export class TodoAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const table = new TodoDynamoDBTable(this, 'todo-table', 'todo-table').resource

    const todoCreateLambda = new TodoCreateLambda(this, 'todo-create',)
    const createIntegration = new apigateway.LambdaIntegration(todoCreateLambda.resource)

    table.grantReadWriteData(todoCreateLambda.resource)

    const apigw = new apigateway.RestApi(this, 'todo-apigw', {
      restApiName: 'Todo service'
    })

    const items = apigw.root.addResource("todo")
    // items.addMethod("GET", createIntegration)
    items.addMethod("POST", createIntegration)
    //
    // const singleItem = items.addResource('{id}')
    // singleItem.addMethod("PUT", createIntegration)
    // singleItem.addMethod("DELETE", createIntegration)

  }
}
