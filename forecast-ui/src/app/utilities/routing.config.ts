export const noFooterPages: Array<string | RegExp> = [
  "/register/login",
  "/register/signup",
  "/nucleoicons",
  "/not-found"
];

export const transparentNavbarPages: Array<string | RegExp> = [
  "/home",
  "/register/login",
  "/register/signup",
  "/nucleoicons",
  "/not-found",
  "/account",
  "/movies/",
  "/movies/:id",
  /^\/cinemas\/[^/]+$/g, // /cinemas/:id
  /^\/movies\/[^/]+$/g // /movies/:id
];

export function isUriInArray(
  array: Array<string | RegExp>,
  uri: string
): boolean {
  return (
    array.findIndex((pattern: string | RegExp) => {
      if (typeof pattern === "string") return pattern === uri;
      return !!uri.match(pattern);
    }) !== -1
  );
}
