import { AuthProvider } from "@/context/AuthProvider";
import Dashboard from "./page";
import { getUserFromToken } from "@/lib/jwt";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromToken();

  return (
    <>
      <AuthProvider
        name={user?.user.name ?? null}
        userRole={user?.user.userRole ?? null}
      >
        <Dashboard>{children}</Dashboard>
      </AuthProvider>
    </>
  );
}
