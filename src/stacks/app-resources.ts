import { aws_ec2, aws_lambda, Stack, type StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";

export interface AppResourcesStackProps extends StackProps {
    /**
     * VPC to be used in this deployment
     *
     * @default - create new VPC
     */
    vpc?: aws_ec2.IVpc;
}

export class AppResourcesStack extends Stack {
    public readonly vpc: aws_ec2.IVpc;

    constructor(scope: Construct, id: string, props?: AppResourcesStackProps) {
        super(scope, id, props);

        this.vpc = props?.vpc
            ? props.vpc
            : new aws_ec2.Vpc(this, "vpc", {
                  maxAzs: 2,
              });

        new aws_lambda.Function(this, "function", {
            runtime: aws_lambda.Runtime.NODEJS_22_X,
            code: aws_lambda.Code.fromInline(`export const handler = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello, World!" }),
    };
};
`),
            handler: "index.handler",
            vpc: this.vpc,
        });
    }
}
