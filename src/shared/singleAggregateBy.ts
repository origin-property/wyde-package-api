export interface SingleAggregated<ID, Value> {
  id: ID;
  values: Value;
}

export function singleAggregateBy<ID, TItem>(
  items: TItem[],
  identify: (value: TItem) => ID,
): Array<SingleAggregated<ID, TItem>> {
  const map = new Map<ID, TItem>();

  for (const item of items) {
    const id = identify(item);
    map.set(id, item);
  }

  return [...map.entries()].map(([id, values]) => ({ id, values }));
}
