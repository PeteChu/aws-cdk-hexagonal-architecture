import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { TodoAppStack } from '../infrastructure/todo-app-stack';

let app: cdk.App, stack: cdk.Stack, template: Template

beforeAll(() => {
  app = new cdk.App();
  stack = new TodoAppStack(app, 'MyTestStack');
  template = Template.fromStack(stack);
})

describe('lambda create-todo stack', () => {
  it('lambda function create-todo shoud be present', () => {
    template.hasResourceProperties('AWS::Lambda::Function', Match.objectLike({
      FunctionName: 'todo-create',
      Runtime: 'nodejs18.x'
    }));
  });
})

