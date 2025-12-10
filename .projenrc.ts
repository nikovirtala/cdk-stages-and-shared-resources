import { AwsCdkTypeScriptAppProject } from "@nikovirtala/projen-constructs";

const project = new AwsCdkTypeScriptAppProject({
    cdkVersion: "2.1.0",
    defaultReleaseBranch: "main",
    devDeps: ["@nikovirtala/projen-constructs"],
    name: "cdk-stages-and-shared-resources",
    projenrcTs: true,

    // deps: [],                /* Runtime dependencies of this module. */
    // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
    // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
