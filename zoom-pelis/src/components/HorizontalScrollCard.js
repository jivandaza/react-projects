import React from 'react';
import Card from './Card';

const HorizontalScrollCard = ({
    data = [],
    heading,
    trending,
    media_type,
    isLoading
}) => {

    const loadingCarts = new Array(5).fill(null);

    return (
        <div className='container mx-auto px-3 my-10'>
            <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>{heading}</h2>
            <div className=' relative'>
                <div className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6'>
                    {
                        isLoading ? (
                            loadingCarts.map((data, index) => {
                                return (
                                    <div className='bg-neutral-600 w-full min-w-[230px] max-w-[230px] h-80 animate-pulse'>
                                    </div>
                                )
                            })
                        ) : (
                            data.map((data, index) => {
                                return (
                                    <Card
                                        key={data.id+"heading"+index}
                                        data={data} index={index+1}
                                        trending={trending}
                                        media_type={media_type}
                                    />
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default HorizontalScrollCard;