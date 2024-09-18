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
      const options: Intl.DateTimeFormatOptions = {
        month: 'numeric',
        day: 'numeric',
      };

      return startDate.getTime() === endDate.getTime()
        ? startDate.toLocaleDateString('en-US', options)
        : `${startDate.toLocaleDateString('en-US', options)} ~ ${endDate.toLocaleDateString('en-US', options)}`;
    }
  };

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'text-[#4D4744]',
          'box-border flex h-[46px] w-[327px] flex-shrink-0 items-center justify-between p-[16px]',
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
            <Icon id={isOpen ? 'arrow-up-icon' : 'search-icon'} size={24} />
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
            renderDayContents={(day, date) =>
              renderDay(day, date, startDate, endDate)
            }
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
                  {props.date.getFullYear()}년 {props.date.getMonth() + 1}월
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

const renderDay = (
  day: number,
  date: Date,
  startDate: Date | null,
  endDate: Date | null,
) => {
  const dateStr = date.toDateString();
  const startStr = startDate?.toDateString();
  const endStr = endDate?.toDateString();
  const isStart = dateStr === startStr;
  const isEnd = dateStr === endStr;
  const isMiddle = startDate && endDate && date < endDate && date > startDate;
  const isOneDay = startDate && endDate && startStr === endStr;
  return (
    <div
      className={cn(
        isStart && endDate && 'pl-[3px]',
        isEnd && startDate && 'pr-[3px]',
        'flex-1',
      )}
    >
      <div
        className={cn(
          !isOneDay &&
            isStart &&
            endDate &&
            '-ml-[11px] -mr-[11px] rounded-l-[48px] pr-[3px]',
          !isOneDay &&
            isEnd &&
            startDate &&
            '-ml-[11px] -mr-[11px] rounded-r-[48px] pl-[3px]',
          !isOneDay &&
            startDate &&
            endDate &&
            (isStart || isMiddle || isEnd) &&
            'flex h-[27px] flex-1 items-center justify-center bg-gray-80',
          isMiddle && '-mx-[11px]',
        )}
      >
        <span
          className={cn(
            'flex items-center justify-center',
            (isEnd || (isStart && !endDate)) &&
              'h-[23px] w-[23px] rounded-[48px] bg-gray-20 text-white',
          )}
        >
          {day}
        </span>
      </div>
    </div>
  );
};

export default DatePickerComponent;
