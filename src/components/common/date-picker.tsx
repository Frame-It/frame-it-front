import { cn } from '@/lib/utils';
import { enGB } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/date-picker.css';
import Icon from './icon';

const DatePickerComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const displayDate = () => {
    if (startDate && endDate) {
      return startDate.getTime() === endDate.getTime()
        ? startDate.toLocaleDateString()
        : `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
    }
  };

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'text-[#4D4744]',
          'flex h-[46px] w-[328px] flex-shrink-0 items-center justify-between p-[16px]',
          'border-[1.314px] border-[#B4ADA9]',
          isOpen ? 'rounded-t-lg border-b' : 'rounded-lg border',
        )}
      >
        {startDate && endDate ? (
          displayDate()
        ) : (
          <span
            className={cn(
              'flex w-full justify-between text-center text-[16px] font-normal leading-[24px] text-[#B4ADA9]',
            )}
          >
            날짜를 선택해주세요
            <Icon id={'search-icon'} size={24} />
          </span>
        )}
      </button>
      {isOpen && (
        <div className="top-full">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate ?? undefined}
            endDate={endDate ?? undefined}
            selectsRange
            inline
            fixedHeight
            locale={enGB}
            renderYearContent={(year) => `${year}년`}
            renderCustomHeader={(props) => (
              <div
                className={cn(
                  'flex w-full items-center justify-center gap-[6px]',
                )}
              >
                <Icon
                  id={'prev-icon'}
                  size={18}
                  onClick={props.decreaseMonth}
                />
                <span
                  className={cn(
                    'text-center text-[16px] font-normal leading-[16px] text-[#7E7774]',
                  )}
                >
                  {props.date.getFullYear()}년 {props.date.getMonth()}월
                </span>
                <Icon
                  id={'next-icon'}
                  size={18}
                  onClick={props.increaseMonth}
                />
              </div>
            )}
            formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerComponent;
