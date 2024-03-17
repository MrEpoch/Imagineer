import { redirect } from "next/navigation";

export function handleError(errorType: string, url: string) {
  redirect(url + "?error=" + errorType);
}
