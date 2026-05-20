# I: Interface Segregation Principle

## Short Description

Clients should not be forced to depend on methods or properties they do not use. Smaller, focused contracts are better than one large all-purpose contract.

## Example In This Project

[src/types/index.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/types/index.ts) uses many focused domain types such as `User`, `Customer`, `Task`, `Deal`, and `NotificationItem` instead of one giant app model.

This keeps each feature dependent only on the data it actually needs. A customer screen does not have to know about audit log fields, and the login flow does not need deal properties.

## Small Example

```ts
export type User = {
  id: string;
  name: string;
  email: string;
};

export type Task = {
  id: string;
  title: string;
  dueDate: string;
};
```

These small contracts are easier to maintain and help keep features decoupled.
