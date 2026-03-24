// ===== app/data/menuData.ts =====
import type { MenuData } from '~/types/menu';

export const getMainMenuData = (): MenuData => ({
  titleKey: 'menu.main.title',
  subtitleKey: 'menu.main.subtitle',
  transactionId: 'CC00',
  programName: 'COMEN01',
  userRole: 'back-office',
  options: [
    {
      id: 'account-view',
      labelKey: 'menu.main.viewAccount',
      descriptionKey: 'menu.main.descriptions.viewAccount',
      path: '/accounts/view',
    },
    {
      id: 'account-update',
      labelKey: 'menu.main.updateAccount',
      descriptionKey: 'menu.main.descriptions.updateAccount',
      path: '/accounts/update',
    },
    {
      id: 'credit-card-list',
      labelKey: 'menu.main.listCards',
      descriptionKey: 'menu.main.descriptions.listCards',
      path: '/cards/list',
    },
    {
      id: 'credit-card-view',
      labelKey: 'menu.main.viewCard',
      descriptionKey: 'menu.main.descriptions.viewCard',
      path: '/cards/view',
    },
    {
      id: 'credit-card-update',
      labelKey: 'menu.main.updateCard',
      descriptionKey: 'menu.main.descriptions.updateCard',
      path: '/cards/update',
    },
    {
      id: 'transaction-list',
      labelKey: 'menu.main.listTransactions',
      descriptionKey: 'menu.main.descriptions.listTransactions',
      path: '/transactions/list',
    },
    {
      id: 'transaction-view',
      labelKey: 'menu.main.viewTransaction',
      descriptionKey: 'menu.main.descriptions.viewTransaction',
      path: '/transactions/view',
    },
    {
      id: 'transaction-add',
      labelKey: 'menu.main.addTransaction',
      descriptionKey: 'menu.main.descriptions.addTransaction',
      path: '/transactions/add',
    },
    {
      id: 'transaction-reports',
      labelKey: 'menu.main.transactionReports',
      descriptionKey: 'menu.main.descriptions.transactionReports',
      path: '/reports/transactions',
    },
    {
      id: 'bill-payment',
      labelKey: 'menu.main.billPayment',
      descriptionKey: 'menu.main.descriptions.billPayment',
      path: '/payments/bills',
    },
  ],
});

export const getAdminMenuData = (): MenuData => ({
  titleKey: 'menu.admin.title',
  subtitleKey: 'menu.admin.subtitle',
  transactionId: 'CADM',
  programName: 'COADM01',
  userRole: 'admin',
  options: [
    {
      id: 'user-list',
      labelKey: 'menu.admin.listUsers',
      descriptionKey: 'menu.admin.descriptions.listUsers',
      path: '/admin/users/list',
      adminOnly: true,
    },
    {
      id: 'user-add',
      labelKey: 'menu.admin.addUser',
      descriptionKey: 'menu.admin.descriptions.addUser',
      path: '/admin/users/add',
      adminOnly: true,
    },
    {
      id: 'user-update',
      labelKey: 'menu.admin.updateUser',
      descriptionKey: 'menu.admin.descriptions.updateUser',
      path: '/admin/users/update',
      adminOnly: true,
    },
    {
      id: 'user-delete',
      labelKey: 'menu.admin.deleteUser',
      descriptionKey: 'menu.admin.descriptions.deleteUser',
      path: '/admin/users/delete',
      adminOnly: true,
    },
  ],
});
