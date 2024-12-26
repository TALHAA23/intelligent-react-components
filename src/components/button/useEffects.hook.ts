import React from "react";
import { useIrcRegistriesAndRegister } from "@src/hooks/ircRegisteryProvider";
import { AIButtonProps } from "@types";

export default function createIrcRegisteryUseableUseEffects({
  props,
  loading,
  event,
  error,
  responseMeta,
  refreshResponse,
}: {
  props: AIButtonProps;
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
    ircRegisteryAndRegister.register("new-button", {
      filename,
      buttonProps: props,
      refreshResponse,
    });
  }, []);

  React.useEffect(() => {
    ircRegisteryAndRegister.register("update-button-status", {
      filename: props.filename,
      buttonProps: props,
      status: loading ? "pending" : event ? "successful" : "unknown",
      refreshResponse,
    });
  }, [loading]);

  React.useEffect(() => {
    ircRegisteryAndRegister.register("update-button-error-or-response", {
      filename: props.filename,
      buttonProps: props,
      error,
      response: responseMeta,
      status: error ? "error" : responseMeta ? "successful" : "unknown",
      refreshResponse
    });
  }, [error, responseMeta]);
}
