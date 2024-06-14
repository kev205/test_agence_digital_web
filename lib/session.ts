import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 min from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getCookie(key: string) {
  const session = cookies().get(key)?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function getSession() {
  return getCookie("session");
}
