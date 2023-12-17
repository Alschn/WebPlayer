import { cookies } from "next/headers";

const fetcher = (...args: Parameters<typeof fetch>) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value ?? "";
  const [input, init] = args;
  const { headers, ...restInit } = init ?? {};
  return fetch(input, {
    headers: {
      ...headers,
      Authorization: `Token ${token}`,
    },
    ...restInit,
  });
};

export default fetcher;
