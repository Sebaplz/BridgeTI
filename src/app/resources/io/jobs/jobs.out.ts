export interface Internship {
  internshipId: number;
  companyId: number;
  company: Company;
  title: string;
  description: string;
  location: string;
  createdAt: string;
}

export interface Company {
  companyId: number;
  userId: number;
  name: string;
  contactName: string;
  contactPhone: string;
  user: any | null;
}
