import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shadcn-components/ui/sheet";
import { SetScheduleSheetProps } from "../../../../types/dialog";

export const SetScheduleSheet = (props: SetScheduleSheetProps) => {
  const { open, children } = props;
  const { isOpenSheet, setIsOpenSheet } = open;
  return (
    <div>
      <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>スケジュールの追加</SheetTitle>
            <SheetDescription>
              <p className="text-sm text-gray-500">
                スケジュールを追加するには、以下のフォームに必要な情報を入力してください。
              </p>
            </SheetDescription>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
};
