export interface ICronService {
  parseArticles: () => Promise<void>
  runCronJobs: () => Promise<void>
}
