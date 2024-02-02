export enum CronExpressions {
  EVERY_MINUTE = '* * * * *',
  EVERY_5_MINUTES = '*/5 * * * *',
  EVERY_10_MINUTES = '*/10 * * * *',
  EVERY_HOUR = '0 * * * *',
  EVERY_DAY = '0 0 * * *',
  EVERY_WEEK = '0 0 * * 0',
  EVERY_MONTH = '0 0 1 * *',
  EVERY_YEAR = '0 0 1 1 *',
}
