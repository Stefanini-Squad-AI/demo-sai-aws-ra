export interface MenuOption {
  id: string;
  labelKey: string;
  descriptionKey?: string;
  path?: string;
  action?: string;
  disabled?: boolean;
  requiredRole?: 'admin' | 'back-office' | 'both';
  adminOnly?: boolean;
}

export interface MenuData {
  titleKey: string;
  subtitleKey?: string;
  transactionId: string;
  programName: string;
  userRole: 'admin' | 'back-office';
  options: MenuOption[];
}
