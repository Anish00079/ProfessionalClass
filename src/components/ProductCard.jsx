import React from 'react';

export default function ProductCard(props){
    return (
        <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 overflow-hidden border border-gray-100 group">
            {/* Image Section */}
            <div className="w-full h-56 sm:h-64 bg-gradient-to-tr from-gray-100 to-white overflow-hidden">
                <img 
                    src={props.image} 
                    alt={props.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Price badge */}
            <div className="absolute left-4 top-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">${props.price}</div>
            
            {/* Content Section */}
            <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">{props.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{props.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-semibold text-gray-700">⭐ 4.9</div>
                    <button 
                        onClick={props.onAddToCart}
                        className="ml-4 px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow hover:opacity-95 transition"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}
