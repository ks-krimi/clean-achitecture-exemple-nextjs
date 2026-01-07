import SessionRemaining from "@/src/ui/auth/SessionRemaining";

type UserInfoProps = { email: string; sessionExp: number };

export default async function UserInfo({ email, sessionExp }: UserInfoProps) {
  return (
    <div className="w-full border-b border-black/[.06] py-3 px-6 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto text-sm text-zinc-700 dark:text-zinc-300">
        Connecté en tant que <strong>{email}</strong>
      </div>
      <SessionRemaining exp={sessionExp} />
    </div>
  );
}
