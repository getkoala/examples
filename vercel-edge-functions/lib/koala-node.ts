export const KOALA_ID_COOKIE_NAME = "ko_id";
export const PROJECT = "koala";

interface FetchProfileParams {
  id?: string;
  ip?: string;
  referrer?: string;
  userAgent?: string;
}

export async function fetchProfile(params: FetchProfileParams) {
  const response = await fetch(
    `http://localhost:3000/web/projects/${PROJECT}/profiles`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": params.userAgent!,
        "x-forwarded-for": params.ip!,
      },
      body: JSON.stringify({
        profile_id: params.id,
        // only send a new start time if we don't have an id yet
        start_time: params.id ? undefined : new Date(),
        referrer: params.referrer,
      }),
    }
  );

  const data = response.ok ? await response.json() : {};
  return data;
}
