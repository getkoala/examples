export const KOALA_ID_COOKIE_NAME = "ko_id";
export const PROJECT = "<your workspace slug>";

interface FetchProfileParams {
  id?: string;
  email?: string;
  ip?: string;
  referrer?: string | null;
  userAgent?: string;
}

export async function fetchProfile(params: FetchProfileParams) {
  const response = await fetch(
    `https://api.getkoala.com/web/projects/${PROJECT}/profiles`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": params.userAgent || "",
        "x-forwarded-for": params.ip!,
      },
      body: JSON.stringify({
        email: params.email,
        profile_id: params.id,
        ip: params.ip,
        referrer: params.referrer ?? undefined,
      }),
    }
  );

  const data = response.ok ? await response.json() : {};
  return data;
}
