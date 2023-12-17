type PageWithNext = {
  next?: string;
};

export function getNextPageLimitOffsetParams<T extends PageWithNext>(
  lastPage: T,
  _allPages?: T[],
) {
  const next = lastPage.next;
  if (!next) return;
  const nextUrl = new URL(next);
  const offset = nextUrl.searchParams.get("offset");
  const limit = nextUrl.searchParams.get("limit");
  if (!offset || !limit) return;
  return { limit: Number(limit), offset: Number(offset) };
}
