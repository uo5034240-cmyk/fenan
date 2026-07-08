import serverModule from "../../dist/server/server.js";

function toNodeHeaders(headers) {
  const result = {};
  for (const [key, value] of Object.entries(headers || {})) {
    if (Array.isArray(value)) {
      result[key] = value.join(",");
    } else if (value != null) {
      result[key] = String(value);
    }
  }
  return result;
}

export default async function handler(event) {
  const rawUrl = event.rawUrl ?? `${event.headers?.host ?? "localhost"}${event.path}${event.rawQueryString ? `?${event.rawQueryString}` : ""}`;
  const url = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${event.headers?.host ?? "example.com"}${event.path}${event.rawQueryString ? `?${event.rawQueryString}` : ""}`);

  const request = new Request(url.toString(), {
    method: event.httpMethod,
    headers: toNodeHeaders(event.headers),
    body: event.isBase64Encoded && event.body ? Buffer.from(event.body, "base64") : event.body || undefined,
  });

  const response = await serverModule.default.fetch(request, undefined, undefined);
  const responseBody = await response.text();
  const responseHeaders = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  return {
    statusCode: response.status,
    headers: responseHeaders,
    body: responseBody,
  };
}
