import React from "react";
import { Common } from "@types";
import { useIrcRegistriesAndRegister } from "./ircRegisteryProvider";
import { IRC_ACTIONS } from "@utils/utils";

export default function componentRegistrar({
  props,
  loading,
  event,
  error,
  responseMeta,
  refreshResponse,
}: {
  props: Common;
  loading: boolean;
  event: any;
  refreshResponse: () => Promise<any>;
  error?: any;
  responseMeta?: any;
}) {
  const ircRegisteryAndRegister = useIrcRegistriesAndRegister();
  const filename = props.filename;
  //   initial registry
  React.useEffect(() => {
    ircRegisteryAndRegister.register(IRC_ACTIONS.new, {
      filename,
      props,
      refreshResponse,
    });
  }, []);

  React.useEffect(() => {
    ircRegisteryAndRegister.register(IRC_ACTIONS.updateStatus, {
      filename: props.filename,
      props,
      status: loading ? "pending" : event ? "successful" : "unknown",
      refreshResponse,
    });
  }, [loading]);

  React.useEffect(() => {
    ircRegisteryAndRegister.register(IRC_ACTIONS.updateErrorAndResponse, {
      filename: props.filename,
      props,
      error,
      response: responseMeta,
      status: error ? "error" : responseMeta ? "successful" : "unknown",
      refreshResponse
    });
  }, [error, responseMeta]);
}
