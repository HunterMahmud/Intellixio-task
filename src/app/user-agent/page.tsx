// app/user-agent/page.tsx
import { headers } from "next/headers";
import { Providers } from "@/components/providers";
import { UserAgent } from "@/views/userAgent"; 

const UserAgentRoot = () => {
  const userAgent = headers().get("user-agent") || "Unknown user agent";

  return (
    <Providers userAgent={userAgent}>
      <UserAgent />
    </Providers>
  );
};

export default UserAgentRoot;
