const SUPABASE_URL = "https://okvaxyncbnmxonznodzj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rdmF4eW5jYm5teG9uem5vZHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MDc2MTksImV4cCI6MjA5NDQ4MzYxOX0.KaVk1hxwgT9Q86v_RD7SNUroHPGfgNdtXxaanso-tzE";

const client = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const loginForm =
  document.getElementById("loginForm");

const message =
  document.getElementById("message");

// Open dashboard from Supabase
async function openDashboard() {

  try {

    const { data, error } =
      await client
        .from("dashboard_routes")
        .select("file_name")
        .limit(1)
        .single();

    if (error || !data) {

      message.innerText =
        "Dashboard route missing";

      return;
    }

    window.location.href =
      "dashboard/" + data.file_name;

  } catch (err) {

    console.error(err);

    message.innerText =
      "Unable to open dashboard";
  }
}

// Login
loginForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const email =
      document.getElementById("email").value;

    const password =
      document.getElementById("password").value;

    const { error } =
      await client.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {

      message.innerText =
        error.message;

      return;
    }

    // Open hidden dashboard
    openDashboard();
  }
);

// Signup
const signupBtn = document.querySelector(".signupBtn");
signupBtn.addEventListener(
  "click",
  async () => {

    const email =
      document.getElementById("email").value;

    const password =
      document.getElementById("password").value;

    const { error } =
      await client.auth.signUp({
        email,
        password,
      });

    if (error) {

      message.innerText =
        error.message;

      return;
    }

    message.innerText =
      "Account created";
  }
);