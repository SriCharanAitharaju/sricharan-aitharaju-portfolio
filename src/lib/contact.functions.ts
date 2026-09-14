import { createServerFn } from "@tanstack/react-start";

// Web3Forms access keys are public-by-design (they identify the inbox, not a
// credential). This accessor lets the browser retrieve the stored key when a
// VITE_WEB3FORMS_ACCESS_KEY client env var is not configured.
export const getWeb3FormsAccessKey = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env["WEB3FORMS_ACCESS_KEY"];
  return { key: key ?? null };
});
