import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn-components/ui/dialog";
import { Button } from "@/shadcn-components/ui/button";
import { ConfirmationDialogProps } from "@/types/dialog";

export const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { isOpen, setIsOpen, dialogTitle, buttonText, handleClick } = props;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleClick}>{buttonText}</Button>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
