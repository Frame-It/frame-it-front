'use client';

import BottomButton from '@/components/common/bottom-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import React, { useState } from 'react';

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

  return (
    <div className={cn('flex h-full flex-1 flex-col justify-between')}>
      <div className={cn('flex flex-col gap-4')}>
        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>구인</label>
          <div className={cn('flex gap-2')}>
            <BottomButton
              variant={type === '모델' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'모델'}
              onClick={() => setType('모델')}
            />
            <BottomButton
              variant={type === '작가' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'작가'}
              onClick={() => setType('작가')}
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
          <Textarea
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            maxLength={24}
            placeholder="ex) 함께 촬영하실 모델분 구해요!"
            rows={2}
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
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="YYYY/MM/DD"
            />
            <Input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="00:00"
            />
            <div className={cn('flex gap-2')}>
              <BottomButton
                variant={period === '오전' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'오전'}
                onClick={() => setPeriod('오전')}
              />
              <BottomButton
                variant={period === '오후' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'오후'}
                onClick={() => setPeriod('오후')}
              />
              <BottomButton
                variant={period === '시간협의' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'시간협의'}
                onClick={() => setPeriod('시간협의')}
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
              />
              <BottomButton
                variant={locationType === '야외' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'야외'}
                onClick={() => setLocationType('야외')}
              />
            </div>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소"
            />
            <Input
              type="text"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="상세 주소를 입력해 주세요."
            />
          </div>
        </div>
      </div>

      <BottomButton
        onClick={handleNext}
        variant={'primary'}
        size={'large'}
        label={'다음'}
        disabled={!isNextEnabled}
      />
    </div>
  );
};

export default StepOne;
