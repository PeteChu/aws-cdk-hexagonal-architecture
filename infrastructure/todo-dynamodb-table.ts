import { Construct } from "constructs";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import { RemovalPolicy } from "aws-cdk-lib";

export class TodoDynamoDBTable extends Construct {

  private _resource: dynamodb.TableV2

  get resource(): dynamodb.TableV2 {
    return this._resource
  }

  constructor(scope: Construct, id: string, public readonly tableName: string) {
    super(scope, id)

    this._resource = this.initDynamoDBTable()
  }


  private initDynamoDBTable() {

    const ddb = new dynamodb.TableV2(this, 'todo-table', {
      tableName: this.tableName,
      partitionKey: {
        name: "PK",
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: "SK",
        type: dynamodb.AttributeType.STRING
      },
      billing: dynamodb.Billing.onDemand(),
      removalPolicy: RemovalPolicy.DESTROY
    })

    return ddb
  }

}
