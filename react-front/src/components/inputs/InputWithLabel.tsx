import { Typography, Input } from '@material-tailwind/react'
import { ReactNode } from 'react'

function InputWithLabel({ label, children, error, ...rest }: { label: string, children?: ReactNode, error?: boolean, [key: string]: any }) {
    function onBlur(event: any) {
        if (event.target.min && event.target.value < event.target.min) {
            event.target.value = event.target.min;
        }
    }
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

                <Input
                    className={`!border focus:ring-0 ${error ? '!border-red-600' : 'focus:!border-gray-900 !border-blue-gray-200'}`}
                    labelProps={{
                        className: "hidden",
                    }}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onBlur={onBlur}
                    crossOrigin={undefined}
                    {...rest}
                />
                {children}
            </div>
        </div>
    )
}

export default InputWithLabel