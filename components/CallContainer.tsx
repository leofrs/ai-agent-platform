import { useVideoClient } from "@/hooks/useVideoClient";
import { Call, User } from "@stream-io/video-client";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import ErrorScreen from "./ErrorScreen";
import { useCallback, useEffect, useState } from "react";
import CallLayout from "./CallLayout";

interface CallContainerProps {
  user: User;
  token: string;
  apiKey: string;
  callId: string;
}

export default function CallContainer(
  props: CallContainerProps
): React.JSX.Element {
  const { user, token, apiKey, callId } = props;
  const [call, setCall] = useState<Call>();
  const [joining, setJoining] = useState(false);

  const videoClient = useVideoClient({ apiKey, user, tokenOrProvider: token });

  const createCall = useCallback(async () => {
    const callToCreate = videoClient?.call("default", callId);
    await callToCreate?.camera.disable();
    await callToCreate?.join({ create: true });
    setCall(callToCreate);
    setJoining(false);
  }, [videoClient]);

  useEffect(() => {
    if (!videoClient) {
      return;
    }

    if (!call) {
      if (joining) {
        createCall();
      } else {
        setJoining(true);
      }
    }
  }, [call, videoClient, createCall, joining]);

  if (!call) {
    return (
      <div className="w-full h-full text-xl font-semibold flex items-center justify-center animate-pulse">
        Joining call ...
      </div>
    );
  }

  if (!videoClient) {
    return <ErrorScreen error="Client could not be initialized" />;
  }

  if (!user) {
    return <ErrorScreen error="User not found" />;
  }

  return (
    <StreamVideo client={videoClient}>
      <StreamCall call={call}>
        <CallLayout />
      </StreamCall>
    </StreamVideo>
  );
}
