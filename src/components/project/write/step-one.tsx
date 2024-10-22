'use client';

import BottomButton from '@/components/common/bottom-button';
import Icon from '@/components/common/icon';
import IconButton from '@/components/common/icon-button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { LocationType, ProfessionRole, TimeOption } from '@/types/project.type';
import { getCookie } from 'cookies-next';
import React, { useRef, useState } from 'react';

import { redirect } from 'next/navigation';
import '../../../styles/input.css';

const StepOne: React.FC = () => {
  const { projectInfo, setProjectInfo, nextStep } = useProjectRegisterStore();
  const type =
    (getCookie('identity') as ProfessionRole) === 'MODEL'
      ? 'PHOTOGRAPHER'
      : 'MODEL';
  const [projectName, setProjectName] = useState<string>(
    projectInfo.projectName,
  );
  const [date, setDate] = useState<string>(projectInfo.shootingDate.date);
  // const [time, setTime] = useState<string>(projectInfo.shootingDate.time);
  const [period, setPeriod] = useState<TimeOption | null>(
    projectInfo.shootingDate.period,
  );
  const [locationType, setLocationType] = useState<LocationType | null>(
    projectInfo.location.type,
  );
  // const [address, setAddress] = useState<string>(projectInfo.location.address);
  const [address] = useState<string>('SEOUL');

  const [detail, setDetail] = useState<string>(projectInfo.location.detail);

  const dateInputRef = useRef<HTMLInputElement>(null);
  // const timeInputRef = useRef<HTMLInputElement>(null);

  if (!type) redirect('/login');

  const isNextEnabled =
    type &&
    projectName &&
    date &&
    // time &&
    period &&
    locationType &&
    address &&
    detail;

  const handleNext = () => {
    if (isNextEnabled) {
      setProjectInfo({
        type,
        projectName,
        shootingDate: { date, period },
        location: { type: locationType, address, detail },
      });
      nextStep();
    } else {
      alert('모든 필드를 입력해주세요.');
    }
  };

  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };
  // const handleTimeClick = () => {
  //   if (timeInputRef.current) {
  //     timeInputRef.current.showPicker();
  //   }
  // };

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
              variant={type === 'MODEL' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'모델'}
              className="border-gray-60"
            />
            <BottomButton
              variant={type === 'PHOTOGRAPHER' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'작가'}
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
            {/* <div className="flex gap-[6px]">
              <Input
                value={time}
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
            </div> */}
            <div className={cn('flex gap-2')}>
              <BottomButton
                variant={period === 'MORNING' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'오전'}
                onClick={() => setPeriod('MORNING')}
                className="border-gray-60"
              />
              <BottomButton
                variant={period === 'AFTERNOON' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'오후'}
                onClick={() => setPeriod('AFTERNOON')}
                className="border-gray-60"
              />
              <BottomButton
                variant={period === 'TO_BE_DISCUSSED' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'시간협의'}
                onClick={() => setPeriod('TO_BE_DISCUSSED')}
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
                variant={locationType === 'INDOOR' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'실내'}
                onClick={() => setLocationType('INDOOR')}
                className="border-gray-60"
              />
              <BottomButton
                variant={locationType === 'OUTDOOR' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'야외'}
                onClick={() => setLocationType('OUTDOOR')}
                className="border-gray-60"
              />
            </div>
            <div className="flex gap-[6px]">
              <Input
                type="text"
                value={address}
                // onChange={(e) => setAddress(e.target.value)}
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
