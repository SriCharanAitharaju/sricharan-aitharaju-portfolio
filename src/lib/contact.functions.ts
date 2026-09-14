import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(1000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const accessKey = process.env["WEB3FORMS_ACCESS_KEY"];
    if (!accessKey) {
      return { ok: false as const, error: "Contact form is not configured yet." };
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio message from ${data.name}`,
          from_name: "Portfolio Contact Form",
          name: data.name,
          email: data.email,
          message: data.message,
ठ: undefined,
        }),
      });
      const json = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !json.success) {
        console.error("Web3Forms send failed", res.status, json.message);
        return { ok: false as const, error: "Could not send your message. Please try again." };
      }
      return { ok: true as const };
    } catch (err) {
      console.error("Web3Forms request error", err);
      return { ok: false as const, error: "Could not send your message. Please try again." };
    }
  });
