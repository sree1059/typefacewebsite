import { createClient } from '@supabase/supabase-js';

// Read client credentials
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
// Normalize URL in case the REST endpoint was provided (/rest/v1)
const supabaseUrl = rawSupabaseUrl
  .trim()
  .replace(/\/rest\/v1\/?$/, '')
  .replace(/\/+$/, '');

const supabasePublishableKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  ''
).trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

/**
 * Official Supabase Client
 * Initialized strictly with browser-safe publishable credentials (anon key).
 * Never exposes service-role keys or database passwords.
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublishableKey || 'placeholder-publishable-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Helper to verify connection and auth responsiveness
 */
export async function verifySupabaseConnection(): Promise<{
  initialized: boolean;
  authConnected: boolean;
  message: string;
}> {
  if (!isSupabaseConfigured) {
    return {
      initialized: false,
      authConnected: false,
      message: 'Supabase credentials are not configured.',
    };
  }

  try {
    const { error } = await supabase.auth.getSession();
    if (error) {
      return {
        initialized: true,
        authConnected: false,
        message: `Auth communication error: ${error.message}`,
      };
    }
    return {
      initialized: true,
      authConnected: true,
      message: 'Supabase client and Auth connection successfully verified.',
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown connection error';
    return {
      initialized: false,
      authConnected: false,
      message: msg,
    };
  }
}
