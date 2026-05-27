# Prompt Engineering

## 1. Chain Of Thought Prompting For Planning Before Coding

### Goal

Make the AI plan first instead of jumping directly into implementation.

### Prompt Pattern

```text
Do not write code yet.

First:
1. restate the task
2. identify constraints and assumptions
3. propose a step-by-step implementation plan
4. list risks or unclear areas

After I confirm the plan, then generate code.
```

### Why This Helps

- it separates reasoning from execution
- it exposes missing requirements early
- it reduces the chance of confident but wrong code generation

### Important Note

The goal is not to see hidden reasoning. The goal is to force an explicit planning phase before code output.

## 2. Few-Shot Prompting For JSON Format Or Coding Style

### Goal

Make the AI follow a strict structure by showing examples.

### JSON Example

```text
Return output in exactly this format:

Example 1:
{
  "name": "login",
  "status": "passed",
  "reason": "Valid credentials redirect to dashboard"
}

Example 2:
{
  "name": "empty-password",
  "status": "failed",
  "reason": "Validation message is shown"
}

Now produce 5 more results in the same JSON shape only.
```

### Coding Style Example

```text
Follow this project style:
- use named exports
- keep functions under 30 lines when possible
- validate input at the boundary
- prefer early returns

Example:
export function parseUser(input: unknown): User {
  if (!isUserPayload(input)) {
    throw new Error("Invalid user payload");
  }

  return normalizeUser(input);
}

Write the new function in the same style.
```

### Why This Helps

- examples are stronger than abstract instructions
- the model imitates the demonstrated structure
- it improves consistency for generated code and machine-readable output

## 3. Prompting For Unit Tests With Edge Cases

### Weak Prompt

```text
Write unit tests for this function.
```

This often produces mostly happy-path coverage.

### Better Prompt

```text
Write unit tests for this function.

Requirements:
- cover happy path
- cover edge cases
- cover invalid input
- cover empty values
- cover boundary values
- cover duplicate or conflicting data if relevant
- include one test for unexpected upstream failure or thrown exception

Before writing the tests, list the scenarios you plan to cover.
```

### Even Better If You Want Depth

```text
Generate a test matrix first, then write the tests.
Prioritize cases that are most likely to break in production, not just the obvious success path.
```

### Why This Works

- it changes the optimization target from "some tests" to "risk-based tests"
- it makes the AI think in categories of failure
- it exposes missing validation and defensive coding paths
