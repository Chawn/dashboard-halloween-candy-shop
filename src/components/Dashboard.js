import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import Loading from './Layouts/Loading';
import TableLoader from './Layouts/TableLoader';
import BarChartLoader from './Layouts/BarChartLoader';

const thousands_separators = number => {
	if (number) {
		let numPaths = number.toString().split('.');
		numPaths[0] = numPaths[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		number = numPaths.join('.');
	}
	return number;
};

const Dashboard = () => {
	const [bestsellers, setBestsellers] = useState([]);
	const [periodYear, setPeriodYear] = useState(false);
	const [loading, setLoading] = useState(true);
	const [saleWeek, setSaleWeek] = useState([]);
	const [saleYear, setSaleYear] = useState([]);

	/* total and number of order (3 box on top of dashboard) */
	const [totalLastWeek, setTotalLastWeek] = useState(0);
	const [totalLastMonth, setTotalLastMonth] = useState(0);
	const [orderLastWeek, setOrderLastWeek] = useState(0);
	const [orderLastMonth, setOrderLastMonth] = useState(0);
	const [totalToday, setTotalToday] = useState(0);
	const [orderToday, setOrderToday] = useState(0);
	/* -------------------------------------------------------------  */

	function getDayName(number) {
		switch (parseInt(number)) {
			case 1:
				return 'Today';
			case 2:
				return 'Yesturday';
			default:
				return 'day ' + number;
		}
	}

	function getMonthName(monthNumber) {
		const date = new Date();
		date.setMonth(monthNumber - 1);
		return date.toLocaleString('en-US', { month: 'short' });
	}

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const access_token = localStorage.getItem('access_token');
				const response = await axios.get(
					'https://freddy.codesubmit.io/dashboard',
					{
						headers: { Authorization: `Bearer ${access_token}` },
					}
				);

				setBestsellers(response.data.dashboard.bestsellers);

				let arrChartDataWeek = [['id', '$']];
				let arrChartDataYear = [['id', '$']];
				let total_week = 0;
				let total_order_week = 0;

				const sales_over_time_week = Object.entries(
					response.data.dashboard.sales_over_time_week
				).map(([key, value]) => ({
					id: key,
					orders: value.orders,
					total: value.total,
				}));

				const sales_over_time_year = Object.entries(
					response.data.dashboard.sales_over_time_year
				).map(([key, value]) => ({
					id: key,
					orders: value.orders,
					total: value.total,
				}));

				// eslint-disable-next-line array-callback-return
				sales_over_time_week.map(({ id, total, orders }) => {
					total_week += parseInt(total);
					total_order_week += parseInt(orders);
					arrChartDataWeek.push([getDayName(id), parseInt(total)]);
				});

				// eslint-disable-next-line array-callback-return
				sales_over_time_year.map(({ id, total, orders }) => {
					arrChartDataYear.push([getMonthName(id), parseInt(total)]);
				});

				const today = new Date();
				const lastMonthNumber = (today.getMonth() - 1 + 12) % 12;

				setTotalToday(sales_over_time_week[0].total);
				setOrderToday(sales_over_time_week[0].orders);

				setTotalLastWeek(total_week);
				setOrderLastWeek(total_order_week);

				setTotalLastMonth(sales_over_time_year[lastMonthNumber].total);
				setOrderLastMonth(sales_over_time_year[lastMonthNumber].orders);

				setSaleWeek(arrChartDataWeek);
				setSaleYear(arrChartDataYear);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<>
			<div className='block py-6 w-[900px]'>
				<div className='elem__title mb-4 text-2xl'>Dashboard</div>
				<div className='elem__data flex flex-row space-x-8'>
					<div className='elem__data__card grow py-4 px-10 border border-gray-300'>
						<div className='card__title pb-2'>Today</div>
						<div className='card__detail text-lg font-medium'>
							${thousands_separators(totalToday)} /{' '}
							{thousands_separators(orderToday)} orders
						</div>
					</div>
					<div className='elem__data__card grow py-4 px-10 border border-gray-300'>
						<div className='card__title pb-2'>Last Week</div>
						<div className='card__detail text-lg font-medium'>
							${thousands_separators(totalLastWeek)} /{' '}
							{thousands_separators(orderLastWeek)} orders
						</div>
					</div>
					<div className='elem__data__card grow py-4 px-10 border border-gray-300'>
						<div className='card__title pb-2'>Last Month</div>
						<div className='card__detail text-lg font-medium'>
							${thousands_separators(totalLastMonth)} /{' '}
							{thousands_separators(orderLastMonth)} orders
						</div>
					</div>
				</div>
			</div>
			<div className='block py-6 w-[900px]'>
				<div className='elem__title mb-4 flex justify-between items-center'>
					<div className='text-2xl'>
						Revenue (last {periodYear ? '12 months' : '7 days'})
					</div>
					<div className='toggle'>
						<label className='relative inline-flex items-center cursor-pointer'>
							<input
								type='checkbox'
								value=''
								onChange={() => setPeriodYear(!periodYear)}
								className='sr-only peer'
							/>
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							<span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
								12 Months
							</span>
						</label>
					</div>
				</div>
				<div className='elem__data'>
					{loading ? (
						<div className='flex justify-center items-center'>
							<BarChartLoader height='300' />
						</div>
					) : periodYear ? (
						saleYear && (
							<Chart
								chartType='ColumnChart'
								data={saleYear}
								width={'100%'}
								height={'400px'}
							/>
						)
					) : (
						saleWeek && (
							<Chart
								chartType='ColumnChart'
								data={saleWeek}
								width={'100%'}
								height={'400px'}
							/>
						)
					)}
				</div>
			</div>
			<div className='block py-6'>
				<div className='elem__title mb-4 text-2xl'>Bestsellers</div>
				<div className='elem__data'>
					{loading ? (
						<div className=''>
							<TableLoader />
							<TableLoader />
							<TableLoader />
							<TableLoader />
							<TableLoader />
							<TableLoader />
							<TableLoader />
							<TableLoader />
							<TableLoader />
							<TableLoader />
							<TableLoader />
						</div>
					) : (
						<div className='relative overflow-x-auto'>
							<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
								<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
									<tr>
										<th scope='col' className='px-6 py-3'>
											Product name
										</th>
										<th scope='col' className='px-6 py-3'>
											# Units Sold
										</th>
										<th scope='col' className='px-6 py-3'>
											Revenue
										</th>
									</tr>
								</thead>
								<tbody>
									{loading ? (
										<div className='flex justify-center items-center'>
											<Loading height='60' />
										</div>
									) : (
										bestsellers &&
										bestsellers.map((item, index) => {
											return (
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
													<td className='px-6 py-4'>
														{thousands_separators(item.units)}
													</td>
													<td className='px-6 py-4'>
														${thousands_separators(item.revenue)}
													</td>
												</tr>
											);
										})
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Dashboard;
