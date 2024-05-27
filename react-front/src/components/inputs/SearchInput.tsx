import { faMagnifyingGlass, faMapLocationDot, faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@material-tailwind/react'

function SearchInput() {
    return (
        <div className="flex items-center gap-1.5">
            <label htmlFor="voice-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FontAwesomeIcon icon={faMapLocationDot} className='text-gray-500 dark:text-gray-400' />
                </div>
                <input type="text" name='search-value' id="voice-search" className="bg-green-50/70 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search Places..." required />
                <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <FontAwesomeIcon icon={faMicrophone} className='text-gray-500' />
                </button>
            </div>
            <div className='w-auto z-20'>
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
        </div>
    )
}

export default SearchInput