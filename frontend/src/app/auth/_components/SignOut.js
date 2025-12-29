'use client';
import { signOut} from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";

export default function SignOut() {
  const router = useRouter(); // Call useRouter at the top level of the component

  const appSignOut = async () => {
    await signOut({ redirect: false }); // Prevent automatic redirection
    router.refresh(); // Refresh the UI to reflect the updated session
  };

  return (
    <Button onClick={appSignOut}> Sign Out </Button>
  );
}
