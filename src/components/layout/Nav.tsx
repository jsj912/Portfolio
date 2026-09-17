import { NavClient } from "@/components/layout/NavClient";
import { profile } from "@/content/site";
import { hasResume, RESUME_PATH } from "@/lib/resume";

/**
 * Server wrapper: the resume check touches the filesystem at build time, so it
 * happens here and the result is handed to the interactive part as a prop.
 */
export function Nav() {
  return (
    <NavClient hasResume={hasResume} resumePath={RESUME_PATH} name={profile.name} />
  );
}
