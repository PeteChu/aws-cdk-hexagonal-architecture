import * as cdk from 'aws-cdk-lib'
import { Template, Capture, Match } from 'aws-cdk-lib/assertions'
import { TodoDynamoDBTable } from '../infrastructure/todo-dynamodb-table'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'


let stack: cdk.Stack, ddbTable: TodoDynamoDBTable, template: Template

beforeAll(() => {
  stack = new cdk.Stack()
  ddbTable = new TodoDynamoDBTable(stack, 'MyDynamoDBTestTable', 'todo-table')
  template = Template.fromStack(stack)
})

describe('dynamodb todo table', () => {
  it('todo table should be present', () => {

    const tableNameCapture = new Capture()

    template.resourceCountIs("AWS::DynamoDB::GlobalTable", 1)
    template.hasResourceProperties("AWS::DynamoDB::GlobalTable", {
      TableName: tableNameCapture
    })

    expect(tableNameCapture.asString()).toEqual('todo-table')
  })

  it('billing mode should be on demand', () => {
    template.hasResourceProperties("AWS::DynamoDB::GlobalTable", Match.objectLike({
      BillingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    }))
  })

})
