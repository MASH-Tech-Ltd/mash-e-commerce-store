import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ProductRoutes } from '../modules/product/product.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { OrderRoutes } from '../modules/order/order.route';
import { CourierRoutes } from '../modules/courier/courier.route';
import { CustomerRoutes } from '../modules/customer/customer.route';
import { ThemeRoutes } from '../modules/theme/theme.route';
import { AnalyticsRoutes } from '../modules/analytics/analytics.route';
import { FraudCheckRoutes } from '../modules/fraudCheck/fraudCheck.route';
import { UserRoutes } from '../modules/user/user.route';
import { NotificationRoutes } from '../modules/notification/notification.route';
import { SecurityRoutes } from '../modules/security/security.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },

  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/courier',
    route: CourierRoutes,
  },
  {
    path: '/customers',
    route: CustomerRoutes,
  },
  {
    path: '/themes',
    route: ThemeRoutes,
  },
  {
    path: '/theme',
    route: ThemeRoutes, // alias for storefront: GET /api/v1/theme
  },
  {
    path: '/analytics',
    route: AnalyticsRoutes,
  },


  {
    path: '/fraud',
    route: FraudCheckRoutes,
  },
  {
    path: '/notifications',
    route: NotificationRoutes,
  },
  {
    path: '/security',
    route: SecurityRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to MashEasy Single Store' });
});

export default router;
