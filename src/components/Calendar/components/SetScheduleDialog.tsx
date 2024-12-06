import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shadcn-components/ui/dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";
type Props = {
  open: {
    isOpenDialog: boolean;
    setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
  };
  children: ReactNode;
};
export const SetScheduleDialog = (props: Props) => {
  const { open, children } = props;
  const { isOpenDialog, setIsOpenDialog } = open;
  return (
    <div>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>set schedule</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};
