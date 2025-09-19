type SignInWithOtpParams = {
  email: string;
  options?: {
    emailRedirectTo?: string;
  };
};

type SupabaseAuthApi = {
  signInWithOtp: (params: SignInWithOtpParams) => Promise<{ error: { message?: string } | null }>;
};

type SupabaseClient = {
  auth: SupabaseAuthApi;
};

let client: SupabaseClient | null = null;

function loadSupabaseFactory(): ((url: string, key: string, options?: unknown) => SupabaseClient) | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    const { createClient } = require("@supabase/supabase-js") as {
      createClient: (url: string, key: string, options?: unknown) => SupabaseClient;
    };
    return createClient;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Supabase SDK non installé : retour en mode démo.");
    }
    return null;
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  if (client) {
    return client;
  }

  const factory = loadSupabaseFactory();

  if (!factory) {
    return null;
  }

  client = factory(url, anonKey, {
    auth: {
      persistSession: false,
    },
  });

  return client;
}
