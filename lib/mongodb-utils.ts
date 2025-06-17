/**
 * Check if a string is a valid MongoDB ObjectId
 * @param id - The string to check
 * @returns boolean - true if valid ObjectId, false otherwise
 */
export function isValidObjectId(id: string): boolean {
  // Check if it's "new" (used for creation pages)
  if (id === "new") {
    return false;
  }

  // Check if it's a valid ObjectId format (24 hex characters)
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
}

/**
 * Check if we should fetch data based on the ID
 * @param id - The ID parameter from the URL
 * @returns boolean - true if we should fetch, false if it's "new"
 */
export function shouldFetchData(id: string): boolean {
  return id !== "new" && isValidObjectId(id);
}
