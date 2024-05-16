import { faMagnifyingGlass, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@material-tailwind/react'
// import { AwesomeButton } from 'react-awesome-button'

function SearchInput() {
    return (
        <form className="flex items-center gap-1.5">
            <label htmlFor="voice-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FontAwesomeIcon icon={faMapLocationDot} className='text-gray-500 dark:text-gray-400' />
                </div>
                <input type="text" id="voice-search" className="bg-green-50/70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search Places..." required />
                <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                    </svg>
                </button>
            </div>
            <div className='w-auto'>
                <Button
                    color="green"
                    type="submit"
                    className="flex items-center gap-1.5"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onClick={undefined}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    Search
                </Button>
            </div>

            {/* <AwesomeButton type="primary" className='awesome-button short-awesome-button inline-flex ms-2 text-sm rounded-lg' after={<FontAwesomeIcon icon={faMagnifyingGlass} />} >Search</AwesomeButton> */}
        </form>
    )
}

export default SearchInput