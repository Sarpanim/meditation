declare module "@supabase/supabase-js" {
  export type SignInWithOtpParams = {
    email: string;
    options?: {
      emailRedirectTo?: string;
    };
  };

  export type SupabaseAuthApi = {
    signInWithOtp: (params: SignInWithOtpParams) => Promise<{ error: { message?: string } | null }>;
  };

  export type SupabaseClient = {
    auth: SupabaseAuthApi;
  };

  export function createClient(
    url: string,
    key: string,
    options?: unknown,
  ): SupabaseClient;
}
