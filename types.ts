
import React from 'react';

export interface TreatmentPlanItem {
  id: string;
  goal: string;
  responsible: string;
  date: string;
  status: string;
  steps: string;
}

// دراسة الحالة
export interface CaseStudyData {
  id: string;
  studentName: string;
  grade: string;
  studentId: string;
  reportDate: string;
  mainProblem: string;
  problemType: string;
  severity: string;
  analysis: string;
  treatmentPlan: TreatmentPlanItem[];
  // New fields
  directorateName?: string;
  schoolName?: string;
  residencePlace?: string;
  referralReason?: string;
  referralDate?: string;
  referralSource?: string;
  parentsStatus?: string;
  brotherCount?: number;
  sisterCount?: number;
  birthOrder?: number;
  livingWith?: string;
  economicStatus?: string;
  fatherWork?: string;
  motherWork?: string;
  familyHealth?: string;
  studentHealth?: string;
  studentView?: string;
  parentsView?: string;
  teacherView?: string;
  counselorView?: string;
  diagnosis?: string;
  recommendations?: string;
}

export interface AbsenceRecord {
  id: string;
  studentName: string;
  grade: string;
  division: string;
  date: string;
  count: number;
  reason: string;
  action: string;
  notes: string;
}

export interface DelayRecord {
  id: string;
  studentName: string;
  grade: string;
  division: string;
  date: string;
  arrivalTime: string;
  reason: string;
  action: string;
  notes: string;
}

export interface ProblemRecord {
  id: string;
  studentName: string;
  grade: string;
  date: string;
  type: string;
  description: string;
  action: string;
  result: string;
  isHot: boolean;
}

export interface ActivityRecord {
  id: string;
  type: string;
  title: string;
  date: string;
  targetGroup: string;
  goals: string;
  participants: string;
  partner: string;
  notes: string;
}

export interface InterviewRecord {
  id: string;
  type: string;
  name: string;
  studentName: string;
  date: string;
  time: string;
  topic: string;
  summary: string;
  results: string;
}

export interface ClassroomGuidanceRecord {
  id: string;
  grade: string;
  division: string;
  date: string;
  period: string;
  topic: string;
  goals: string;
  methods: string;
  notes: string;
}

export interface DropoutRecord {
  id: string;
  studentName: string;
  grade: string;
  dropoutDate: string;
  reasons: string;
  procedures: string;
  results: string;
}

export interface GroupMember {
  id: number;
  name: string;
}

export interface GroupSession {
  id: number;
  date: string;
  topic: string;
  goals: string;
  procedures: string;
  notes: string;
}

export interface GroupGuidanceRecord {
  id: string;
  title: string;
  goal: string;
  startDate: string;
  endDate: string;
  targetGroup: string;
  members: GroupMember[];
  sessions: GroupSession[];
}

export interface DaySchedule {
  day: string;
  date: string;
  sessions: string[];
}

export interface DailyReportRecord {
  id: string;
  weekNumber: string;
  schedule: DaySchedule[];
}

// ✅ Agenda Record
export interface AgendaRecord {
  id: string;
  date: string;
  title: string; // النشاط
  targetGroup: string; // الصف_الشعبة_الفئة
  goal: string; // الهدف
  output: string; // المخرج
  responsible: string; // الشخص_المسؤول
  notes: string; // التكرار_ملاحظات
  status: string; // الانجاز (تم، جزئي، لم ينجز)
  executionNotes: string; // ملاحظات_اخرى
}

export interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  colorClass: string;
  iconColorClass: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  school_name: string;
  directorate_name: string;
  phone: string;
  header_url: string;
  footer_url: string;
}

export interface Student {
  id: string;
  name: string;
  grade?: string;
  division?: string;
  nationalId?: string;
}

export interface AppNotification {
  id: string;
  message: string;
  type: 'add' | 'update' | 'delete' | 'info';
  timestamp: Date;
  isRead: boolean;
}

