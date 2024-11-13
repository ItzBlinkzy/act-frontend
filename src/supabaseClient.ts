import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/database.types" //
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabase: SupabaseClient<Database> = createClient<Database>(supabaseUrl, supabaseAnonKey)
