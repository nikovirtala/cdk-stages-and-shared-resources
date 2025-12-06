# Project Structure

## Directory Layout

```
.
├── src/                    # Source code
│   ├── main.ts            # CDK app entry point
│   ├── stages/            # CDK Stage definitions
│   └── stacks/            # CDK Stack definitions
├── test/                  # Test files
│   └── __snapshots__/     # Vitest snapshot files
├── lib/                   # Compiled TypeScript output (generated)
├── cdk.out/              # CDK synthesized CloudFormation (generated)
├── coverage/             # Test coverage reports (generated)
└── .projen/              # Projen metadata (generated)
```

## Architecture Patterns

### Entry Point (`src/main.ts`)

- Reads `STAGE` environment variable to determine deployment stage
- Creates appropriate `AppStage` instance based on stage name
- Handles stage-specific account/region configuration
- Supports: `test`, `prod`, and dynamic `dev*` stages

### Stages (`src/stages/`)

- **AppStage**: Top-level CDK Stage that orchestrates stack deployment
- Accepts `deploySharedResources` boolean to control shared resource creation
- Conditionally creates `SharedResourcesStack` when needed
- Always creates `AppResourcesStack`, passing shared VPC if available

### Stacks (`src/stacks/`)

- **SharedResourcesStack**: Contains resources shared across the application (e.g., VPC)
- **AppResourcesStack**: Contains application-specific resources (e.g., Lambda functions)
  - Accepts optional `vpc` prop to use shared VPC
  - Creates its own VPC if none provided

## Naming Conventions

- Stack files: kebab-case (e.g., `app-resources.ts`)
- Class names: PascalCase (e.g., `AppResourcesStack`)
- Props interfaces: `{ClassName}Props` pattern
- File extensions: Always use `.ts` in imports (ES modules)

## Resource Sharing Pattern

Resources are shared between stacks by:
1. Exporting public readonly properties from the source stack
2. Passing them as props to dependent stacks
3. Using optional props with fallback creation for flexibility

Example: VPC can be shared from `SharedResourcesStack` or created per-stack.
