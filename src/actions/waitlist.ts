"use server";

import { LoopsClient } from "loops";

// Initialize the Loops client. It will silently handle missing keys gracefully below if not set.
const loops = new LoopsClient(process.env.LOOPS_API_KEY || "missing_key");

export async function submitWaitlistEmail(email: string) {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (!process.env.LOOPS_API_KEY) {
      console.warn("LOOPS_API_KEY is missing. Simulating success for development.");
      // Artificial delay to simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { success: true }; 
    }

    const response = await loops.createContact({
      email,
      properties: {
        source: "PropPilot Coming Soon",
      }
    });

    if (response.success) {
      return { success: true };
    } else {
      console.error("Loops API error:", response);
      return { success: false, error: "Could not add email. Please try again later." };
    }
  } catch (error: any) {
    console.error("Error submitting waitlist email:", error);
    
    // If the email is already in their Loops audience, just act like it was a success.
    // This is the best UX for a waitlist (idempotent submissions).
    if (error.message && error.message.includes("already in your audience")) {
      return { success: true };
    }

    return { success: false, error: "An unexpected error occurred." };
  }
}
