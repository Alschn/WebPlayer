type PageWithNext = {
  next: string | null;
}

export function getNextPageLimitOffsetParam<T extends PageWithNext>(
  lastPage: T,
  _allPages?: T[]
) {
  const next = lastPage.next;
  if (!next) return;
  const url = new URL(next);
  const limit = url.searchParams.get('limit');
  const offset = url.searchParams.get('offset');
  return {limit, offset};
}
