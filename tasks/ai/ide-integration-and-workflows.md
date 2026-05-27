# IDE Integration And Workflows

## 1. Plan Mode / Composer For A New Endpoint

### Situation

You need:

- a Controller
- a Service with medium-complexity logic
- a DTO
- a database migration

### Demo Flow

1. Open Composer with `Cmd + I`.
2. Switch to Agent or Plan Mode.
3. Paste the requirement from Jira or Confluence.
4. Prompt:

```text
Do not write code yet.
Create a step-by-step implementation plan for this endpoint.
Include controller, service logic, DTO validation, migration, tests, and rollout risks.
Call out assumptions explicitly.
```

5. Review the generated plan.
6. Manually edit one step to reflect the real business rule.
7. Only after that, execute the plan.

### What This Demonstrates

- planning before coding reduces hallucinated logic
- the human can intervene in the Agent workflow
- external requirements can be fed directly into the plan

## 2. Multi-File Refactoring In One Go

### Situation

You are replacing one dependency across 5 files.

### Demo Flow

1. Open Composer instead of single-file chat.
2. Add the exact files to context manually or via `@Files`.
3. Avoid relying on a vague `@Codebase` if the task is narrow.
4. Prompt:

```text
Refactor these files to replace library X with library Y.
Keep behavior unchanged.
Update imports, initialization, and usage sites consistently across all files.
Before editing, list which files will change and why.
```

5. Review the diff in batch.
6. Use Accept or Reject intentionally, not blindly.

### What This Demonstrates

- multi-file context management
- controlled, batch refactoring
- review discipline before accepting AI edits

## 3. Breaking The Agent Loop

### Situation

The Agent keeps editing the same file and rerunning the same failing test.

### How To Recognize It

- repeated edits with no hypothesis change
- repeated test runs with the same error
- no new information is being introduced

### Intervention

1. Stop generation.
2. Reset or narrow the context.
3. Add a concrete hint:
   - the exact error log
   - the failing stack trace
   - a docs link
   - the real expected behavior
4. Re-prompt with a sharper instruction.

### Example Rescue Prompt

```text
Stop retrying the same fix.
Use this error and this stack trace as the primary signal.
Do not change unrelated files.
First explain the likely root cause, then propose one targeted fix.
```

### What This Demonstrates

- you are piloting the agent
- you can debug the model's reasoning path, not just its code output

## 4. MCP Configuration And Safety

### Task

Connect Cursor to a local SQL database or local file system tool through MCP.

### Demo Points

1. Show the MCP configuration screen or config file.
2. Confirm the server is connected.
3. Ask the AI to query the schema using the tool.
4. Explain the permission boundary:
   - read-only access is safer
   - write access increases risk significantly

### Critical Security Risk

If this tool stays connected in a shared environment, the model may read sensitive local data or modify resources beyond the current task.

### Safe Framing

- keep least-privilege permissions
- prefer read-only when demoing schema inspection
- disable or remove the connection after use in shared environments

## 5. Fixing Context Hallucinations

### Situation

You ask about a class, but `@Codebase` injects irrelevant files and the AI invents methods that do not exist.

### Fix

1. Identify that the answer references the wrong files.
2. Remove `@Codebase` from the prompt context.
3. Add only the specific files with `@Files`.
4. Re-prompt with strict scope.

### Example Prompt

```text
Answer using only these attached files.
Do not infer methods from other modules.
If a method is not present in these files, say that directly.
```

### What This Demonstrates

- context itself can be debugged
- better answers often come from less context, not more
