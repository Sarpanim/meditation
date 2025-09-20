declare module "@supabase/supabase-js" {
  export type SignInWithOtpParams = {
    email: string;
    options?: {
      emailRedirectTo?: string;
    };
  };

  export type SupabaseAuthUser = {
    email?: string | null;
  } | null;

  export type SignInWithOtpResponse = {
    error: { message?: string } | null;
  };

  export type SignOutResponse = {
    error: { message?: string } | null;
  };

  export type ExchangeCodeForSessionResponse = {
    data: {
      user: SupabaseAuthUser;
    } | null;
    error: { message?: string } | null;
  };

  export type SupabaseAuthApi = {
    signInWithOtp: (params: SignInWithOtpParams) => Promise<SignInWithOtpResponse>;
    signOut: () => Promise<SignOutResponse>;
    exchangeCodeForSession: (code: string) => Promise<ExchangeCodeForSessionResponse>;
  };

  export type PostgrestError = {
    message?: string;
  } | null;

  export type PostgrestResponse<Row extends Record<string, unknown>> = {
    data: Row[] | null;
    error: PostgrestError;
  };

  export type PostgrestSingleResponse<Row extends Record<string, unknown>> = {
    data: Row | null;
    error: PostgrestError;
  };

  export type PostgrestFilterBuilder<Row extends Record<string, unknown>> =
    Promise<PostgrestResponse<Row>> & {
      eq: (column: string, value: unknown) => PostgrestFilterBuilder<Row>;
      order: (
        column: string,
        options?: {
          ascending?: boolean;
          nullsFirst?: boolean;
          foreignTable?: string;
        },
      ) => PostgrestFilterBuilder<Row>;
      limit: (count: number) => PostgrestFilterBuilder<Row>;
      maybeSingle: () => Promise<PostgrestSingleResponse<Row>>;
      single: () => Promise<PostgrestSingleResponse<Row>>;
    };

  export type SupabaseQueryBuilder<Row extends Record<string, unknown>> = {
    select: (columns?: string) => PostgrestFilterBuilder<Row>;
  };

  export type SupabaseClient = {
    auth: SupabaseAuthApi;
    from: <Row extends Record<string, unknown> = Record<string, unknown>>(
      table: string,
    ) => SupabaseQueryBuilder<Row>;
  };

  export function createClient(
    url: string,
    key: string,
    options?: unknown,
  ): SupabaseClient;
}
