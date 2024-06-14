"use server";

import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (prevState: any, formData: FormData) => {
  return fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
      expiresInMins: 30,
    }),
  })
    .then((res) => res.json())
    .then(async (res) => {
      if (res.id) {
        cookies().set("session", await encrypt(res), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 60 * 1000,
          path: "/",
        });
        return redirect("/");
      }

      return res;
    });
};
