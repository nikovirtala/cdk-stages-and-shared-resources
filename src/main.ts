import { App } from "aws-cdk-lib";
import { AppStage } from "./stages/index.ts";

const stage = process.env.STAGE;

const testAccount = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};

const prodAccount = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

// If STAGE is not set, synthesize all stages (useful for build/CI)
if (!stage) {
    new AppStage(app, "test", {
        env: testAccount,
        deploySharedResources: false,
    });
    new AppStage(app, "prod", {
        env: prodAccount,
        deploySharedResources: true,
    });
    new AppStage(app, "dev1", {
        env: testAccount,
        deploySharedResources: false,
    });
} else {
    // If STAGE is set, synthesize only that specific stage
    switch (stage) {
        case "test":
            new AppStage(app, "test", {
                env: testAccount,
                deploySharedResources: false,
            });
            break;
        case "prod":
            new AppStage(app, "prod", {
                env: prodAccount,
                deploySharedResources: true,
            });
            break;
        default:
            if (stage.startsWith("dev")) {
                new AppStage(app, stage, {
                    env: testAccount,
                    deploySharedResources: false,
                });
            } else {
                throw new Error(`unknown stage: ${stage}`);
            }
    }
}

app.synth();
