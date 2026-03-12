export function isLineInAppBrowser(userAgent: string | null | undefined) {
  return Boolean(userAgent?.toLowerCase().includes("line"));
}

export function getLineLinkStatus(lineId: string | null) {
  if (!lineId) {
    return {
      linked: false,
      mode: "fallback",
    };
  }

  return {
    linked: true,
    mode: "linked",
  };
}
