# Sending Events From One Browser Tab To Another

## Overview

This project now demonstrates cross-tab browser communication by syncing the auth session between tabs.

Real use case:

- if the user signs in on one tab, the other tab can receive the session update
- if the user signs out on one tab, the other tab is notified and clears the session too

## How It Is Implemented

### 1. Cross-Tab Event Utility

The shared utility lives in [src/lib/cross-tab-events.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/lib/cross-tab-events.ts).

It uses:

- `BroadcastChannel` when available
- `localStorage` + the `storage` event as a fallback

Example:

```ts
const authChannel = createCrossTabChannel<AuthSyncEvent>("auth-session");
```

This creates a named browser channel that can be used by multiple tabs from the same origin.

### 2. Sending An Event

In [src/store/auth-store.ts](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/store/auth-store.ts), the app sends an event whenever the auth state changes.

When login succeeds:

```ts
setSession: (token, user) => {
  localStorage.setItem(storageKey, JSON.stringify({ token, user }));
  set({ token, user });
  authChannel.emit({ type: "session:set", token, user });
},
```

When logout happens:

```ts
clearSession: () => {
  localStorage.removeItem(storageKey);
  set({ token: null, user: null });
  authChannel.emit({ type: "session:clear" });
},
```

This is the actual "send event from one tab to another" step.

### 3. Receiving The Event In Another Tab

The app subscribes to that channel in the same file:

```ts
authChannel.subscribe((event) => {
  if (event.type === "session:set") {
    useAuthStore.setState({
      token: event.token,
      user: event.user,
      hydrated: true,
    });
    return;
  }

  useAuthStore.setState({
    token: null,
    user: null,
    hydrated: true,
  });
});
```

This means another open tab reacts immediately when the event is received.

### 4. App Initialization

The listener is started in [src/main.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/main.tsx):

```ts
useAuthStore.getState().hydrate();
initializeAuthSync();
```

So every tab is ready to receive events as soon as the app loads.

## How To Demonstrate It

1. Open the app in two browser tabs.
2. Log in or log out in one tab.
3. The second tab receives the cross-tab event and updates its auth state.

The clearest demo is logout:

- click `Sign out` in one tab
- the second tab also loses its session because it receives `session:clear`

## Browser APIs Used

- `BroadcastChannel`
- `localStorage`
- `storage` event

These are standard browser mechanisms for cross-tab communication on the same origin.

## Short Conclusion

This project now shows real cross-tab event communication in the browser through auth session sync. One tab emits an event when the session changes, and another tab listens for that event and updates its state accordingly.
