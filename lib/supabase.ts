import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient;

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!supabaseClient) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
          'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
        );
      }
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    }
    return Reflect.get(supabaseClient, prop);
  },
});
