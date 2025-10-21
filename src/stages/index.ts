import { Stage, type StageProps } from "aws-cdk-lib";
import type { Construct } from "constructs";
import { AppResourcesStack } from "../stacks/app-resources.ts";
import { SharedResourcesStack } from "../stacks/shared-resources.ts";

export interface AppStageProps extends StageProps {
    deploySharedResources: boolean;
}

export class AppStage extends Stage {
    constructor(scope: Construct, id: string, props: AppStageProps) {
        super(scope, id, props);

        let sharedResources: SharedResourcesStack | undefined;

        if (props.deploySharedResources) {
            sharedResources = new SharedResourcesStack(this, "shared-resources");
        }

        new AppResourcesStack(this, "app-resources", {
            vpc: sharedResources?.vpc,
        });
    }
}
