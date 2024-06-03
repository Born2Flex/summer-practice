import { Typography, Input, Popover, PopoverHandler, PopoverContent } from '@material-tailwind/react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout/pickersLayoutClasses';

function TimePicker({ date, label, error, ...rest }: { date: Date | undefined, label: string, error?: boolean, [key: string]: any }) {
    const [time, setTime] = useState<Dayjs | null>();

    return (
        <div className="mb-4">
            <label>
                <Typography
                    variant="small"
                    className="mb-2 block text-left font-medium text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {label}
                </Typography>
            </label>
            <div className='flex flex-row w-full gap-x-4'>
                <Popover placement="bottom">
                    <PopoverHandler>
                        <Input
                            className={`!border focus:ring-0 disabled:opacity-50 ${error ? '!border-red-600' : 'focus:!border-gray-900 !border-blue-gray-200'}`}
                            labelProps={{
                                className: "hidden",
                            }}
                            type='time'
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            crossOrigin={undefined}
                            value={time ? time.format('HH:mm') : ''}
                            readOnly
                            disabled={date === undefined}
                            {...rest}
                        />
                    </PopoverHandler>
                    <PopoverContent
                        className="z-50 max-h-[340px] overflow-auto custom-scrollbar"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <StaticTimePicker
                                onChange={(time) => setTime(time)}
                                value={time || dayjs()}
                                slotProps={{
                                    layout: {
                                        sx: {
                                            [`.${pickersLayoutClasses.actionBar}`]: {
                                                display: 'none',
                                            },
                                        },
                                    },
                                }}
                                orientation='landscape'
                                disablePast={date ? date.getDate() == new Date().getDate() : false}
                            />
                        </LocalizationProvider>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default TimePicker