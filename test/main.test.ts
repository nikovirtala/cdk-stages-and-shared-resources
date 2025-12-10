import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { expect, it } from "vitest";
import { AppStage } from "../src/stages/index.ts";

it("should match snapshot", () => {
    const app = new App();
    const stage = new AppStage(app, "test", {
        deploySharedResources: false,
    });

    // Get all stacks from the stage
    const stacks = stage.node.children.filter((child) => Stack.isStack(child)) as Stack[];
    expect(stacks.length).toBeGreaterThan(0);

    const stack = stacks[0];
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
});
