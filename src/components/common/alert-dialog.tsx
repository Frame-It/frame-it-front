'use client';

import * as React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

interface IAlertDialogProps {
  title: string;
  desc: string;
  cancleTitle: string;
  confirmTitle: string;
  open: boolean;
  onOpenChange: () => void;
  onCancle: () => void;
  onConfirm: () => void;
}

const AlertDialog: React.FunctionComponent<IAlertDialogProps> = ({
  title,
  desc,
  cancleTitle,
  confirmTitle,
  open,
  onOpenChange,
  onCancle,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[280px] rounded-[16px] px-[12px] py-[32px]">
        <div className="text-center">
          <DialogTitle className="font-semibold leading-[135%] text-gray-10">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-[150%]">
            {desc.split('\\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </DialogDescription>
        </div>
        <div className="flex w-full gap-x-2">
          <Button
            variant="ghost"
            className="flex-1 bg-gray-70 font-normal text-white"
            onClick={onCancle}
          >
            {cancleTitle}
          </Button>
          <Button className="flex-1 font-normal" onClick={onConfirm}>
            {confirmTitle}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
