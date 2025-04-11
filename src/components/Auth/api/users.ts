import { User } from "@/types/user";

export const createUser = async (user: User) => {
  try {
    const response = await fetch(`${process.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
