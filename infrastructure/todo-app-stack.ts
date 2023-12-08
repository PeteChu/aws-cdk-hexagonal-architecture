import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { TodoCreateLambda } from "./todo-create-lambda";
import { TodoDynamoDBTable } from "./todo-dynamodb-table";
import { TodoGetLambda } from "./todo-get-lambda";

export class TodoAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new TodoDynamoDBTable(
      this,
      "todo-table",
      process.env.DYNAMODB_TABLE_NAME ?? "todo",
    ).resource;

    const todoCreateLambda = new TodoCreateLambda(this, "todo-create");
    const createIntegration = new apigateway.LambdaIntegration(
      todoCreateLambda.resource,
    );

    const todoGetLambda = new TodoGetLambda(this, "todo-get");
    const getIntegration = new apigateway.LambdaIntegration(
      todoGetLambda.resource,
    );

    table.grantReadWriteData(todoCreateLambda.resource);
    table.grantReadWriteData(todoGetLambda.resource);

    const apigw = new apigateway.RestApi(this, "todo-apigw", {
      restApiName: "Todo service",
      deployOptions: {
        stageName: "dev",
      },
      endpointTypes: [apigateway.EndpointType.REGIONAL],
    });

    const items = apigw.root.addResource("todo");
    items.addMethod("GET", getIntegration);
    items.addMethod("POST", createIntegration);

    // const singleItem = items.addResource('{id}')
    // singleItem.addMethod("PUT", createIntegration)
    // singleItem.addMethod("DELETE", createIntegration)
  }
}
