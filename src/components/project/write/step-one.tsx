'use client';

import BottomButton from '@/components/common/bottom-button';
import Icon from '@/components/common/icon';
import IconButton from '@/components/common/icon-button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import React, { useRef, useState } from 'react';
import '../../../styles/input.css';

const StepOne: React.FC = () => {
  const { setProjectInfo, nextStep } = useProjectRegisterStore();
  const [type, setType] = useState<'모델' | '작가' | null>(null);
  const [projectName, setProjectName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [period, setPeriod] = useState<'오전' | '오후' | '시간협의' | null>(
    null,
  );
  const [locationType, setLocationType] = useState<'실내' | '야외' | null>(
    null,
  );
  const [address, setAddress] = useState<string>('');
  const [detail, setDetail] = useState<string>('');

  const isNextEnabled =
    type &&
    projectName &&
    date &&
    time &&
    period &&
    locationType &&
    address &&
    detail;

  const handleNext = () => {
    if (isNextEnabled) {
      setProjectInfo({
        type,
        projectName,
        shootingDate: { date, time, period },
        location: { type: locationType, address, detail },
      });
      nextStep();
    } else {
      alert('모든 필드를 입력해주세요.');
    }
  };
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // 시간을 선택하는 창을 띄움
    }
  };
  const handleTimeClick = () => {
    if (timeInputRef.current) {
      timeInputRef.current.showPicker(); // 시간을 선택하는 창을 띄움
    }
  };

  return (
    <div className={cn('relative flex h-full flex-col justify-between')}>
      <div
        className={cn(
          'flex h-[calc(100%-64px)] flex-col gap-4 overflow-auto scrollbar-hide',
        )}
      >
        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>구인</label>
          <div className={cn('flex gap-2')}>
            <BottomButton
              variant={type === '모델' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'모델'}
              onClick={() => setType('모델')}
              className="border-gray-60"
            />
            <BottomButton
              variant={type === '작가' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'작가'}
              onClick={() => setType('작가')}
              className="border-gray-60"
            />
          </div>
        </div>
        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>
            프로젝트명
            <div className={cn('font-body-14 mt-[2px] text-gray-60')}>
              최대 24자까지 가능합니다.
            </div>
          </label>
          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            maxLength={24}
            placeholder="ex) 함께 촬영하실 모델분 구해요!"
          />
        </div>
        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>
            촬영일시
            <div className={cn('font-body-14 mt-[2px] text-gray-40')}>
              촬영날짜와 시각을 입력해주세요.
            </div>
          </label>
          <div className={cn('flex flex-col gap-2')}>
            <div className="flex gap-[6px]">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="YYYY/MM/DD"
                ref={dateInputRef}
                onClick={handleDateClick}
                className="font-body-14 flex h-[40px] w-full flex-1 flex-col items-center justify-center rounded-[8px] border bg-transparent p-[10.514px] text-center text-gray-20 placeholder-gray-60 focus:ring-0"
              />
              <IconButton
                icon={
                  <Icon
                    id={'calendar-icon'}
                    size={24}
                    className="text-gray-40"
                  />
                }
                onClick={handleDateClick}
              />
            </div>
            <div className="flex gap-[6px]">
              <Input
                type="time"
                placeholder="00:00"
                onChange={(e) => setTime(e.target.value)}
                ref={timeInputRef}
                onClick={handleTimeClick}
                className="font-body-14 flex h-[40px] w-full flex-1 flex-col items-center justify-center rounded-[8px] bg-transparent p-[10.514px] text-center text-gray-20 placeholder-gray-60 focus:ring-0"
              />

              <IconButton
                icon={
                  <Icon id={'time-icon'} size={24} className="text-gray-40" />
                }
                onClick={handleTimeClick}
              />
            </div>
            <div className={cn('flex gap-2')}>
              <BottomButton
                variant={period === '오전' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'오전'}
                onClick={() => setPeriod('오전')}
                className="border-gray-60"
              />
              <BottomButton
                variant={period === '오후' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'오후'}
                onClick={() => setPeriod('오후')}
                className="border-gray-60"
              />
              <BottomButton
                variant={period === '시간협의' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'시간협의'}
                onClick={() => setPeriod('시간협의')}
                className="border-gray-60"
              />
            </div>
          </div>
        </div>
        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>
            촬영장소
            <div className={cn('font-body-14 mt-[2px] text-gray-40')}>
              매칭 페이지에서는 시/군/구 까지만 공개됩니다.
            </div>
          </label>
          <div className={cn('flex flex-col gap-2')}>
            <div className={cn('flex gap-2')}>
              <BottomButton
                variant={locationType === '실내' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'실내'}
                onClick={() => setLocationType('실내')}
                className="border-gray-60"
              />
              <BottomButton
                variant={locationType === '야외' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'야외'}
                onClick={() => setLocationType('야외')}
                className="border-gray-60"
              />
            </div>
            <div className="flex gap-[6px]">
              <Input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="주소"
              />
              <IconButton
                icon={
                  <Icon id={'search-icon'} size={24} className="text-gray-40" />
                }
              />
            </div>

            <Input
              type="text"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="상세 주소를 입력해 주세요."
            />
          </div>
        </div>
      </div>

      <div
        className={cn(
          'absolute bottom-0 left-0 flex h-[64px] w-full items-center',
        )}
      >
        <BottomButton
          onClick={handleNext}
          variant={'primary'}
          size={'large'}
          label={'다음'}
          disabled={!isNextEnabled}
        />
      </div>
    </div>
  );
};

export default StepOne;
