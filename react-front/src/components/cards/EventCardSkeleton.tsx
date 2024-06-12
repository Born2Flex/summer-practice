import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// EventCardSkeleton component, displays the skeleton of an event card while loading
function EventCardSkeleton() {
    return (
        <div
            className="bg-gray-50/80 group/item hover:bg-gray-50 backdrop-blur-sm w-full h-auto 
            rounded-lg shadow-md flex card text-gray-700"
            style={{ transition: "background-color 0.3s" }}
        >
            <div className="w-2 bg-gray-300 flex items-center rounded-l-lg shadow-xl" />

            <div className="w-full flex flex-col">
                <div className="flex flex-1 p-4">
                    <div className='w-3/4'>
                        <h3 className="text-xl mb-1">
                            <Skeleton width={180} />
                        </h3>
                        <div className="text-xs flex items-center mb-4 gap-2">
                            <Skeleton width={100} />
                        </div>
                        <div className="text-xl font-thin">
                            <Skeleton width={60} />
                        </div>
                        <div className="flex items-center mt-4 gap-x-5">
                            <div className="flex text-xs gap-2">
                                <Skeleton width={80} />
                            </div>
                            <div className="flex text-xs gap-2">
                                <Skeleton width={80} />
                            </div>
                        </div>
                    </div>
                    <div className='flex w-1/4 max-h-full items-center justify-center'>
                        <div className='w-full h-full aspect-square flex align-middle items-center justify-center rounded-full'>
                            <Skeleton className='w-full aspect-square flex items-center justify-center rounded-full' containerClassName='w-full aspect-square' />
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100/40 group/link group-hover/item:bg-gray-200/60 p-3 flex items-center justify-between rounded-br-lg transition ease-in-out group-hover:hover:bg-gray-200">
                    <Skeleton width={100} />
                    <Skeleton width={20} />
                </div>
            </div>
        </div>
    );
}

export default EventCardSkeleton;
