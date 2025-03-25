import { draftMode } from "next/headers";

export async function GET(request: Request) {

  const draft = await draftMode(); // Await the promise
  draft.disable(); // Now you can call .disable()

  return new Response("Draft mode is disabled");
}
