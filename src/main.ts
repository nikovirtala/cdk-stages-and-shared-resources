import assert from "node:assert";
import { App } from "aws-cdk-lib";
import { AppStage } from "./stages/index.ts";

const stage = process.env.STAGE;
assert.ok(stage, "STAGE environment variable must be set to a value");

const testAccount = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};

const prodAccount = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

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

app.synth();
