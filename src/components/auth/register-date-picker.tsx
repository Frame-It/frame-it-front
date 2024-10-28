'use client';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { ko } from 'date-fns/locale';
import {
  useUserRegisterSetBirth,
  useUserRegisterStore,
} from '@/store/user-regist-store';

const DatePlaceHolder = 'font-body-14 text-gray-40';

export function RegisterDatePicker() {
  const birth = useUserRegisterStore((state) => state.userInfo.birth);
  const setBirth = useUserRegisterSetBirth();

  const year = birth?.getFullYear();
  const month = format(birth || new Date(), 'MM');
  const day = format(birth || new Date(), 'dd');

  return (
    <Popover key={birth?.getDate()}>
      <PopoverTrigger asChild>
        <div className="relative mx-auto flex w-full max-w-[255px] items-center justify-between">
          <span>{birth ? year : <p className={DatePlaceHolder}>YYYY</p>}</span>
          <div className={DatePlaceHolder}>/</div>
          <span>{birth ? month : <p className={DatePlaceHolder}>MM</p>}</span>
          <div className={DatePlaceHolder}>/</div>
          <span>{birth ? day : <p className={DatePlaceHolder}>DD</p>}</span>
        </div>
      </PopoverTrigger>

      <PopoverContent align="center" className="w-[300px] p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={birth || undefined}
          defaultMonth={birth || undefined}
          onSelect={(selectedDate: Date | undefined) => {
            if (!selectedDate) return;
            setBirth(selectedDate);
          }}
          fromYear={1960}
          toYear={new Date().getFullYear()}
          locale={ko}
        />
      </PopoverContent>
    </Popover>
  );
}
