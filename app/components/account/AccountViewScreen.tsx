// ===== app/components/account/AccountViewScreen.tsx =====
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  Divider,
  Chip,
  Stack,
  useTheme,
  alpha,
  InputAdornment,
  Collapse,
} from '@mui/material';
import {
  Search,
  AccountBalance,
  Person,
  CreditCard,
  Phone,
  CalendarToday,
  AttachMoney,
  KeyboardReturn,
  ExitToApp,
  Visibility,
  VisibilityOff,
  Info,
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
  Security,
  ContactPhone,
  Home,
  Badge,
  CreditScore,
} from '@mui/icons-material';
import { SystemHeader } from '~/components/layout/SystemHeader';
import { LoadingSpinner } from '~/components/ui/LoadingSpinner';
import { getCurrencyCode, getIntlLocale } from '~/utils/locale';
import type { AccountViewRequest, AccountViewResponse } from '~/types/account';
import type { Language } from '~/features/locale/localeSlice';

interface AccountViewScreenProps {
  onSearch: (request: AccountViewRequest) => void;
  onExit?: () => void;
  data?: AccountViewResponse | null;
  loading?: boolean;
  error?: string | null;
}

export function AccountViewScreen({
  onSearch,
  onExit,
  data,
  loading = false,
  error,
}: AccountViewScreenProps) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [accountId, setAccountId] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [showTestAccounts, setShowTestAccounts] = useState(false);
  const effectiveLanguage: Language = i18n.language === 'pt-BR' ? 'pt-BR' : 'en';
  const locale = getIntlLocale(effectiveLanguage);
  const currencyCode = getCurrencyCode(effectiveLanguage);
  const notAvailableLabel = t('common.labels.na');

  const testAccounts = [
    { id: '11111111111', descKey: 'account.view.testAccount1' },
    { id: '22222222222', descKey: 'account.view.testAccount2' },
    { id: '33333333333', descKey: 'account.view.testAccount3' },
    { id: '44444444444', descKey: 'account.view.testAccount4' },
  ];

  const handleAccountIdChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d{0,11}$/.test(value)) {
      setAccountId(value);
      setFieldError(null);
    }
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    
    if (!accountId.trim()) {
      setFieldError(t('account.errors.accountNotProvided'));
      return;
    }
    
    if (accountId.length !== 11 || accountId === '00000000000') {
      setFieldError(t('account.errors.accountInvalid'));
      return;
    }
    
    onSearch({ accountId });
  }, [accountId, onSearch]);

  const handleTestAccountSelect = useCallback((testAccountId: string) => {
    setAccountId(testAccountId);
    setFieldError(null);
    onSearch({ accountId: testAccountId });
    setShowTestAccounts(false);
  }, [onSearch]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'F3' || event.key === 'Escape') {
      event.preventDefault();
      onExit?.();
    }
  }, [onExit]);

  const formatCurrency = useCallback((amount?: number) => {
    if (amount === undefined || amount === null) return '';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }, [locale, currencyCode]);

  const formatDate = useCallback((dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return dateStr;
    }
  }, [locale]);

  const formatSSN = useCallback((ssn?: string) => {
    if (!ssn) return '';
    if (showSensitiveData) {
      return ssn;
    }
    return `***-**-${ssn.slice(-4)}`;
  }, [showSensitiveData]);

  const formatCardNumber = useCallback((cardNumber?: string) => {
    if (!cardNumber) return '';
    if (showSensitiveData) {
      return cardNumber;
    }
    const lastFour = cardNumber.replace(/\D/g, '').slice(-4);
    return `****-****-****-${lastFour}`;
  }, [showSensitiveData]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Y': return 'success';
      case 'N': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = useCallback((status?: string) => {
    if (status === 'Y') return t('common.labels.active');
    if (status === 'N') return t('common.labels.inactive');
    return t('common.labels.unknown');
  }, [t]);

  const getBalanceColor = (balance?: number) => {
    if (!balance) return 'text.primary';
    return balance > 0 ? 'error.main' : 'success.main';
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box onKeyDown={handleKeyDown} tabIndex={-1}>
        <SystemHeader
          transactionId="CAVW"
          programName="COACTVWC"
          title={t('account.view.title')}
          subtitle={t('account.view.subtitle')}
        />

        <Paper
          elevation={2}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.1)})`,
          }}
        >
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
            }}
          >
            <Typography variant="h5" fontWeight={600}>
              <AccountBalance sx={{ mr: 1, verticalAlign: 'middle' }} />
              {t('account.view.pageTitle')}
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
                mb: 3,
              }}
            >
              <Typography
                variant="body1"
                color="primary.main"
                fontWeight={600}
              >
                {t('account.view.accountNumber')}
              </Typography>
              
              <TextField
                value={accountId}
                onChange={handleAccountIdChange}
                placeholder="11111111111"
                size="medium"
                disabled={loading}
                error={!!fieldError}
                helperText={fieldError}
                inputProps={{
                  maxLength: 11,
                  style: { textAlign: 'center', fontSize: '1.1rem', fontWeight: 600 },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCard color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: 200,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 2,
                      },
                    },
                  },
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <LoadingSpinner size={20} /> : <Search />}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  fontWeight: 600,
                }}
              >
                {loading ? t('common.labels.searching') : t('common.buttons.search')}
              </Button>
            </Box>

            {import.meta.env.DEV && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Info />}
                  onClick={() => setShowTestAccounts(!showTestAccounts)}
                  sx={{ borderRadius: 2 }}
                >
                  {showTestAccounts ? t('account.view.hideTestAccounts') : t('account.view.showTestAccounts')}
                </Button>
              </Box>
            )}

            <Collapse in={showTestAccounts}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  mb: 3, 
                  bgcolor: alpha(theme.palette.info.main, 0.05),
                  borderColor: theme.palette.info.main,
                }}
              >
                <Typography variant="subtitle2" gutterBottom color="info.main" fontWeight={600}>
                  {t('account.view.testAccountsTitle')}
                </Typography>
                <Grid container spacing={1}>
                  {testAccounts.map((account) => (
                    <Grid item xs={12} sm={6} key={account.id}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleTestAccountSelect(account.id)}
                        sx={{
                          justifyContent: 'flex-start',
                          textAlign: 'left',
                          width: '100%',
                          p: 1,
                          borderRadius: 1,
                          textTransform: 'none',
                        }}
                      >
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {account.id}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t(account.descKey)}
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Collapse>

            {data && data.inputValid && !data.errorMessage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, gap: 2 }}>
                <Chip
                  label={getStatusLabel(data.accountStatus)}
                  color={getStatusColor(data.accountStatus) as any}
                  variant="filled"
                  sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                  icon={data.accountStatus === 'Y' ? <TrendingUp /> : <TrendingDown />}
                />
                {data.groupId && (
                  <Chip
                    label={`${data.groupId} ${t('common.labels.member')}`}
                    variant="outlined"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  />
                )}
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {data?.errorMessage && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {data.errorMessage}
              </Alert>
            )}

            {data?.infoMessage && !data?.errorMessage && (
              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                {data.infoMessage}
              </Alert>
            )}

            {data && data.inputValid && !data.errorMessage && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={showSensitiveData ? <VisibilityOff /> : <Visibility />}
                    onClick={() => setShowSensitiveData(!showSensitiveData)}
                    sx={{ borderRadius: 2 }}
                  >
                    {showSensitiveData ? t('account.view.hideSensitiveData') : t('account.view.showSensitiveData')}
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} lg={4}>
                    <Card elevation={1} sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="primary.main">
                          <AccountBalance sx={{ mr: 1, verticalAlign: 'middle' }} />
                          {t('account.view.accountInformation')}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Stack spacing={2.5}>
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.opened')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {formatDate(data.openDate)}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.expiry')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {formatDate(data.expirationDate)}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.reissue')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {formatDate(data.reissueDate)}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <Badge sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.accountGroup')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {data.groupId || notAvailableLabel}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <CreditCard sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.cardNumber')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
                              {formatCardNumber(data.cardNumber)}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} lg={4}>
                    <Card elevation={1} sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="primary.main">
                          <AttachMoney sx={{ mr: 1, verticalAlign: 'middle' }} />
                          {t('account.view.financialInformation')}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Stack spacing={2.5}>
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <AccountBalanceWallet sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.creditLimit')}
                            </Typography>
                            <Typography variant="h6" fontWeight={600} color="success.main">
                              {formatCurrency(data.creditLimit)}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <AccountBalanceWallet sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.cashCreditLimit')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500} color="info.main">
                              {formatCurrency(data.cashCreditLimit)}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.currentBalance')}
                            </Typography>
                            <Typography 
                              variant="h6" 
                              fontWeight={600}
                              color={getBalanceColor(data.currentBalance)}
                            >
                              {formatCurrency(data.currentBalance)}
                            </Typography>
                          </Box>
                          
                          <Divider />
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.currentCycleCredit')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500} color="success.main">
                              {formatCurrency(data.currentCycleCredit)}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <TrendingDown sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.currentCycleDebit')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500} color="error.main">
                              {formatCurrency(data.currentCycleDebit)}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} lg={4}>
                    <Card elevation={1} sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="primary.main">
                          <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                          {t('account.view.customerOverview')}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Stack spacing={2.5}>
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <Badge sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.customerId')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {data.customerId}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <Security sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.ssn')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
                              {formatSSN(data.customerSsn)}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.dateOfBirth')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {formatDate(data.dateOfBirth)}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <CreditScore sx={{ fontSize: 16, mr: 0.5 }} />
                              {t('account.view.ficoScore')}
                            </Typography>
                            <Chip
                              label={data.ficoScore}
                              color={
                                data.ficoScore && data.ficoScore >= 750 ? 'success' :
                                data.ficoScore && data.ficoScore >= 650 ? 'warning' : 'error'
                              }
                              variant="filled"
                              sx={{ fontWeight: 600 }}
                            />
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {t('account.view.primaryCardHolder')}
                            </Typography>
                            <Chip
                              label={data.primaryCardHolderFlag === 'Y' ? t('common.labels.yes') : t('common.labels.no')}
                              color={data.primaryCardHolderFlag === 'Y' ? 'success' : 'default'}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card elevation={1}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="primary.main">
                          <ContactPhone sx={{ mr: 1, verticalAlign: 'middle' }} />
                          {t('account.view.contactInfo')}
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                              {t('account.view.fullName')}
                            </Typography>
                            <Typography variant="h6" fontWeight={500}>
                              {[data.firstName, data.middleName, data.lastName]
                                .filter(Boolean)
                                .join(' ')}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12} md={4}>
                            <Stack spacing={1.5}>
                              <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                  <Phone sx={{ fontSize: 16, mr: 0.5 }} />
                                  {t('account.view.phone1')}
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                  {data.phoneNumber1 || notAvailableLabel}
                                </Typography>
                              </Box>
                              
                              <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                  <Phone sx={{ fontSize: 16, mr: 0.5 }} />
                                  {t('account.view.phone2')}
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                  {data.phoneNumber2 || notAvailableLabel}
                                </Typography>
                              </Box>
                            </Stack>
                          </Grid>
                          
                          <Grid item xs={12} md={4}>
                            <Stack spacing={1.5}>
                              <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                  {t('account.view.governmentId')}
                                </Typography>
                                  <Typography variant="body1" fontWeight={500}>
                                  {data.governmentId || notAvailableLabel}
                                </Typography>
                              </Box>
                              
                              <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                  {t('account.view.eftAccountId')}
                                </Typography>
                                  <Typography variant="body1" fontWeight={500}>
                                  {data.eftAccountId || notAvailableLabel}
                                </Typography>
                              </Box>
                            </Stack>
                          </Grid>
                        </Grid>
                        
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="subtitle2" gutterBottom color="text.secondary">
                          <Home sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                          {t('account.view.address')}
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {t('account.view.streetAddress')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {data.addressLine1}
                            </Typography>
                            {data.addressLine2 && (
                              <Typography variant="body1" fontWeight={500}>
                                {data.addressLine2}
                              </Typography>
                            )}
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {t('account.view.city')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {data.city || notAvailableLabel}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {t('account.view.state')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {data.state || notAvailableLabel}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {t('account.view.zipCode')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {data.zipCode || notAvailableLabel}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {t('account.view.country')}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {data.country || notAvailableLabel}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>

          <Box
            sx={{
              p: 2,
              bgcolor: alpha(theme.palette.grey[100], 0.5),
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={1}
            >
              <Typography variant="body2" color="text.secondary">
                <KeyboardReturn sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                {t('common.keyboard.enterSearch')}
              </Typography>
              
              <Button
                variant="outlined"
                size="small"
                startIcon={<ExitToApp />}
                onClick={onExit}
                disabled={loading}
                sx={{ borderRadius: 2 }}
              >
                {t('common.keyboard.f3Exit')}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
