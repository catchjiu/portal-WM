type LogPayload = Record<string, unknown>;

export function logEvent(event: string, payload: LogPayload = {}) {
  console.info(
    JSON.stringify({
      level: "info",
      event,
      payload,
      timestamp: new Date().toISOString(),
    }),
  );
}

export function logError(event: string, payload: LogPayload = {}) {
  console.error(
    JSON.stringify({
      level: "error",
      event,
      payload,
      timestamp: new Date().toISOString(),
    }),
  );
}
