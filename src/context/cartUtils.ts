export function getCartKey(item: { id: string; color: string; storage: string }): string {
  return `${item.id}-${item.color}-${item.storage}`;
}
