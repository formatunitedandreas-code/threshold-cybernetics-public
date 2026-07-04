export function pathsAllowed(plannedFilePaths: string[], allowedFilePaths: string[]): boolean {
  if (plannedFilePaths.length === 0) {
    return true;
  }

  if (allowedFilePaths.length === 0) {
    return false;
  }

  return plannedFilePaths.every((path) => allowedFilePaths.some((pattern) => pathMatches(path, pattern)));
}

export function pathMatches(path: string, pattern: string): boolean {
  if (pattern.endsWith("/**")) {
    return path.startsWith(pattern.slice(0, -2));
  }

  return path === pattern;
}
