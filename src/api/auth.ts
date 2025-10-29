import supabase from "@/lib/supabase";

interface Credentials {
  email: string;
  password: string;
}

export async function signUp({ email, password }: Credentials) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  return data;
}

export async function signInWithPassword({ email, password }: Credentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}
