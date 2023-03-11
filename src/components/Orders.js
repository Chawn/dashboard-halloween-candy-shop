import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Layouts/Pagination';
import UpworkJobLoader from './Layouts/UpworkJobLoader';

const thousands_separators = number => {
	if (number) {
		let numPaths = number.toString().split('.');
		numPaths[0] = numPaths[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		number = numPaths.join('.');
	}
	return number;
};
function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}
function formatDate(date) {
	date = new Date(date);
	return [
		padTo2Digits(date.getDate()),
		padTo2Digits(date.getMonth() + 1),
		date.getFullYear().toString().slice(-2),
	].join('/');
}

const Orders = () => {
	const [orders, setOrders] = useState('');
	const [loading, setLoading] = useState(true);
	const [inputSearch, setInputSeach] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 50; 
  const lastPage = 20;  // Manual count page

	const searchData = async () => {
		setLoading(true);
		try {
			const access_token = localStorage.getItem('access_token');
			const response = await axios.get(
				`https://freddy.codesubmit.io/orders?page=2${
					inputSearch && '&q=' + inputSearch
				}`,
				{
					headers: { Authorization: `Bearer ${access_token}` },
				}
			);

			setOrders(response.data.orders);
			// console.log(response);
      setLoading(false);
		} catch (error) {
			// console.log(error);
      setLoading(false);
		}
	};


	const submitSearch = e => {
		e.preventDefault();
		searchData();
	};

	// let lastIndex = orders.length;
	// let firstIndex = 1;
	// if (orders.length > dataPerPage) {
	// 	lastIndex = currentPage * dataPerPage;
	// 	firstIndex = lastIndex - dataPerPage;
	// }

	const paginate = pageNumber => setCurrentPage(pageNumber);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const access_token = localStorage.getItem('access_token');
				const response = await axios.get(
					`https://freddy.codesubmit.io/orders?page=${currentPage}${inputSearch && '&q=' + inputSearch}`,
					{
						headers: { Authorization: `Bearer ${access_token}` },
					}
				);

				setOrders(response.data.orders);
				// console.log(response.data.orders)
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
	}, [currentPage, inputSearch]);

	return (
		<>
			<div className='block py-6'>
				<div className='elem__title mb-4 flex justify-between'>
					<div className='text-2xl'>ORDERS</div>

					<div className='search-container ml-4'>
						<form onSubmit={submitSearch} className='flex'>
							<div className='relative text-gray-400 focus-within:text-gray-400'>
								<span className='absolute inset-y-0 left-0 flex items-center pl-2'>
									<button
										type='submit'
										className='p-1 focus:outline-none focus:shadow-outline'
									>
										<svg
											fill='none'
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											viewBox='0 0 24 24'
											className='w-5 h-5'
										>
											<path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
										</svg>
									</button>
								</span>
								<input
									type='text'
									onChange={e => setInputSeach(e.target.value)}
									autoComplete='search'
									placeholder='Search..'
									className='placeholder-opacity-70 block py-1.5 pl-10 pr-0 w-full min-w-[300px] text-base text-gray-900 bg-white border border-gray-300 focus:ring-0 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-0'
								/>
							</div>

							{/* <button
								type='submit'
								className=' btn bg-slate-200 border border-slate-300 hover:bg-slate-100 active:bg-slate-300 text-slate-900 px-4 py-1.5  mb-0 mr-0 text-base font-medium '
							>
								ค้นหา
							</button> */}
						</form>
					</div>
				</div>
				<div className='elem__data'>
					<div className='py-4'>
						<Pagination
							itemPerPage={dataPerPage}
							totalItem={orders.length < 50 ? orders.length : 1000}
							lastPage={lastPage}
							paginate={paginate}
							currentPage={currentPage}
						/>
					</div>
					<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th scope='col' className='px-6 py-3'>
									Product name
								</th>
								<th scope='col' className='px-6 py-3'>
									Date
								</th>
								<th scope='col' className='px-6 py-3'>
									Price
								</th>
								<th scope='col' className='px-6 py-3'>
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td>
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
									</td>
									<td>
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
									</td>
									<td>
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
									</td>
									<td>
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
										<UpworkJobLoader height='60' width='300' />
									</td>
								</tr>
							) : (
								orders &&
								orders.map((item, index) => (
									<tr
										key={index}
										className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
									>
										<th
											scope='row'
											className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
										>
											{item.product.name}
										</th>
										<td className='px-6 py-4'>{formatDate(item.created_at)}</td>
										<td className='px-6 py-4'>
											{item.currency} {thousands_separators(item.total)}
										</td>
										<td className='px-6 py-4'>
											<div
												className={
													item.status === 'processing'
														? 'text-red-500'
														: item.status === 'delivered'
														? 'text-green-500'
														: ''
												}
											>
												{item.status}
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>

					<Pagination
						itemPerPage={dataPerPage}
						totalItem={1000}
						paginate={paginate}
						currentPage={currentPage}
					/>
				</div>
			</div>
		</>
	);
};

export default Orders;
