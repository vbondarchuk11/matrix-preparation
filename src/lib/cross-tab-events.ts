type CrossTabSubscription<TEvent> = (event: TEvent) => void;

export function createCrossTabChannel<TEvent>(name: string) {
  const storageKey = `matrix-cross-tab:${name}`;
  const broadcastChannel =
    typeof window !== "undefined" && "BroadcastChannel" in window
      ? new BroadcastChannel(name)
      : null;

  function emit(event: TEvent) {
    if (broadcastChannel) {
      broadcastChannel.postMessage(event);
      return;
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        event,
        timestamp: Date.now(),
      }),
    );
    localStorage.removeItem(storageKey);
  }

  function subscribe(listener: CrossTabSubscription<TEvent>) {
    if (broadcastChannel) {
      const onMessage = (message: MessageEvent<TEvent>) => {
        listener(message.data);
      };

      broadcastChannel.addEventListener("message", onMessage);
      return () => broadcastChannel.removeEventListener("message", onMessage);
    }

    const onStorage = (storageEvent: StorageEvent) => {
      if (storageEvent.key !== storageKey || !storageEvent.newValue) {
        return;
      }

      const payload = JSON.parse(storageEvent.newValue) as { event: TEvent };
      listener(payload.event);
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }

  function close() {
    broadcastChannel?.close();
  }

  return {
    emit,
    subscribe,
    close,
  };
}
