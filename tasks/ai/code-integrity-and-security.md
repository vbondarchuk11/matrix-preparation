# Code Integrity And Security

## 1. Refactoring From In-Memory To Streaming

### Problem

AI often solves large-data tasks by loading the full file into memory first.

That creates:

- `O(N)` memory usage
- production risk for large CSV or JSON files
- possible out-of-memory failures

### Demo Goal

Show an AI-generated in-memory implementation first, then force a refactor to streaming, iterator, or generator style.

### Strong Prompt

```text
Refactor this solution so it does not load the full dataset into memory.

Requirements:
- process items incrementally
- keep memory complexity near O(1)
- use streaming / iterator / yield style appropriate for this stack
- preserve current behavior
- explain which line changed the memory model and why
```

### What To Explain

- the original solution stored the whole dataset
- the new solution processes one chunk or item at a time
- time complexity may stay similar, but memory complexity improves from `O(N)` to approximately `O(1)`

## 2. Vetting An AI-Suggested Dependency

### Problem

AI may invent a package name that looks real or suggest an abandoned package.

### Vetting Process Before Install

1. Prove the package exists:
   - check the official registry
   - verify publisher and package spelling
2. Check license:
   - confirm MIT, Apache, GPL, or other license terms
   - make sure it matches company policy
3. Check maintenance:
   - last publish date
   - recent commits
   - issue activity
   - download health if relevant
4. Check reputation:
   - official docs
   - GitHub repository
   - signs of typosquatting or copycat naming

## 3. Retry Policy With Exponential Backoff

### Problem

AI often writes integration code that:

- catches everything
- logs a vague message
- retries the wrong failures
- swallows useful diagnostics

### Review Standard

Separate:

- transient errors: timeouts, network blips, `5xx`, temporary rate limits
- terminal errors: bad input, auth failure, most `4xx`, schema mismatch

### Required Improvement

Ask the AI to retry only transient failures.

### Strong Prompt

```text
Refactor this integration block to use a retry policy with exponential backoff.

Requirements:
- retry only on timeout, network failure, and 5xx responses
- do not retry on 4xx client errors
- preserve the original error context
- log structured details for each retry attempt
- stop after a bounded number of retries
```

### Why This Matters

- avoids retry storms on bad requests
- improves resilience for temporary failures
- keeps error handling explicit instead of hiding root causes
