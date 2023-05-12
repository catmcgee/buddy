export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
): (() => Promise<TData>) => {
  async function getAccessToken() {
   // implement this
  }

  return async () => {
    const token = typeof window !== "undefined" ? await getAccessToken() : null;

    const res = await fetch("https://api.lens.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options,
        "x-access-token": token ? token : "",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || "Error…");
    }

    return json.data;
  };
};