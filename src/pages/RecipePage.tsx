import React, { ReactElement, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * 
 * @returns 
 */
export default function RecipePage(): ReactElement {
	const location = useLocation();

  return (
		location.state != null
			? <div className="min-h-screen min-w-screen bg-[#282c34] flex flex-col px-20 py-40 space-y-4">
					<div className="grid place-items-center">
						<h2 className="text-3xl font-medium text-white">
							Recipe Query
						</h2>
					</div>
					<div className="grid place-items-center">
					</div>
				</div>
			: <div className="min-h-screen min-w-screen bg-[#282c34] grid place-items-center">
					<div className="flex flex-col space-y-4 place-items-center">
						<div className="text-white text-4xl">
							Page Unaccessible
						</div>
						<ButtonToStartPage />
					</div>
				</div>
  );
}

function ButtonToStartPage(): ReactElement {
	const navigate = useNavigate();

	return (
		<div 
			className="rounded-lg text-white px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium cursor-pointer grid place-items-center"
			onClick={() => {
				navigate('/');
			}}
		>
			Back to Start Page
		</div>
	)
}