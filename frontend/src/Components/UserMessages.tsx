import { useState } from "react";
import { useBreakpoint } from "../Hooks/BreakpointHook.tsx";
import ConversationThumb from "./Elements/MessagingElements/ConversationThumb.tsx";
import Conversation from "./Elements/MessagingElements/Conversation.tsx";
import NoMessageOpen from "./Elements/MessagingElements/NoMessageOpen.tsx";
import MaterialSymbolsChatAddOnRounded from "./Icons/MaterialSymbolsChatAddOnRounded.tsx";
import MaterialSymbolsSettingsRounded from "./Icons/MaterialSymbolsSettingsRounded.tsx";
import { Route, Routes } from "react-router";
import NotFound from "./NotFound.tsx";
import { Link } from "react-router-dom";
import MessagingSettings from "./Elements/MessagingElements/MessagingSettings.tsx";
import { useQuery } from "@tanstack/react-query";
import conversationService from "../Services/conversationService.ts";
import { useUser } from "../UserWrapper.tsx";

const UserMessages = () => {
  const user = useUser().user;
  const { isXl } = useBreakpoint("xl");
  const [closed, setClosed] = useState(true);

  /**
   * Query to get conversation list
   */
  const conversationQuery = useQuery({
    queryKey: ["conversations"],
    queryFn: () => {
      return conversationService.getUserConversations(user!.id);
    },
    enabled: !!user,
  });

  return (
    <div className="h-full overflow-hidden">
      {/**
       * Left column
       */}
      <div className="flex w-full justify-between border-b-[1px] border-b-black50 px-2">
        <h2 className="my-4 text-center">Messaging Hub</h2>
        <div className="flex gap-2 self-center text-lg">
          <Link to={"/messages"} onClick={() => setClosed(false)}>
            <MaterialSymbolsChatAddOnRounded />
          </Link>
          <Link
            to={"/messages/settings"}
            onClick={() => {
              setClosed(false);
            }}
          >
            <MaterialSymbolsSettingsRounded />
          </Link>
        </div>
      </div>
      <div className="h-full w-full xl:flex xl:flex-row">
        <div
          className={`${
            !isXl && !closed ? "hidden h-0" : "h-full"
          } scrollbar-thin w-full overflow-y-auto border-b-[1px] border-solid border-black50 xl:w-[50%] xl:border-b-0 xl:border-r-[1px]`}
        >
          {
            /**
             * Conversation query returned error
             */
            conversationQuery.isError && (
              <p className="p-4 text-center text-warning">
                Error loading conversations
              </p>
            )
          }

          {
            /**
             * Conversation query is loading
             */
            conversationQuery.isLoading && (
              <div className="mt-2 flex h-full flex-col gap-1">
                <p className="mx-auto h-[11%] w-[96%] animate-pulse bg-black75"></p>
                <p className="mx-auto h-[11%] w-[96%] animate-pulse bg-black75"></p>
                <p className="mx-auto h-[11%] w-[96%] animate-pulse bg-black75"></p>
              </div>
            )
          }

          {conversationQuery.isSuccess && (
            /**
             * Conversation query returned without error
             */
            <>
              {conversationQuery.data.length > 0 ? (
                (conversationQuery.data as Conversation[]).map(
                  (conversation) => (
                    <ConversationThumb
                      key={conversation.id}
                      conversation={conversation}
                      setClosed={setClosed}
                    />
                  ),
                )
              ) : (
                <p className="p-4 text-center">No conversations found</p>
              )}
            </>
          )}
        </div>
        {/**
         * Right column
         */}
        <div
          className={`${
            !isXl && closed && "collapse"
          } relative flex h-full flex-grow flex-col xl:h-[91%]`}
        >
          <Routes>
            <Route path="" element={<NoMessageOpen setClosed={setClosed} />} />
            <Route
              path=":id"
              element={<Conversation setClosed={setClosed} />}
            />
            <Route
              path="settings"
              element={<MessagingSettings setClosed={setClosed} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
