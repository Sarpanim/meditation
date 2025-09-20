declare module "@supabase/auth-helpers-nextjs" {
  export function createClientComponentClient<T = unknown>(options?: unknown): any;
  export function createServerComponentClient<T = unknown>(options: { cookies: unknown }): any;
  export function createRouteHandlerClient<T = unknown>(options: { cookies: unknown }): any;
  export function createMiddlewareClient<T = unknown>(options: { req: unknown; res: unknown }): any;
}
