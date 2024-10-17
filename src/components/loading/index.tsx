import { SkeletonCard } from "../skeleton/skeleton-card";

const LoadComponent = () => {
    return (
        <div className="flex items-center p-[50%] px-20 justify-center relative">
            <div className="mt-12 w-full flex-row items-center justify-center flex absolute z-10">
                <SkeletonCard/>
            </div>
        </div>
    );
}

export default LoadComponent;