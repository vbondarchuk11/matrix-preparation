# AI Fundamentals

## 1. Teaching AI An Internal Framework In One Session

### Case

You are working on a proprietary internal framework that the model does not know. The AI keeps suggesting standard Node, Python, .NET, or React patterns that do not work in your environment.

### Goal

Force the AI to stop guessing from public patterns and start following your internal conventions in a single session.

### Example Prompt

```text
You are working in our internal framework, not plain React or Express.

Follow these rules:
- use our existing service pattern from @Files
- use our DTO format from @Files
- do not introduce generic REST helpers
- do not use external abstractions unless they already exist in this codebase

Before writing code:
1. summarize the patterns you see
2. list which existing files you will imitate
3. then implement using only those patterns
```

### Why This Works

- it reduces hallucination by narrowing the solution space
- it forces the model to ground itself in local examples
- it turns the first answer into pattern alignment instead of blind generation

## 2. Temperature In API Usage

### What Temperature Means

Temperature controls randomness in model output.

- low temperature: more deterministic, more repeatable, less creative
- high temperature: more diverse, more creative, less predictable

### Best Setting For Code Generation

For an AI coding tool, use a low temperature, usually around `0` to `0.3`.

### Why

- code generation benefits from consistency more than creativity
- lower temperature reduces syntax drift and unnecessary variation
- the same prompt should produce similar implementation patterns

### Trade-Offs

Low temperature trade-offs:

- safer for production workflows
- better for refactors, tests, DTOs, migrations, and bug fixes
- may miss alternative ideas or creative edge-case handling

High temperature trade-offs:

- useful for brainstorming, naming, architecture options, or UX copy
- more likely to invent APIs, patterns, or unsupported abstractions
- less reliable for precise code tasks

### Practical Recommendation

Use:

- `0` to `0.2` for code generation, migrations, test fixes, and structured JSON
- `0.3` to `0.5` for drafting explanations or alternative implementation ideas
- higher settings only for ideation, not for trusted code output

## 3. Verifying The "Perfect" Hallucinated Method

### Situation

The AI suggests a method like `.autoFit()` or `.uploadStream()` and the code looks correct.

### Correct Process

Do not run it first and wait for failure.

Instead:

1. Cmd+Click the method in the IDE to jump to its type definition.
2. Search the installed package version in `node_modules` or local package docs.
3. Check the official documentation for the exact version you use.
4. Verify the method name, signature, and availability in that version.
5. Only then integrate it.

### Fast Verification Checklist

- check `package.json` for the installed version
- inspect the exported typings or source
- search the official docs or changelog for that method
- confirm whether the example came from a newer version or a different SDK

### Root Cause To Explain

Two common reasons:

- knowledge cutoff: the model may not know the latest or exact library state
- version mismatch: the method may exist in another major version, but not yours
