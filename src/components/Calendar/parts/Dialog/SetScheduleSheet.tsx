import { Button } from "@/shadcn-components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/shadcn-components/ui/sheet";
import { SetScheduleSheetProps } from "../../types/dialog";

export const SetScheduleSheet = (props: SetScheduleSheetProps) => {
  const { open, children, onAddEvent } = props;
  const { isOpenSheet, setIsOpenSheet } = open;
  return (
    <div >
      <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
        <SheetContent side="left">
          <SheetHeader>
            <div className="flex justify-between">
              <SheetClose asChild>
                <Button variant="ghost" className="bg-white text-blue-700">
                  キャンセル
                </Button>
              </SheetClose>
              <Button
                onClick={onAddEvent}
                variant="ghost"
                className="bg-white text-blue-700"
              >
                保存
              </Button>
            </div>
          </SheetHeader>
          <hr className="my-2" />
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
};
