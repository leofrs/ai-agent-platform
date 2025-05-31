"use client";

import CallContainer from "@/components/CallContainer";
import ErrorScreen from "@/components/ErrorScreen";
import { User } from "@stream-io/video-client";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User>();
  const [callId, setCallId] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch("/api/token");
      const data = await response.json();
      setUser(data.user);
      setCallId(data.callId);
      setApiKey(data.apiKey);
      setToken(data.token);
    };

    fetchToken();
  }, []);

  if (!user || !token || !apiKey) {
    return <div className="animate-pulse">Carregando...</div>;
  }

  return (
    <section className="w-screen-h-screen flex items-center justify-center">
      <CallContainer
        user={user}
        token={token}
        apiKey={apiKey}
        callId={callId}
      />
    </section>
  );
}
