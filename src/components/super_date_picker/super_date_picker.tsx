import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import { usePopup } from '../popup/popup';
import { ProviderSuperDatePicker } from './context/super_date_picker_context';
import DatePickerRange from './date_picker_range/date_picker_range';
import DatePopup from './date_popup/date_popup';
import QuickSelectPopup from './quick_select_popup/quick_select_popup';
import UpdateButton from './update_button/update_button';
import { isEndDateSome, isStartDateSome, isValidDate } from './utils';

export type StatusDate = 'ready' | 'update' | 'notvalid';

const InnerSuperDatePicker = () => {
  const [startDate, setStartDate] = useState(() => dayjs());
  const [endDate, setEndDate] = useState(() => dayjs());

  const [isValidTime, setValidTime] = useState(() => true);
  const [hasChanged, setHasChanged] = useState(() => false);

  const [statusDate, setStatusDate] = useState<StatusDate>('ready');
  const [isLoading, setIsLoading] = useState(() => false);

  const setTime = (end: Dayjs, start: Dayjs) => {
    if (isStartDateSome(startDate, start) && isEndDateSome(endDate, end)) return;

    validateDates(end, start);
    setStartDate(() => start);
    setEndDate(() => end);
    setHasChanged(() => true);
  };

  const handleSetStartDate = (start: Dayjs) => {
    if (isStartDateSome(startDate, start)) return;

    validateDates(endDate, start);
    setStartDate(() => start);
  };

  const handleSetEndDate = (end: Dayjs) => {
    if (isEndDateSome(endDate, end)) return;

    validateDates(end, startDate);
    setEndDate(() => end);
  };

  const validateDates = (end: Dayjs, start: Dayjs) => {
    const isValid = isValidDate(start, end);
    setValidTime(() => isValid);
    if (isValid === true) setStatusDate(() => 'update');
    else setStatusDate(() => 'notvalid');
  };

  const getTime = () => {
    // setHasChanged(() => false);
    return { startDate, endDate };
  };

  const {
    handleOpenPopup: openOneCalendar,
    handleClosePopup: closeOneCalendar,
    reference: referenceOnCalendar,
    renderFnContentElement: popupWrapperOverOnDate,
  } = usePopup({});

  const dateOnePopup = popupWrapperOverOnDate(
    <DatePopup handleDate={handleSetEndDate} currentTime={endDate} />,
  );

  const refOutsideCalendar = useOutsideClick(() => closeOneCalendar());

  const handleOpenOneCalendar = () => {
    openOneCalendar();
    closeQuickSelect();
    closeOTwoCalendar();
  };

  const {
    handleOpenPopup: openOTwoCalendar,
    handleClosePopup: closeOTwoCalendar,
    reference: referenceTwoCalendar,
    renderFnContentElement: popupWrapperOverTwoDate,
  } = usePopup({});

  const dateOTwoPopup = popupWrapperOverTwoDate(
    <DatePopup handleDate={handleSetStartDate} currentTime={startDate} />,
  );

  const refOutsideTwoCalendar = useOutsideClick(() => closeOTwoCalendar());

  const handleOpenTwoCalendar = () => {
    openOTwoCalendar();
    closeOneCalendar();
    closeQuickSelect();
  };

  const {
    handleOpenPopup: openQuickSelect,
    handleClosePopup: closeQuickSelect,
    reference: referenceQuickSelect,
    renderFnContentElement: popupWrapperOverQuickSelect,
  } = usePopup({});

  const quickSelect = popupWrapperOverQuickSelect(<QuickSelectPopup setTime={setTime} />);

  const handleOpenQuickSelect = () => {
    openQuickSelect();
    closeOneCalendar();
    closeOTwoCalendar();
  };

  const handleCloseQuickSelect = () => {
    closeQuickSelect();
  };

  const refOutsideQuickSelect = useOutsideClick(() => handleCloseQuickSelect());

  const handleClickUpdateButton = () => {
    if (statusDate === 'notvalid' || isLoading) return;

    setIsLoading(() => true);
    setStatusDate(() => 'update');

    setTimeout(() => {
      setStatusDate(() => 'ready');
      setIsLoading(() => false);
    }, 2000);
  };

  const updateButton = (
    <UpdateButton isLoading={isLoading} onClick={handleClickUpdateButton} statusDate={statusDate} />
  );

  return (
    <div
      className='wrapper_spd'
      ref={(ref) => {
        refOutsideCalendar.current = ref;
        refOutsideQuickSelect.current = ref;
        refOutsideTwoCalendar.current = ref;
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        ref={(ref) => {
          referenceQuickSelect(ref);
        }}
      >
        <DatePickerRange
          refOneCalendar={(ref: any) => referenceOnCalendar(ref)}
          refTwoCalendar={(ref: any) => referenceTwoCalendar(ref)}
          getTime={getTime}
          startDate={startDate}
          endDate={endDate}
          openOneCalendar={handleOpenOneCalendar}
          openTwoCalendar={handleOpenTwoCalendar}
          openQuickSelect={handleOpenQuickSelect}
          isValidTime={isValidTime && hasChanged}
        />
        <div>{updateButton}</div>
      </div>

      {dateOnePopup}
      {dateOTwoPopup}
      {quickSelect}
    </div>
  );
};

const SuperDatePicker = () => {
  return (
    <ProviderSuperDatePicker>
      <InnerSuperDatePicker />
    </ProviderSuperDatePicker>
  );
};

export default SuperDatePicker;