export interface DataContextType {
  absences: AbsenceRecord[];
  delays: DelayRecord[];
  problems: ProblemRecord[];
  activities: ActivityRecord[];
  interviews: InterviewRecord[];
  classroomGuidance: ClassroomGuidanceRecord[];
  dropouts: DropoutRecord[];
  groupGuidance: GroupGuidanceRecord[];
  dailyReports: DailyReportRecord[];
  caseStudies: CaseStudyData[];
  agendaItems: AgendaRecord[];
  students: Student[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;

  addAbsence: (record: AbsenceRecord) => Promise<void>;
  updateAbsence: (record: AbsenceRecord) => Promise<void>;
  deleteAbsence: (id: string) => Promise<void>;
  deleteAbsences: (ids: string[]) => Promise<void>; // Bulk Delete

  addDelay: (record: DelayRecord) => Promise<void>;
  updateDelay: (record: DelayRecord) => Promise<void>;
  deleteDelay: (id: string) => Promise<void>;
  deleteDelays: (ids: string[]) => Promise<void>; // Bulk Delete

  addProblem: (record: ProblemRecord) => Promise<void>;
  updateProblem: (record: ProblemRecord) => Promise<void>;
  deleteProblem: (id: string) => Promise<void>;
  deleteProblems: (ids: string[]) => Promise<void>; // Bulk Delete

  addActivity: (record: ActivityRecord) => Promise<void>;
  updateActivity: (record: ActivityRecord) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  deleteActivities: (ids: string[]) => Promise<void>; // Bulk Delete

  addInterview: (record: InterviewRecord) => Promise<void>;
  updateInterview: (record: InterviewRecord) => Promise<void>;
  deleteInterview: (id: string) => Promise<void>;
  deleteInterviews: (ids: string[]) => Promise<void>; // Bulk Delete

  addClassroomGuidance: (record: ClassroomGuidanceRecord) => Promise<void>;
  updateClassroomGuidance: (record: ClassroomGuidanceRecord) => Promise<void>;
  deleteClassroomGuidance: (id: string) => Promise<void>;
  deleteClassroomGuidances: (ids: string[]) => Promise<void>; // Bulk Delete

  addDropout: (record: DropoutRecord) => Promise<void>;
  updateDropout: (record: DropoutRecord) => Promise<void>;
  deleteDropout: (id: string) => Promise<void>;
  deleteDropouts: (ids: string[]) => Promise<void>; // Bulk Delete

  addGroupGuidance: (record: GroupGuidanceRecord) => Promise<void>;
  updateGroupGuidance: (record: GroupGuidanceRecord) => Promise<void>;
  deleteGroupGuidance: (id: string) => Promise<void>;
  deleteGroupGuidances: (ids: string[]) => Promise<void>; // Bulk Delete

  addDailyReport: (record: DailyReportRecord) => Promise<void>;
  updateDailyReport: (record: DailyReportRecord) => Promise<void>;
  deleteDailyReport: (id: string) => Promise<void>;
  deleteDailyReports: (ids: string[]) => Promise<void>; // Bulk Delete

  addCaseStudy: (record: CaseStudyData) => Promise<void>;
  updateCaseStudy: (record: CaseStudyData) => Promise<void>;
  deleteCaseStudy: (id: string) => Promise<void>;
  deleteCaseStudies: (ids: string[]) => Promise<void>; // Bulk Delete

  addAgendaItem: (record: AgendaRecord) => Promise<void>;
  updateAgendaItem: (record: AgendaRecord) => Promise<void>;
  deleteAgendaItem: (id: string) => Promise<void>;
  deleteAgendaItems: (ids: string[]) => Promise<void>; // Bulk Delete

  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  updateStudent: (student: Student) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  deleteStudents: (ids: string[]) => Promise<void>; // Bulk Delete
  importStudents: (students: Omit<Student, 'id'>[]) => Promise<void>;
}
