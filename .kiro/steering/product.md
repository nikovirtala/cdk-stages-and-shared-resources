# Product Overview

This is an AWS CDK application demonstrating a multi-stage deployment architecture with shared and stage-specific resources.

## Key Features

- Multi-stage deployment support (dev, test, prod)
- Conditional deployment of shared resources
- VPC sharing across stacks when shared resources are deployed
- Lambda function deployment within VPC

## Stage Strategy

- **dev stages**: Use test account, no shared resources (each dev stage creates its own VPC)
- **test**: Uses test account, no shared resources
- **prod**: Uses prod account, deploys shared resources (VPC is shared across stacks)

The `STAGE` environment variable controls which stage is deployed.
