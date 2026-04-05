export async function login(email) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data.token; // Assumes server responds with { token: "..." }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}