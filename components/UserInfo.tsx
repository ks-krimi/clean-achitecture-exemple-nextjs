import { getUserAction } from "@app/actions/get-user.action";

export default async function UserInfo() {
  const result = await getUserAction();
  const user = result.success ? result.user : null;

  if (!user) return null;

  return (
    <div className="w-full border-b border-black/[.06] py-3 px-6 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto text-sm text-zinc-700 dark:text-zinc-300">
        Connecté en tant que <strong>{user.email}</strong>
      </div>
    </div>
  );
}
