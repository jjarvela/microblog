import TextInput from "../Inputs/TextInput.tsx";
import MaterialSymbolsChatAddOnRounded from "../../Icons/MaterialSymbolsChatAddOnRounded.tsx";
import Button from "../Button.tsx";
import { MaterialSymbolsChevronLeftRounded } from "../../Icons/MaterialSymbolsChevronLeftRounded";
import { Link, useNavigate } from "react-router-dom";
import { useBreakpoint } from "../../../Hooks/BreakpointHook.tsx";
import { useMutation } from "@tanstack/react-query";
import conversationService from "../../../Services/conversationService.ts";
import { recipientUser1 } from "../../../globalData.ts";
import { queryClient } from "../../../main.tsx";
import { useUser } from "../../../UserWrapper.tsx";

type NoMessageOpenProps = {
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NoMessageOpen({ setClosed }: NoMessageOpenProps) {
  const { isXl } = useBreakpoint("xl");
  const navigate = useNavigate();
  const user = useUser();

  const newConversationMutation = useMutation({
    mutationKey: ["newConversation"],
    mutationFn: () => {
      if (!user.user) throw new Error("No user");
      return conversationService.createConversation({
        participant_1: user.user.id,
        participant_2: recipientUser1.id,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["conversations", user.user!.id],
      });
      console.log(data);
      navigate(`/messages/${(data as Conversation).id}`);
    },
  });

  return (
    <div className=" flex flex-col">
      {!isXl && (
        <Link
          to={"/messages"}
          className="text-3xl text-black50"
          onClick={() => setClosed(true)}
        >
          <MaterialSymbolsChevronLeftRounded />
        </Link>
      )}
      <h4 className="p-4 text-center">Start a new conversation</h4>
      <div className="flex justify-center gap-2">
        <TextInput placeholder="Search for users..." />
        <Button className="btn-primary text-2xl">
          <MaterialSymbolsChatAddOnRounded
            onClick={() => {
              newConversationMutation.mutate();
            }}
          />
        </Button>
      </div>
    </div>
  );
}
