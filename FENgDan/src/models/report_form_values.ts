export interface ReportFormValues {
  reportType: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  description: string;
}
export const REPORT_KEY = "report_key" as const;
