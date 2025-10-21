import { aws_ec2, Stack, type StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";

export class SharedResourcesStack extends Stack {
    public readonly vpc: aws_ec2.IVpc;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.vpc = new aws_ec2.Vpc(this, "vpc", {
            maxAzs: 2,
        });
    }
}
