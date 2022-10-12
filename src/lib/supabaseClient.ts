// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import { dev } from '$app/environment';

let supabaseUrl;
let supabaseAnonKey;

if (dev) {
	supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
} else {
	supabaseUrl = process.env.SUPABASE_URL;
	supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
}

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export { supabaseClient };
