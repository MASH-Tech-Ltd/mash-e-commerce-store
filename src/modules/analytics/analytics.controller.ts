import { Request, Response } from 'express';
import { Order } from '../order/order.model';
import { Customer } from '../customer/customer.model';
import ApiResponse from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const days = parseInt(req.query.days as string) || 30;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Totals based on timeframe
  const totalOrders = await Order.countDocuments({ createdAt: { $gte: startDate } });
  
  // Total customers all-time
  const totalCustomers = await Customer.countDocuments({});
  
  const revenueResult = await Order.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
  ]);
  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

  // Compute chart data dynamically
  const orders = await Order.find({ createdAt: { $gte: startDate } }).sort({ createdAt: 1 });
  
  const chartDataMap: Record<string, { name: string; revenue: number; orders: number }> = {};
  
  orders.forEach(order => {
    let dateStr;
    if (days <= 30) {
      dateStr = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
      dateStr = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    let currentData = chartDataMap[dateStr];
    if (!currentData) {
      currentData = { name: dateStr, revenue: 0, orders: 0 };
      chartDataMap[dateStr] = currentData;
    }
    
    currentData.orders += 1;
    if (order.status?.toLowerCase() === 'delivered') {
      currentData.revenue += order.totalPrice;
    }
  });

  const chartData = Object.values(chartDataMap);

  // Compute a real conversion rate relative to the data we have
  const computedConversionRate = totalCustomers > 0 ? ((totalOrders / totalCustomers) * 100).toFixed(1) : 0;

  ApiResponse.sendSuccess(res, 200, 'Dashboard stats retrieved', {
    totalOrders,
    totalCustomers,
    totalRevenue,
    chartData,
    conversionRate: Number(computedConversionRate)
  });
});

export const AnalyticsController = {
  getDashboardStats,
};
