import { Typography, Select, Option } from '@material-tailwind/react'
import { useState } from 'react'

function SingleSelectInput({ eventTypes }: { eventTypes: string[] }) {
    const [typeValue, setTypeValue] = useState<string>('party');

    return (
        <div className="mb-4">
            <label>
                <Typography
                    variant="small"
                    className="mb-2 block text-left font-medium text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Event Type
                </Typography>
            </label>
            <input type="text" value={typeValue} name='event-type' readOnly className='hidden' required />
            <div className='flex flex-row w-full gap-x-4'>
                <Select
                    size="lg"
                    className='!border focus:ring-0 focus:!border-gray-900 !border-blue-gray-200'
                    labelProps={{
                        className: "hidden",
                    }}
                    value={typeValue}
                    onChange={(val) => setTypeValue(val as string)}
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    {eventTypes.map((type) => (
                        <Option key={type} value={type} className='text-left'>{type.charAt(0).toUpperCase() + type.slice(1)}</Option>
                    ))}
                </Select>
            </div>
        </div>
    )
}

export default SingleSelectInput