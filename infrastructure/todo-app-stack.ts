import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { TodoCreateLambda } from "./todo-create-lambda";
import { TodoDynamoDBTable } from "./todo-dynamodb-table";

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

    table.grantReadWriteData(todoCreateLambda.resource);

    const apigw = new apigateway.RestApi(this, "todo-apigw", {
      restApiName: "Todo service",
      deployOptions: {
        stageName: "dev",
      },
    });

    const items = apigw.root.addResource("todo");
    // items.addMethod("GET", createIntegration)
    items.addMethod("POST", createIntegration);
    //
    // const singleItem = items.addResource('{id}')
    // singleItem.addMethod("PUT", createIntegration)
    // singleItem.addMethod("DELETE", createIntegration)
  }
}
