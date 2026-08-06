import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Reads a JSON value stored under `key` from the shared kv_store table.
// Returns the parsed value (object/array) or null if not found / on error.
export async function kvGet(key) {
  const { data, error } = await supabase
    .from("kv_store")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error) {
    console.error("kvGet error:", error);
    return null;
  }
  return data ? data.value : null;
}

// Writes (creates or updates) a JSON value under `key`.
export async function kvSet(key, value) {
  const { error } = await supabase
    .from("kv_store")
    .upsert({ key, value, updated_at: new Date().toISOString() });

  if (error) {
    console.error("kvSet error:", error);
  }
}
