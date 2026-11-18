export type CollegeCategory =
  | 'NIAT Partner'
  | 'Public / Govt'
  | 'IIT'
  | 'NIT'
  | 'IIIT'
  | 'GFTI'
  | 'Private';

export interface AdmissionStep {
  id: string;
  title: string;
  owner: 'NIAT' | 'UNIVERSITY';
  dueDays: number;
  requiredDoc: string;
  completed: boolean;
}

export interface PartnerUniversity {
  id: string;
  name: string;
  city: string;
  category: CollegeCategory;
  accreditation: string;
  counsellingTrack: string;
  deadlineDate: string;
  searchAliases?: string;
  universitySpecificSteps: Omit<AdmissionStep, 'completed'>[];
}

export const NIAT_CORE_STEPS: Omit<AdmissionStep, 'completed'>[] = [
  {
    id: 'niat_1',
    title: 'NAT Application & ₹1,200 Fee Submitted',
    owner: 'NIAT',
    dueDays: 0,
    requiredDoc: 'NAT Hall Ticket / Payment Receipt (apply.niatindia.com)',
  },
  {
    id: 'niat_2',
    title: '90-Min NAT Assessment Qualified',
    owner: 'NIAT',
    dueDays: 2,
    requiredDoc: 'NAT Scorecard (Psychometric, Critical Thinking & Math)',
  },
  {
    id: 'niat_3',
    title: '1:1 NIAT Career Counselling & Campus Lock',
    owner: 'NIAT',
    dueDays: 5,
    requiredDoc: 'Signed Campus Preference & Parent Consent Form',
  },
  {
    id: 'niat_4',
    title: 'Confirm NIAT Upskilling Seat Enrolment',
    owner: 'NIAT',
    dueDays: 10,
    requiredDoc: 'NIAT Upskilling First Installment Receipt',
  },
];

function makeInstitution(
  id: string,
  name: string,
  city: string,
  category: CollegeCategory,
  accreditation: string,
  counsellingTrack: string,
  deadlineDate: string,
  stateDocRequirement: string,
  searchAliases = ''
): PartnerUniversity {
  return {
    id,
    name,
    city,
    category,
    accreditation,
    counsellingTrack,
    deadlineDate,
    searchAliases,
    universitySpecificSteps: [
      {
        id: 'uni_1',
        title: `Complete ${name} Admission / Counselling Registration`,
        owner: 'UNIVERSITY',
        dueDays: 4,
        requiredDoc: `Application / Counselling Registration Slip & 10th/12th PCM Marksheets`,
      },
      {
        id: 'uni_2',
        title: `Upload Transfer Certificate (TC) & Entrance / Domicile Documents`,
        owner: 'UNIVERSITY',
        dueDays: 9,
        requiredDoc: stateDocRequirement,
      },
      {
        id: 'uni_3',
        title: `Pay Seat Acceptance / Tuition Fee & Complete Physical Verification`,
        owner: 'UNIVERSITY',
        dueDays: 14,
        requiredDoc: `Fee Receipt, Aadhaar KYC & Provisional Seat Allotment Letter`,
      },
    ],
  };
}

const RAW_INSTITUTIONS: PartnerUniversity[] = [
  // ==================== PUBLIC / STATE & CENTRAL GOVT UNIVERSITIES ====================
  makeInstitution('pub_amu_zhcet', 'Aligarh Muslim University (AMU) - Zakir Husain College of Engineering & Technology', 'Aligarh, Uttar Pradesh', 'Public / Govt', 'Central Public University (UGC & NAAC A+)', 'AMUEEE Counselling', '2026-12-08', 'AMUEEE Rank Card, Original TC/Migration, Character Certificate & 12th Marksheet', 'ZHCET Aligarh'),
  makeInstitution('pub_auce_vizag', 'Andhra University College of Engineering (AUCE)', 'Visakhapatnam, Andhra Pradesh', 'Public / Govt', 'State Public University (NAAC A++)', 'AP EAPCET Convener Counselling', '2026-12-08', 'AP EAPCET Allotment Order, Original TC, Study Certificates (6th–12th) & Residence', 'AU Vizag'),
  makeInstitution('pub_anna_ceg', 'Anna University - College of Engineering, Guindy (CEG)', 'Chennai, Tamil Nadu', 'Public / Govt', 'State Public University (NAAC A++)', 'TNEA Single-Window Counselling', '2026-12-07', 'TNEA Provisional Allotment, Original TC, Community & Nativity Certificate', 'CEG Guindy Chennai'),
  makeInstitution('pub_anna_mit', 'Anna University - Madras Institute of Technology (MIT)', 'Chromepet (Chennai), Tamil Nadu', 'Public / Govt', 'State Public University (NAAC A++)', 'TNEA Single-Window Counselling', '2026-12-07', 'TNEA Provisional Allotment, Original TC, Community & 12th Marksheet', 'MIT Chennai'),
  makeInstitution('pub_aec_guwahati', 'Assam Engineering College (AEC)', 'Guwahati, Assam', 'Public / Govt', 'State Government Engineering College (ASTU)', 'Assam CEE Counselling', '2026-12-09', 'Assam CEE Allotment Letter, PRC (Assam Domicile), Original TC & 12th Marksheet'),
  makeInstitution('pub_bce_bhagalpur', 'Bhagalpur College of Engineering (BCE)', 'Bhagalpur, Bihar', 'Public / Govt', 'State Government Engineering College (BEU Patna)', 'UGEAC (BCECEB / JEE Main Counselling)', '2026-12-09', 'UGEAC Allotment Letter, Bihar Residential Certificate, Original CLC & Migration'),
  makeInstitution('pub_bms_govt_aided', 'B.M.S. College of Engineering (Govt-Aided)', 'Bengaluru, Karnataka', 'Public / Govt', 'VTU Govt-Aided Autonomous & NAAC A++', 'KCET / COMEDK Counselling', '2026-12-09', 'KCET/COMEDK Allotment Order, Original TC & Karnataka Study Certificate', 'Bangalore'),
  makeInstitution('pub_bit_sindri', 'Birsa Institute of Technology (BIT) Sindri', 'Dhanbad, Jharkhand', 'Public / Govt', 'State Government Engineering Institute (JUT)', 'JCECEB (JEE Main State Quota)', '2026-12-09', 'JCECEB Allotment Letter, Jharkhand Local Resident Certificate & Original CLC'),
  makeInstitution('pub_biet_jhansi', 'Bundelkhand Institute of Engineering & Technology (BIET)', 'Jhansi, Uttar Pradesh', 'Public / Govt', 'State Government Autonomous Institute (AKTU)', 'UPTAC (JEE Main State Counselling)', '2026-12-09', 'UPTAC Allotment Letter, Original TC/Migration & UP Domicile Certificate'),
  makeInstitution('pub_cet_trivandrum', 'College of Engineering Trivandrum (CET)', 'Thiruvananthapuram, Kerala', 'Public / Govt', 'State Government Engineering College (KTU)', 'KEAM Centralized Allotment (CEE Kerala)', '2026-12-08', 'KEAM Allotment Memo, Original TC, Conduct & Nativity/Non-Creamy Layer Certificate', 'Trivandrum'),
  makeInstitution('pub_coep_pune', 'COEP Technological University (College of Engineering Pune)', 'Pune, Maharashtra', 'Public / Govt', 'State Unitary Public Technological University', 'MHT-CET / JEE Main CAP Counselling', '2026-12-07', 'MHT-CET CAP Allotment, Leaving Certificate, Domicile & Caste Validity'),
  makeInstitution('pub_cusat_kochi', 'Cochin University of Science and Technology (CUSAT) - School of Engineering', 'Kochi, Kerala', 'Public / Govt', 'State Public University (NAAC A+)', 'CUSAT CAT Counselling', '2026-12-08', 'CUSAT CAT Rank Card, Original TC, Migration & Kerala Nativity Certificate', 'Cochin'),
  makeInstitution('pub_dcrust_murthal', 'Deenbandhu Chhotu Ram University of Science and Technology (DCRUST)', 'Murthal (Sonipat), Haryana', 'Public / Govt', 'State Public University (NAAC A)', 'HSTES (JEE Main State Counselling)', '2026-12-09', 'HSTES Allotment Letter, Parivar Pehchan Patra (PPP), Character & Migration'),
  makeInstitution('pub_dtu_delhi', 'Delhi Technological University (DTU)', 'New Delhi, Delhi', 'Public / Govt', 'State Public University (NAAC A+)', 'JAC Delhi (JEE Main Counselling)', '2026-12-06', 'JAC Delhi Seat Allotment, JEE Main Rank Card, 12th Marksheet & Medical Form', 'DCE Delhi College of Engineering'),
  makeInstitution('pub_ddu_nadiad', 'Dharmsinh Desai University (DDU) - Faculty of Technology', 'Nadiad, Gujarat', 'Public / Govt', 'State Grant-in-Aid / Public University', 'GUJCET / JEE Main ACPC Counselling', '2026-12-09', 'ACPC Admission Slip, GUJCET Scorecard, School Leaving Certificate & 12th Marks'),
  makeInstitution('pub_gce_aurangabad', 'Government College of Engineering, Aurangabad', 'Chhatrapati Sambhajinagar, Maharashtra', 'Public / Govt', 'State Government Autonomous Institute', 'MHT-CET CAP Counselling', '2026-12-09', 'MHT-CET CAP Allotment, Leaving Certificate & Maharashtra Domicile'),
  makeInstitution('pub_gce_karad', 'Government College of Engineering, Karad', 'Karad, Maharashtra', 'Public / Govt', 'State Government Autonomous Institute', 'MHT-CET CAP Counselling', '2026-12-09', 'MHT-CET CAP Allotment, Leaving Certificate & Maharashtra Domicile'),
  makeInstitution('pub_gce_salem', 'Government College of Engineering, Salem', 'Salem, Tamil Nadu', 'Public / Govt', 'State Government Engineering College', 'TNEA Single-Window Counselling', '2026-12-09', 'TNEA Provisional Allotment, Original TC & Community Certificate'),
  makeInstitution('pub_gct_coimbatore', 'Government College of Technology (GCT), Coimbatore', 'Coimbatore, Tamil Nadu', 'Public / Govt', 'State Government Autonomous College', 'TNEA Single-Window Counselling', '2026-12-08', 'TNEA Provisional Allotment, Original TC, Community & Nativity Certificate'),
  makeInstitution('pub_gec_thrissur', 'Government Engineering College (GEC), Thrissur', 'Thrissur, Kerala', 'Public / Govt', 'State Government Engineering College (KTU)', 'KEAM Centralized Allotment (CEE Kerala)', '2026-12-09', 'KEAM Allotment Memo, Original TC, Conduct & Nativity Certificate'),
  makeInstitution('pub_mec_kochi', 'Government Model Engineering College (MEC), Thrikkakara', 'Kochi, Kerala', 'Public / Govt', 'State Government Autonomous Institute (KTU)', 'KEAM Centralized Allotment (CEE Kerala)', '2026-12-08', 'KEAM Allotment Memo, Original TC, Conduct & Nativity Certificate', 'Cochin'),
  makeInstitution('pub_gbpuat_pantnagar', 'Govind Ballabh Pant University of Agriculture and Technology - College of Technology', 'Pantnagar, Uttarakhand', 'Public / Govt', 'State Public University', 'JEE Main / UKSEE State Counselling', '2026-12-09', 'JEE Main Scorecard, Original TC/Migration & Uttarakhand Domicile'),
  makeInstitution('pub_hbtu_kanpur', 'Harcourt Butler Technical University (HBTU)', 'Kanpur, Uttar Pradesh', 'Public / Govt', 'State Public Technical University', 'HBTU Counselling (JEE Main Score)', '2026-12-07', 'JEE Main Rank Card, HBTU Allotment, Original TC/Migration & UP Domicile', 'HBTI Kanpur'),
  makeInstitution('pub_igit_sarang', 'Indira Gandhi Institute of Technology (IGIT), Sarang', 'Dhenkanal, Odisha', 'Public / Govt', 'State Government Autonomous Institute', 'OJEE Counselling (JEE Main Rank)', '2026-12-09', 'OJEE Allotment Letter, Resident/Nativity Certificate, CLC & Conduct Certificate'),
  makeInstitution('pub_igdtuw_delhi', 'Indira Gandhi Delhi Technical University for Women (IGDTUW)', 'New Delhi, Delhi', 'Public / Govt', 'State Public Women Technical University', 'JAC Delhi (JEE Main Counselling)', '2026-12-06', 'JAC Delhi Seat Allotment, JEE Main Rank Card, 12th Marksheet & Medical Form'),
  makeInstitution('pub_ict_mumbai', 'Institute of Chemical Technology (ICT), Mumbai', 'Mumbai, Maharashtra', 'Public / Govt', 'Deemed Public University (Elite Status / NAAC A++)', 'MHT-CET / JEE Main CAP Counselling', '2026-12-06', 'MHT-CET/JEE Scorecard, CAP Allotment, Leaving Certificate & Medical Form', 'UDCT Bombay'),
  makeInstitution('pub_iet_davv', 'Institute of Engineering & Technology (IET-DAVV), Indore', 'Indore, Madhya Pradesh', 'Public / Govt', 'State Public University Institute (NAAC A+)', 'MP DTE Counselling (JEE Main)', '2026-12-08', 'MP DTE Allotment Letter, Original TC, Migration & MP Domicile Certificate'),
  makeInstitution('pub_iet_lucknow', 'Institute of Engineering and Technology (IET), Lucknow', 'Lucknow, Uttar Pradesh', 'Public / Govt', 'State Government Constituent College (AKTU)', 'UPTAC (JEE Main State Counselling)', '2026-12-08', 'UPTAC Allotment Letter, Original TC/Migration & UP Domicile Certificate'),
  makeInstitution('pub_jcbose_ymca', 'J.C. Bose University of Science and Technology, YMCA', 'Faridabad, Haryana', 'Public / Govt', 'State Public University (NAAC A+)', 'HSTES (JEE Main State Counselling)', '2026-12-08', 'HSTES Allotment Letter, Parivar Pehchan Patra (PPP), Character & Migration', 'YMCA Faridabad'),
  makeInstitution('pub_jec_jabalpur', 'Jabalpur Engineering College (JEC)', 'Jabalpur, Madhya Pradesh', 'Public / Govt', 'State Government Autonomous Institute', 'MP DTE Counselling (JEE Main)', '2026-12-09', 'MP DTE Allotment Letter, Original TC, Migration & MP Domicile Certificate'),
  makeInstitution('pub_jadavpur_univ', 'Jadavpur University - Faculty of Engineering & Technology (FET)', 'Kolkata, West Bengal', 'Public / Govt', 'State Public University (NIRF Top-15 / NAAC A+)', 'WBJEE Centralized & JU-Diganta Decentralised Counselling', '2026-12-06', 'WBJEE Rank Card, JU-Diganta Form, WB Domicile (10-Yr), Original TC & Medical Form', 'Jadhavpur University Calcutta JU'),
  makeInstitution('pub_jgec_jalpaiguri', 'Jalpaiguri Government Engineering College (JGEC)', 'Jalpaiguri, West Bengal', 'Public / Govt', 'State Government Autonomous College (MAKAUT)', 'WBJEE Centralized Counselling', '2026-12-09', 'WBJEE Allotment Letter, WB Domicile Certificate, Original TC & 12th Marksheet'),
  makeInstitution('pub_jmi_delhi', 'Jamia Millia Islamia (JMI) - Faculty of Engineering & Technology', 'New Delhi, Delhi', 'Public / Govt', 'Central Public University (NAAC A++)', 'JMI Counselling (JEE Main Paper-1 Score)', '2026-12-07', 'JEE Main Scorecard, JMI Application/Offer Letter, Original TC/Migration & Medical Form'),
  makeInstitution('pub_jntua_anantapur', 'Jawaharlal Nehru Technological University Anantapur (JNTUA College of Engineering)', 'Anantapur, Andhra Pradesh', 'Public / Govt', 'State Public Technological University', 'AP EAPCET Convener Counselling', '2026-12-08', 'AP EAPCET Allotment Order, Original TC & Study Certificates'),
  makeInstitution('pub_jntuh_hyd', 'Jawaharlal Nehru Technological University Hyderabad (JNTUH UCESTH)', 'Hyderabad, Telangana', 'Public / Govt', 'State Public Technological University (NAAC A+)', 'TG EAPCET Convener Counselling', '2026-12-07', 'TG EAPCET Allotment Order, Original TC, Study Certificates (6th–12th) & Income/Caste'),
  makeInstitution('pub_jntuk_kakinada', 'Jawaharlal Nehru Technological University Kakinada (JNTUK UCEK)', 'Kakinada, Andhra Pradesh', 'Public / Govt', 'State Public Technological University (NAAC A+)', 'AP EAPCET Convener Counselling', '2026-12-08', 'AP EAPCET Allotment Order, Original TC & Study Certificates'),
  makeInstitution('pub_kgec_kalyani', 'Kalyani Government Engineering College (KGEC)', 'Kalyani, West Bengal', 'Public / Govt', 'State Government Engineering College (MAKAUT)', 'WBJEE Centralized Counselling', '2026-12-09', 'WBJEE Allotment Letter, WB Domicile Certificate, Original TC & 12th Marksheet'),
  makeInstitution('pub_knit_sultanpur', 'Kamla Nehru Institute of Technology (KNIT)', 'Sultanpur, Uttar Pradesh', 'Public / Govt', 'State Government Autonomous Institute (AKTU)', 'UPTAC (JEE Main State Counselling)', '2026-12-09', 'UPTAC Allotment Letter, Original TC/Migration & UP Domicile Certificate'),
  makeInstitution('pub_ldce_ahmedabad', 'L. D. College of Engineering (LDCE)', 'Ahmedabad, Gujarat', 'Public / Govt', 'State Government Engineering College (GTU)', 'GUJCET / JEE Main ACPC Counselling', '2026-12-08', 'ACPC Admission Slip, GUJCET/JEE Scorecard, School Leaving Certificate & 12th Marks'),
  makeInstitution('pub_mmmut_gorakhpur', 'Madan Mohan Malaviya University of Technology (MMMUT)', 'Gorakhpur, Uttar Pradesh', 'Public / Govt', 'State Public Technical University (NAAC A)', 'MMMUT Counselling (JEE Main Score)', '2026-12-08', 'JEE Main Rank Card, MMMUT Allotment, Original TC/Migration & UP Domicile'),
  makeInstitution('pub_mits_gwalior', 'Madhav Institute of Technology & Science (MITS), Gwalior', 'Gwalior, Madhya Pradesh', 'Public / Govt', 'State Govt-Aided Deemed / Autonomous (NAAC A++)', 'MP DTE Counselling (JEE Main)', '2026-12-09', 'MP DTE Allotment Letter, Original TC, Migration & MP Domicile Certificate'),
  makeInstitution('pub_msu_baroda', 'Maharaja Sayajirao University of Baroda (MSU) - Faculty of Technology & Engineering', 'Vadodara, Gujarat', 'Public / Govt', 'State Public University (NAAC A+)', 'GUJCET / JEE Main ACPC Counselling', '2026-12-08', 'ACPC Admission Slip, GUJCET Scorecard, School Leaving Certificate & Migration'),
  makeInstitution('pub_mbm_jodhpur', 'MBM University', 'Jodhpur, Rajasthan', 'Public / Govt', 'State Public Engineering University', 'REAP (JEE Main / 12th Merit Counselling)', '2026-12-09', 'REAP Allotment Letter, Original TC/Migration & Rajasthan Domicile'),
  makeInstitution('pub_mit_muzaffarpur', 'Muzaffarpur Institute of Technology (MIT)', 'Muzaffarpur, Bihar', 'Public / Govt', 'State Government Engineering Institute (BEU Patna)', 'UGEAC (BCECEB / JEE Main Counselling)', '2026-12-09', 'UGEAC Allotment Letter, Bihar Residential Certificate, Original CLC & Migration', 'MIT Muzaffarpur'),
  makeInstitution('pub_nsut_delhi', 'Netaji Subhas University of Technology (NSUT)', 'New Delhi, Delhi', 'Public / Govt', 'State Public University', 'JAC Delhi (JEE Main Counselling)', '2026-12-06', 'JAC Delhi Seat Allotment, JEE Main Rank Card, 12th Marksheet & Medical Form', 'NSIT Delhi'),
  makeInstitution('pub_outr_bbs', 'Odisha University of Technology and Research (OUTR / CET Bhubaneswar)', 'Bhubaneswar, Odisha', 'Public / Govt', 'State Public Technological University', 'OJEE Counselling (JEE Main Rank)', '2026-12-08', 'OJEE Allotment Letter, Resident/Nativity Certificate, CLC & Conduct Certificate', 'CET Bhubaneswar'),
  makeInstitution('pub_osmania_uce', 'Osmania University - University College of Engineering (UCE)', 'Hyderabad, Telangana', 'Public / Govt', 'State Public University (NAAC A+)', 'TG EAPCET Convener Counselling', '2026-12-07', 'TG EAPCET Allotment Order, Original TC, Study Certificates (6th–12th) & Bonafide', 'OUCE Hyderabad'),
  makeInstitution('pub_rtu_kota', 'Rajasthan Technical University (RTU), Kota', 'Kota, Rajasthan', 'Public / Govt', 'State Public Technical University', 'REAP (JEE Main / 12th Merit Counselling)', '2026-12-09', 'REAP Allotment Letter, Original TC/Migration & Rajasthan Domicile'),
  makeInstitution('pub_spce_mumbai', 'Sardar Patel College of Engineering (SPCE)', 'Mumbai, Maharashtra', 'Public / Govt', 'State Govt-Aided Autonomous Institute', 'MHT-CET CAP Counselling', '2026-12-08', 'MHT-CET CAP Allotment, Leaving Certificate & Maharashtra Domicile'),
  makeInstitution('pub_sgsits_indore', 'Shri Govindram Seksaria Institute of Technology and Science (SGSITS)', 'Indore, Madhya Pradesh', 'Public / Govt', 'State Govt-Aided Autonomous Institute (NAAC A)', 'MP DTE Counselling (JEE Main)', '2026-12-08', 'MP DTE Allotment Letter, Original TC, Migration & MP Domicile Certificate'),
  makeInstitution('pub_svuce_tirupati', 'Sri Venkateswara University College of Engineering (SVUCE)', 'Tirupati, Andhra Pradesh', 'Public / Govt', 'State Public University (NAAC A+)', 'AP EAPCET Convener Counselling', '2026-12-08', 'AP EAPCET Allotment Order, Original TC & Study Certificates'),
  makeInstitution('pub_tkm_kollam', 'TKM College of Engineering', 'Kollam, Kerala', 'Public / Govt', 'State Govt-Aided Autonomous College (KTU)', 'KEAM Centralized Allotment (CEE Kerala)', '2026-12-09', 'KEAM Allotment Memo, Original TC, Conduct & Nativity Certificate'),
  makeInstitution('pub_uiet_pu', 'University Institute of Engineering and Technology (UIET), Panjab University', 'Chandigarh, Chandigarh', 'Public / Govt', 'Central/State Public University (NAAC A++)', 'JAC Chandigarh (JEE Main Counselling)', '2026-12-07', 'JAC Chandigarh Allotment, JEE Main Rank Card, Character & Migration Certificate'),
  makeInstitution('pub_calcutta_univ', 'University of Calcutta - University College of Science & Technology (Rajabazar)', 'Kolkata, West Bengal', 'Public / Govt', 'State Public University (NAAC A)', 'WBJEE Centralized Counselling', '2026-12-08', 'WBJEE Allotment Letter, WB Domicile Certificate, Original TC & 12th Marksheet', 'Calcutta University'),
  makeInstitution('pub_uvce_blr', 'University Visvesvaraya College of Engineering (UVCE)', 'Bengaluru, Karnataka', 'Public / Govt', 'State Public Autonomous Institute (IIT-Model)', 'KCET Counselling', '2026-12-07', 'KCET Allotment Order, Original TC, Karnataka Study Certificate & 12th Marks', 'Bangalore'),
  makeInstitution('pub_vjti_mumbai', 'Veermata Jijabai Technological Institute (VJTI)', 'Mumbai, Maharashtra', 'Public / Govt', 'State Govt-Aided Autonomous Institute', 'MHT-CET CAP Counselling', '2026-12-07', 'MHT-CET CAP Allotment, Leaving Certificate, Domicile & Caste Validity'),
  makeInstitution('pub_vssut_burla', 'Veer Surendra Sai University of Technology (VSSUT), Burla', 'Sambalpur, Odisha', 'Public / Govt', 'State Public Technical University', 'OJEE Counselling (JEE Main Rank)', '2026-12-08', 'OJEE Allotment Letter, Odisha Resident Certificate, CLC & Conduct Certificate', 'UCE Burla'),
  makeInstitution('pub_walchand_sangli', 'Walchand College of Engineering (WCE), Sangli', 'Sangli, Maharashtra', 'Public / Govt', 'State Govt-Aided Autonomous Institute (NAAC A)', 'MHT-CET / JEE Main CAP Counselling', '2026-12-08', 'MHT-CET CAP Allotment, Leaving Certificate, Domicile & Caste Validity'),

  // ==================== ALL 23 IITs ====================
  makeInstitution('iit_bhu', 'Indian Institute of Technology (BHU) Varanasi', 'Varanasi, Uttar Pradesh', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Seat Allotment, Class 12 Marksheet & Medical Certificate', 'Benaras Banaras'),
  makeInstitution('iit_ism', 'Indian Institute of Technology (ISM) Dhanbad', 'Dhanbad, Jharkhand', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Allotment Letter, Original TC & Category Certificate'),
  makeInstitution('iit_bhilai', 'Indian Institute of Technology Bhilai', 'Bhilai, Chhattisgarh', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Seat Acceptance Receipt & 12th PCM Marksheet'),
  makeInstitution('iit_bbs', 'Indian Institute of Technology Bhubaneswar', 'Bhubaneswar, Odisha', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Allotment Letter, Original CLC/Migration & Medical Form'),
  makeInstitution('iit_bombay', 'Indian Institute of Technology Bombay', 'Mumbai, Maharashtra', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Rank Card, JoSAA Seat Allotment, 12th Marksheet & Aadhaar', 'Mumbai'),
  makeInstitution('iit_delhi', 'Indian Institute of Technology Delhi', 'New Delhi, Delhi', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Rank Card, JoSAA Allotment Letter, Medical Fitness & 12th Marksheet'),
  makeInstitution('iit_dharwad', 'Indian Institute of Technology Dharwad', 'Dharwad, Karnataka', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Allotment Letter, Original TC & 12th Marksheet'),
  makeInstitution('iit_gandhinagar', 'Indian Institute of Technology Gandhinagar', 'Gandhinagar, Gujarat', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Rank Card, JoSAA Allotment Letter, Migration & Medical Certificate'),
  makeInstitution('iit_goa', 'Indian Institute of Technology Goa', 'Ponda, Goa', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Allotment Letter & 12th Board Marksheet'),
  makeInstitution('iit_guwahati', 'Indian Institute of Technology Guwahati', 'Guwahati, Assam', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Rank Card, JoSAA Allotment Letter, Migration & Medical Certificate'),
  makeInstitution('iit_hyderabad', 'Indian Institute of Technology Hyderabad', 'Hyderabad, Telangana', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Rank Card, JoSAA Allotment Letter, Original TC & 12th Marksheet'),
  makeInstitution('iit_indore', 'Indian Institute of Technology Indore', 'Indore, Madhya Pradesh', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Seat Allotment, Original TC & Medical Certificate'),
  makeInstitution('iit_jammu', 'Indian Institute of Technology Jammu', 'Jammu, Jammu & Kashmir', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Allotment Letter & 12th PCM Marksheet'),
  makeInstitution('iit_jodhpur', 'Indian Institute of Technology Jodhpur', 'Jodhpur, Rajasthan', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Rank Card, JoSAA Allotment Letter, Migration & Medical Certificate'),
  makeInstitution('iit_kanpur', 'Indian Institute of Technology Kanpur', 'Kanpur, Uttar Pradesh', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Rank Card, JoSAA Allotment Letter, 12th Marksheet & Medical Certificate'),
  makeInstitution('iit_kharagpur', 'Indian Institute of Technology Kharagpur', 'Kharagpur, West Bengal', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Rank Card, JoSAA Allotment Letter, Original Migration & Medical Form', 'KGP'),
  makeInstitution('iit_madras', 'Indian Institute of Technology Madras', 'Chennai, Tamil Nadu', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Rank Card, JoSAA Allotment Letter, Original TC & 12th Marksheet', 'Chennai'),
  makeInstitution('iit_mandi', 'Indian Institute of Technology Mandi', 'Mandi, Himachal Pradesh', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Allotment Letter & 12th Board Marksheet'),
  makeInstitution('iit_palakkad', 'Indian Institute of Technology Palakkad', 'Palakkad, Kerala', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Allotment Letter, Original TC & 12th Marksheet'),
  makeInstitution('iit_patna', 'Indian Institute of Technology Patna', 'Patna, Bihar', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Rank Card, JoSAA Allotment Letter, CLC/Migration & Medical Form'),
  makeInstitution('iit_roorkee', 'Indian Institute of Technology Roorkee', 'Roorkee, Uttarakhand', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Rank Card, JoSAA Allotment Letter, 12th Marksheet & Medical Certificate'),
  makeInstitution('iit_ropar', 'Indian Institute of Technology Ropar', 'Rupnagar, Punjab', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Allotment Letter, Migration & 12th Marksheet'),
  makeInstitution('iit_tirupati', 'Indian Institute of Technology Tirupati', 'Tirupati, Andhra Pradesh', 'IIT', 'Institute of National Importance (MoE)', 'JEE Advanced + JoSAA Counselling', '2026-12-05', 'JEE Advanced Scorecard, JoSAA Allotment Letter, Original TC & 12th Marksheet'),

  // ==================== ALL 31 NITs ====================
  makeInstitution('nit_jalandhar', 'Dr. B. R. Ambedkar National Institute of Technology Jalandhar', 'Jalandhar, Punjab', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA/CSAB Allotment, Character & Migration Certificate'),
  makeInstitution('mnit_jaipur', 'Malaviya National Institute of Technology Jaipur', 'Jaipur, Rajasthan', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Rank Card, JoSAA Allotment, Original TC/Migration & Medical Certificate'),
  makeInstitution('manit_bhopal', 'Maulana Azad National Institute of Technology Bhopal', 'Bhopal, Madhya Pradesh', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA Allotment, Original TC, Migration & Gap Affidavit'),
  makeInstitution('mnnit_allahabad', 'Motilal Nehru National Institute of Technology Allahabad', 'Prayagraj, Uttar Pradesh', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Rank Card, JoSAA Allotment, Original TC/Migration & Medical Form'),
  makeInstitution('nit_agartala', 'National Institute of Technology Agartala', 'Agartala, Tripura', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA/CSAB Allotment, PRTC (Home State) & Migration'),
  makeInstitution('nit_ap', 'National Institute of Technology Andhra Pradesh', 'Tadepalligudem, Andhra Pradesh', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA Allotment, Original TC & Study Certificates'),
  makeInstitution('nit_arunachal', 'National Institute of Technology Arunachal Pradesh', 'Jote, Arunachal Pradesh', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA/CSAB Allotment & 12th Board Marksheet'),
  makeInstitution('nit_calicut', 'National Institute of Technology Calicut', 'Kozhikode, Kerala', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Rank Card, JoSAA Allotment, Original TC, Conduct & Nativity Certificate'),
  makeInstitution('nit_delhi', 'National Institute of Technology Delhi', 'New Delhi, Delhi', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Rank Card, JoSAA Allotment, 12th Marksheet & Medical Certificate'),
  makeInstitution('nit_durgapur', 'National Institute of Technology Durgapur', 'Durgapur, West Bengal', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA Allotment, Original Migration & Medical Certificate'),
  makeInstitution('nit_goa', 'National Institute of Technology Goa', 'Cuncolim, Goa', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA Allotment, Leaving Certificate & 12th Marksheet'),
  makeInstitution('nit_hamirpur', 'National Institute of Technology Hamirpur', 'Hamirpur, Himachal Pradesh', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA Allotment, Character & Migration Certificate'),
  makeInstitution('nit_jamshedpur', 'National Institute of Technology Jamshedpur', 'Jamshedpur, Jharkhand', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA Allotment, Original CLC & Migration Certificate'),
  makeInstitution('nit_surathkal', 'National Institute of Technology Karnataka, Surathkal', 'Mangaluru, Karnataka', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Rank Card, JoSAA Allotment, Original TC, Study & Medical Certificate', 'NITK'),
  makeInstitution('nit_kurukshetra', 'National Institute of Technology Kurukshetra', 'Kurukshetra, Haryana', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Rank Card, JoSAA Allotment, Character & Migration Certificate'),
  makeInstitution('nit_manipur', 'National Institute of Technology Manipur', 'Imphal, Manipur', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA/CSAB Allotment & 12th Board Marksheet'),
  makeInstitution('nit_meghalaya', 'National Institute of Technology Meghalaya', 'Shillong, Meghalaya', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA/CSAB Allotment, PRC (Home State) & Migration'),
  makeInstitution('nit_mizoram', 'National Institute of Technology Mizoram', 'Aizawl, Mizoram', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA/CSAB Allotment & 12th Board Marksheet'),
  makeInstitution('nit_nagaland', 'National Institute of Technology Nagaland', 'Chümoukedima, Nagaland', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA/CSAB Allotment & 12th Board Marksheet'),
  makeInstitution('nit_patna', 'National Institute of Technology Patna', 'Patna, Bihar', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA Allotment, Original CLC, Migration & Medical Form'),
  makeInstitution('nit_puducherry', 'National Institute of Technology Puducherry', 'Karaikal, Puducherry', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA Allotment, Original TC & Residence Certificate', 'Pondicherry'),
  makeInstitution('nit_raipur', 'National Institute of Technology Raipur', 'Raipur, Chhattisgarh', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA Allotment, Original TC, Migration & Medical Form'),
  makeInstitution('nit_rourkela', 'National Institute of Technology Rourkela', 'Rourkela, Odisha', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Rank Card, JoSAA Allotment, Original CLC/Migration & Medical Form'),
  makeInstitution('nit_sikkim', 'National Institute of Technology Sikkim', 'Ravangla, Sikkim', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA/CSAB Allotment & 12th Board Marksheet'),
  makeInstitution('nit_silchar', 'National Institute of Technology Silchar', 'Silchar, Assam', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA Allotment, PRC (Assam) & Migration Certificate'),
  makeInstitution('nit_srinagar', 'National Institute of Technology Srinagar', 'Srinagar, Jammu & Kashmir', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA/CSAB Allotment, Domicile & Migration Certificate'),
  makeInstitution('nit_trichy', 'National Institute of Technology Tiruchirappalli', 'Tiruchirappalli, Tamil Nadu', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Rank Card, JoSAA Allotment, Original TC & 12th PCM Marksheet', 'NIT Trichy'),
  makeInstitution('nit_uttarakhand', 'National Institute of Technology Uttarakhand', 'Srinagar, Uttarakhand', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('nit_warangal', 'National Institute of Technology Warangal', 'Warangal, Telangana', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Rank Card, JoSAA Allotment, Original TC & Study Certificates'),
  makeInstitution('svnit_surat', 'Sardar Vallabhbhai National Institute of Technology Surat', 'Surat, Gujarat', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Rank Card, JoSAA Allotment, Leaving Certificate & Medical Form', 'SVNIT'),
  makeInstitution('vnit_nagpur', 'Visvesvaraya National Institute of Technology Nagpur', 'Nagpur, Maharashtra', 'NIT', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-07', 'JEE Main Rank Card, JoSAA Allotment, Leaving Certificate & Medical Form', 'VNIT'),

  // ==================== ALL 26 IIITs ====================
  makeInstitution('iiitm_gwalior', 'Atal Bihari Vajpayee Indian Institute of Information Technology and Management Gwalior', 'Gwalior, Madhya Pradesh', 'IIIT', 'Institute of National Importance (MoE)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA Allotment, Original TC & Migration Certificate', 'ABV-IIITM'),
  makeInstitution('iiit_agartala', 'Indian Institute of Information Technology Agartala', 'Agartala, Tripura', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & 12th Marksheet'),
  makeInstitution('iiit_allahabad', 'Indian Institute of Information Technology Allahabad', 'Prayagraj, Uttar Pradesh', 'IIIT', 'Institute of National Importance (MoE)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Rank Card, JoSAA Allotment, Original TC/Migration & Medical Form'),
  makeInstitution('iiit_bhagalpur', 'Indian Institute of Information Technology Bhagalpur', 'Bhagalpur, Bihar', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment, CLC & Migration Certificate'),
  makeInstitution('iiit_bhopal', 'Indian Institute of Information Technology Bhopal', 'Bhopal, Madhya Pradesh', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment, Original TC & Migration'),
  makeInstitution('iiitdm_jabalpur', 'Indian Institute of Information Technology Design and Manufacturing Jabalpur', 'Jabalpur, Madhya Pradesh', 'IIIT', 'Institute of National Importance (MoE)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA Allotment, Original TC & Migration Certificate'),
  makeInstitution('iiitdm_kancheepuram', 'Indian Institute of Information Technology Design and Manufacturing Kancheepuram', 'Chennai, Tamil Nadu', 'IIIT', 'Institute of National Importance (MoE)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA Allotment, Original TC & 12th PCM Marksheet'),
  makeInstitution('iiitdm_kurnool', 'Indian Institute of Information Technology Design and Manufacturing Kurnool', 'Kurnool, Andhra Pradesh', 'IIIT', 'Institute of National Importance (MoE)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA Allotment, Original TC & 12th Marksheet'),
  makeInstitution('iiit_dharwad', 'Indian Institute of Information Technology Dharwad', 'Dharwad, Karnataka', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC'),
  makeInstitution('iiit_guwahati', 'Indian Institute of Information Technology Guwahati', 'Guwahati, Assam', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('iiit_kalyani', 'Indian Institute of Information Technology Kalyani', 'Kalyani, West Bengal', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('iiit_kota', 'Indian Institute of Information Technology Kota', 'Kota, Rajasthan', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC/Migration'),
  makeInstitution('iiit_kottayam', 'Indian Institute of Information Technology Kottayam', 'Kottayam, Kerala', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment, Original TC & Conduct Certificate'),
  makeInstitution('iiit_lucknow', 'Indian Institute of Information Technology Lucknow', 'Lucknow, Uttar Pradesh', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Rank Card, JoSAA Allotment, Original TC/Migration & Medical Form'),
  makeInstitution('iiit_manipur', 'Indian Institute of Information Technology Manipur', 'Imphal, Manipur', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & 12th Board Marksheet'),
  makeInstitution('iiit_nagpur', 'Indian Institute of Information Technology Nagpur', 'Nagpur, Maharashtra', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Leaving Certificate'),
  makeInstitution('iiit_pune', 'Indian Institute of Information Technology Pune', 'Pune, Maharashtra', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Leaving Certificate'),
  makeInstitution('iiit_raichur', 'Indian Institute of Information Technology Raichur', 'Raichur, Karnataka', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC'),
  makeInstitution('iiit_ranchi', 'Indian Institute of Information Technology Ranchi', 'Ranchi, Jharkhand', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment, CLC & Migration Certificate'),
  makeInstitution('iiit_sonepat', 'Indian Institute of Information Technology Sonepat', 'Sonipat, Haryana', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Character/Migration Certificate'),
  makeInstitution('iiit_sricity', 'Indian Institute of Information Technology Sri City', 'Chittoor, Andhra Pradesh', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC'),
  makeInstitution('iiit_surat', 'Indian Institute of Information Technology Surat', 'Surat, Gujarat', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Leaving Certificate'),
  makeInstitution('iiit_trichy', 'Indian Institute of Information Technology Tiruchirappalli', 'Tiruchirappalli, Tamil Nadu', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC', 'IIIT Trichy'),
  makeInstitution('iiit_una', 'Indian Institute of Information Technology Una', 'Una, Himachal Pradesh', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Character/Migration Certificate'),
  makeInstitution('iiit_vadodara', 'Indian Institute of Information Technology Vadodara', 'Gandhinagar, Gujarat', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Leaving Certificate'),
  makeInstitution('iiit_vadodara_diu', 'Indian Institute of Information Technology Vadodara - International Campus Diu', 'Diu, Dadra & Nagar Haveli and Daman & Diu', 'IIIT', 'Institute of National Importance (PPP)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-08', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),

  // ==================== ALL 38 JoSAA GFTIs ====================
  makeInstitution('gfti_assam_univ', 'Assam University, Silchar', 'Silchar, Assam', 'GFTI', 'Central University (UGC)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('gfti_bit_mesra', 'Birla Institute of Technology, Mesra', 'Ranchi, Jharkhand', 'GFTI', 'UGC Deemed to be University (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Rank Card, JoSAA Allotment, Original CLC & Migration Certificate'),
  makeInstitution('gfti_bit_patna', 'Birla Institute of Technology, Patna Off-Campus', 'Patna, Bihar', 'GFTI', 'UGC Deemed University Off-Campus (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment, CLC & Migration Certificate'),
  makeInstitution('gfti_cipet_bbs', 'Central Institute of Petrochemicals Engineering & Technology (CIPET), Bhubaneswar', 'Bhubaneswar, Odisha', 'GFTI', 'Govt. of India Autonomous Institute (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & CLC/Migration'),
  makeInstitution('gfti_cit_kokrajhar', 'Central Institute of Technology, Kokrajhar', 'Kokrajhar, Assam', 'GFTI', 'Deemed to be University (MoE GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('gfti_cu_haryana', 'Central University of Haryana', 'Mahendragarh, Haryana', 'GFTI', 'Central University (UGC GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Character/Migration'),
  makeInstitution('gfti_cu_jammu', 'Central University of Jammu', 'Jammu, Jammu & Kashmir', 'GFTI', 'Central University (UGC GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('gfti_cu_rajasthan', 'Central University of Rajasthan', 'Ajmer, Rajasthan', 'GFTI', 'Central University (UGC GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC/Migration'),
  makeInstitution('gfti_csvtu_bhilai', 'Chhattisgarh Swami Vivekanand Technical University (CSVTU), Bhilai', 'Bhilai, Chhattisgarh', 'GFTI', 'State Technical University (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC'),
  makeInstitution('gfti_gkciet_malda', 'Ghani Khan Choudhury Institute of Engineering & Technology (GKCIET), Malda', 'Malda, West Bengal', 'GFTI', 'MoE Centrally Funded Institute (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('gfti_gurukula_kangri', 'Gurukula Kangri (Deemed to be University), Haridwar', 'Haridwar, Uttarakhand', 'GFTI', 'UGC Deemed to be University (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC/Migration'),
  makeInstitution('gfti_iict_bhadohi', 'Indian Institute of Carpet Technology (IICT), Bhadohi', 'Bhadohi, Uttar Pradesh', 'GFTI', 'Govt. of India Institute (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC'),
  makeInstitution('gfti_iiest_shibpur', 'Indian Institute of Engineering Science and Technology (IIEST), Shibpur', 'Howrah, West Bengal', 'GFTI', 'Institute of National Importance (NITSER)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Rank Card, JoSAA Allotment, Original Migration & Medical Certificate', 'BESU Shibpur'),
  makeInstitution('gfti_iiht_salem', 'Indian Institute of Handloom Technology (IIHT), Salem', 'Salem, Tamil Nadu', 'GFTI', 'Govt. of India Institute (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC'),
  makeInstitution('gfti_iiht_varanasi', 'Indian Institute of Handloom Technology (IIHT), Varanasi', 'Varanasi, Uttar Pradesh', 'GFTI', 'Govt. of India Institute (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC'),
  makeInstitution('gfti_ict_ioc_bbs', 'Institute of Chemical Technology (ICT), Mumbai - IOC Bhubaneswar', 'Bhubaneswar, Odisha', 'GFTI', 'UGC Deemed University Campus (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('gfti_iitram_ahmedabad', 'Institute of Infrastructure, Technology, Research and Management (IITRAM)', 'Ahmedabad, Gujarat', 'GFTI', 'State University (GFTI)', 'JEE Main + JoSAA / CSAB / ACPC', '2026-12-09', 'JEE Main Scorecard, JoSAA Allotment & Leaving Certificate'),
  makeInstitution('gfti_ggv_bilaspur', 'Institute of Technology, Guru Ghasidas Vishwavidyalaya (GGV), Bilaspur', 'Bilaspur, Chhattisgarh', 'GFTI', 'Central University (UGC GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC/Migration'),
  makeInstitution('gfti_iiit_bbs', 'International Institute of Information Technology (IIIT), Bhubaneswar', 'Bhubaneswar, Odisha', 'GFTI', 'State Unitary University (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment, CLC & Migration'),
  makeInstitution('gfti_iiit_nayaraipur', 'International Institute of Information Technology (IIIT), Naya Raipur', 'Raipur, Chhattisgarh', 'GFTI', 'State University (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC'),
  makeInstitution('gfti_jk_allahabad', 'J.K. Institute of Applied Physics and Technology, University of Allahabad', 'Prayagraj, Uttar Pradesh', 'GFTI', 'Central University Dept. (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC/Migration'),
  makeInstitution('gfti_jnu_delhi', 'Jawaharlal Nehru University (JNU) - School of Engineering', 'New Delhi, Delhi', 'GFTI', 'Central University (UGC GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('gfti_mizoram_univ', 'Mizoram University, Aizawl', 'Aizawl, Mizoram', 'GFTI', 'Central University (UGC GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & 12th Board Marksheet'),
  makeInstitution('gfti_niamt_ranchi', 'National Institute of Advanced Manufacturing Technology (NIAMT), Ranchi', 'Ranchi, Jharkhand', 'GFTI', 'MoE Centrally Funded Institute (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & CLC/Migration'),
  makeInstitution('gfti_nielit_aurangabad', 'National Institute of Electronics and Information Technology (NIELIT), Aurangabad', 'Chhatrapati Sambhajinagar, Maharashtra', 'GFTI', 'MeitY Autonomous Institute (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Leaving Certificate'),
  makeInstitution('gfti_niftem_kundli', 'National Institute of Food Technology Entrepreneurship and Management (NIFTEM), Kundli', 'Sonipat, Haryana', 'GFTI', 'Institute of National Importance (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Character/Migration'),
  makeInstitution('gfti_niftem_thanjavur', 'National Institute of Food Technology, Entrepreneurship and Management (NIFTEM), Thanjavur', 'Thanjavur, Tamil Nadu', 'GFTI', 'Institute of National Importance (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC'),
  makeInstitution('gfti_nehu_shillong', 'North-Eastern Hill University (NEHU), Shillong', 'Shillong, Meghalaya', 'GFTI', 'Central University (UGC GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('gfti_ptu_puducherry', 'Puducherry Technological University (PTU), Puducherry', 'Puducherry, Puducherry', 'GFTI', 'State Technological University (GFTI)', 'JEE Main + JoSAA / CSAB / CENTAC', '2026-12-09', 'JEE Main Scorecard, JoSAA/CENTAC Allotment & Original TC'),
  makeInstitution('gfti_pec_chandigarh', 'Punjab Engineering College (PEC), Chandigarh', 'Chandigarh, Chandigarh', 'GFTI', 'Deemed to be University (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Rank Card, JoSAA Allotment, Character & Migration Certificate'),
  makeInstitution('gfti_sliet_longowal', 'Sant Longowal Institute of Engineering and Technology (SLIET), Longowal', 'Sangrur, Punjab', 'GFTI', 'Deemed to be University (MoE GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Character/Migration'),
  makeInstitution('gfti_vikram_ujjain', 'School of Engineering & Technology, Vikram University, Ujjain', 'Ujjain, Madhya Pradesh', 'GFTI', 'State University (GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Original TC'),
  makeInstitution('gfti_tezpur_univ', 'School of Engineering, Tezpur University', 'Tezpur, Assam', 'GFTI', 'Central University (UGC GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('gfti_spa_bhopal', 'School of Planning and Architecture (SPA), Bhopal', 'Bhopal, Madhya Pradesh', 'GFTI', 'Institute of National Importance (GFTI)', 'JEE Main Paper 2 + JoSAA / CSAB', '2026-12-09', 'JEE Main Paper 2 Scorecard, JoSAA Allotment & Original TC'),
  makeInstitution('gfti_spa_delhi', 'School of Planning and Architecture (SPA), New Delhi', 'New Delhi, Delhi', 'GFTI', 'Institute of National Importance (GFTI)', 'JEE Main Paper 2 + JoSAA / CSAB', '2026-12-09', 'JEE Main Paper 2 Scorecard, JoSAA Allotment & Migration Certificate'),
  makeInstitution('gfti_spa_vijayawada', 'School of Planning and Architecture (SPA), Vijayawada', 'Vijayawada, Andhra Pradesh', 'GFTI', 'Institute of National Importance (GFTI)', 'JEE Main Paper 2 + JoSAA / CSAB', '2026-12-09', 'JEE Main Paper 2 Scorecard, JoSAA Allotment & Original TC'),
  makeInstitution('gfti_smvdu_katra', 'Shri Mata Vaishno Devi University (SMVDU), Katra', 'Katra, Jammu & Kashmir', 'GFTI', 'State University (UGC GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Scorecard, JoSAA/CSAB Allotment & Migration Certificate'),
  makeInstitution('gfti_uoh_hyderabad', 'University of Hyderabad (UoH) - School of Computer and Information Sciences', 'Hyderabad, Telangana', 'GFTI', 'Central University (UGC GFTI)', 'JEE Main + JoSAA / CSAB Counselling', '2026-12-09', 'JEE Main Rank Card, JoSAA Allotment & Original TC/Migration'),

  // ==================== ALL 35 NIAT PARTNER UNIVERSITIES ====================
  makeInstitution('adypu_pune', 'Ajeenkya DY Patil University (ADYPU)', 'Pune, Maharashtra', 'NIAT Partner', 'UGC Recognised State Private University', 'MHT-CET / JEE Main / ACET Merit Verification', '2026-12-08', 'MHT-CET/JEE Scorecard, Maharashtra Domicile / Migration Certificate'),
  makeInstitution('amet_chennai', 'AMET Deemed to be University', 'Chennai, Tamil Nadu', 'NIAT Partner', 'UGC Approved & NAAC Accredited University', 'AMET Entrance / 12th PCM Merit', '2026-12-09', 'Original TC, Medical Fitness Certificate & 12th Marksheet'),
  makeInstitution('amc_blr', 'AMC Engineering College', 'Bengaluru, Karnataka', 'NIAT Partner', 'NAAC A+ & VTU Affiliated Autonomous', 'KCET / COMEDK / Management Merit Quota', '2026-12-09', 'KCET/COMEDK Allotment Letter, Original TC & Migration Certificate', 'Bangalore'),
  makeInstitution('annamacharya_tirupati', 'Annamacharya University', 'Tirupati / Rajampet, Andhra Pradesh', 'NIAT Partner', 'UGC Approved State Private University', 'AP EAPCET / JEE Main / University Merit', '2026-12-09', 'AP EAPCET Rank Card, Original TC & Study/Conduct Certificates'),
  makeInstitution('audisankara_nellore', 'Audisankara College of Engineering & Technology', 'Nellore, Andhra Pradesh', 'NIAT Partner', 'NAAC A+ & UGC Autonomous Institute', 'AP EAPCET / Management Merit Quota', '2026-12-09', 'AP EAPCET Hall Ticket/Rank Card, Original TC & Aadhaar Copy'),
  makeInstitution('aurora_hyd', 'Aurora Higher Education & Research Academy', 'Hyderabad, Telangana', 'NIAT Partner', 'UGC Approved Deemed to be University', 'TG EAPCET / JEE Main / Aurora Merit Track', '2026-12-06', 'Original TC, Bonafide Certificate & 12th PCM Hall Ticket/Marksheet'),
  makeInstitution('crescent_chennai', 'B. S. Abdur Rahman Crescent Institute', 'Chennai, Tamil Nadu', 'NIAT Partner', 'UGC & NAAC A+ Deemed University', 'CIEAT / JEE Main / TNEA Equivalent Merit', '2026-12-06', 'Original TC, Community Certificate & 10th/12th Marksheets'),
  makeInstitution('brainware_kolkata', 'Brainware University', 'Kolkata, West Bengal', 'NIAT Partner', 'UGC Recognised State Private University', 'WBJEE / JEE Main / Brainware Eligibility Test', '2026-12-14', 'WBJEE/JEE Rank Card, Original School Leaving/Migration & Anti-Ragging Affidavit'),
  makeInstitution('cutm_odisha', 'Centurion University of Technology & Management', 'Bhubaneswar, Odisha', 'NIAT Partner', 'UGC & NAAC A+ Accredited University', 'CUEE / OJEE / JEE Main Merit', '2026-12-13', 'College Leaving Certificate (CLC), Conduct Certificate & Migration'),
  makeInstitution('chaitanya_hyd', 'Chaitanya (Deemed to be University)', 'Hyderabad, Telangana', 'NIAT Partner', 'UGC Approved Deemed University', 'TG EAPCET / JEE Main / Direct Merit Quota', '2026-12-05', 'Original TC, Conduct Certificate & TG EAPCET / JEE Rank Card'),
  makeInstitution('chalapathi_guntur', 'Chalapathi Institute of Technology (CIT)', 'Guntur, Andhra Pradesh', 'NIAT Partner', 'NAAC A & UGC Autonomous Institute', 'AP EAPCET / Management Merit Track', '2026-12-08', 'AP EAPCET Rank Card, Original TC & 10th/12th Original Marks Memos'),
  makeInstitution('dsu_trichy', 'Dhanalakshmi Srinivasan University', 'Tiruchirappalli, Tamil Nadu', 'NIAT Partner', 'UGC Recognised State Private University', '12th PCM Merit / JEE Main', '2026-12-10', 'Original TC, 10th/12th Marksheets & Community Certificate', 'Trichy'),
  makeInstitution('raisoni_nagpur', 'G H Raisoni University', 'Nagpur / Pune, Maharashtra', 'NIAT Partner', 'UGC Recognised State Private University', 'MHT-CET / JEE Main / 12th PCM Merit', '2026-12-11', 'Leaving Certificate (LC), Nationality/Domicile & 12th PCM Marksheet'),
  makeInstitution('gla_mathura', 'GLA University', 'Mathura / NCR, Uttar Pradesh', 'NIAT Partner', 'UGC & NAAC A+ Accredited University', 'GLAET / JEE Main / 12th PCM Merit', '2026-12-11', 'Original TC, Migration Certificate & 10th/12th Marksheets'),
  makeInstitution('ggu_rajahmundry', 'Godavari Global University (GGU)', 'Rajahmundry, Andhra Pradesh', 'NIAT Partner', 'UGC Recognised State Private University', 'AP EAPCET / GGU Merit / JEE Main', '2026-12-08', 'Original TC, Migration Certificate (non-AP boards) & 12th PCM Marksheet'),
  makeInstitution('hits_chennai', 'Hindustan Institute of Technology & Science (HITS)', 'Chennai, Tamil Nadu', 'NIAT Partner', 'UGC & NAAC A+ Deemed to be University', 'HITSEEE / JEE Main / 12th PCM Merit', '2026-12-08', 'HITSEEE/JEE Scorecard, Original TC & 12th PCM Marksheet'),
  makeInstitution('kahe_coimbatore', 'Karpagam Academy of Higher Education (KAHE)', 'Coimbatore, Tamil Nadu', 'NIAT Partner', 'UGC & NAAC A+ Deemed to be University', '12th PCM Direct Merit / JEE Main', '2026-12-08', 'Original TC, Community Certificate & Conduct Certificate'),
  makeInstitution('ltsu_punjab', 'Lamrin Tech Skills University (LTSU)', 'Ropar / Chandigarh Region, Punjab', 'NIAT Partner', 'UGC Recognised State Skill University', 'JEE Main / CUET / 12th PCM Merit', '2026-12-13', 'Original DMC (10th/12th), Character Certificate & Migration Certificate'),
  makeInstitution('lingayas_ncr', "Lingaya's Vidyapeeth", 'Faridabad, Delhi NCR', 'NIAT Partner', 'UGC Approved Deemed to be University', 'JEE Main / 12th PCM Direct Merit', '2026-12-11', 'Original Migration Certificate, Character Certificate & 12th Marksheet'),
  makeInstitution('nsrit_vizag', 'NSRIT (Nadimpalli Satyanarayana Raju Institute)', 'Visakhapatnam, Andhra Pradesh', 'NIAT Partner', 'AICTE Approved & UGC Autonomous (JNTUGV)', 'AP EAPCET / Management Merit Quota', '2026-12-06', 'AP EAPCET Rank Card, Original TC, Study Certificates (6th–12th)'),
  makeInstitution('niu_ncr', 'Noida International University (NIU)', 'Greater Noida, Delhi NCR', 'NIAT Partner', 'UGC Approved & NAAC A+ University', 'CUET / JEE Main / 12th PCM Direct Merit', '2026-12-10', 'Original TC/Migration, Character Certificate & UGC Anti-Ragging Affidavit'),
  makeInstitution('nriit_vijayawada', 'NRI Institute of Technology (NRIIT)', 'Vijayawada, Andhra Pradesh', 'NIAT Partner', 'NAAC A+ & UGC Autonomous Institute', 'AP EAPCET / JEE Main / B-Category Merit', '2026-12-07', 'AP EAPCET Scorecard, Original TC & Caste/Income Certificate'),
  makeInstitution('rathinam_coimbatore', 'Rathinam Technical Campus', 'Coimbatore, Tamil Nadu', 'NIAT Partner', 'NAAC A+ & UGC Autonomous (Anna University)', 'TNEA Counselling / Management Merit Quota', '2026-12-10', 'TNEA Allotment/Consortium Score, Original TC & Nativity Certificate'),
  makeInstitution('svyasa_blr', 'S-VYASA Deemed to be University', 'Bengaluru, Karnataka', 'NIAT Partner', 'UGC & NAAC A+ Deemed University', 'KCET / COMEDK / JEE Main / 12th PCM Merit', '2026-12-07', 'KCET/COMEDK Rank Card, Original TC & Karnataka Study Certificate', 'Bangalore'),
  makeInstitution('sage_indore', 'SAGE University', 'Indore, Madhya Pradesh', 'NIAT Partner', 'UGC & NAAC A+ Accredited University', 'SEE / JEE Main / MP DTE Merit Track', '2026-12-12', 'Original TC, Migration Certificate & MP Domicile/Category Certificate'),
  makeInstitution('sandip_nashik', 'Sandip University', 'Nashik / Pune Region, Maharashtra', 'NIAT Partner', 'UGC Recognised State Private University', 'MHT-CET / JEE Main / SU-JEE Merit', '2026-12-09', 'Leaving Certificate (LC), Domicile/Nationality & Migration Certificate'),
  makeInstitution('sgu_kolhapur', 'Sanjay Ghodawat University (SGU)', 'Kolhapur, Maharashtra', 'NIAT Partner', 'UGC Recognised & NAAC A Accredited University', 'MHT-CET / JEE Main / PERA CET', '2026-12-10', 'College Leaving Certificate (LC), MHT-CET/JEE Score & Gap Affidavit'),
  makeInstitution('sanskaram_ncr', 'Sanskaram University', 'Jhajjar, Delhi NCR', 'NIAT Partner', 'UGC Recognised State Private University', 'JEE Main / CUET / 12th PCM Merit', '2026-12-12', 'Original TC/Migration, Haryana Domicile & Anti-Ragging Form'),
  makeInstitution('srinivas_mangaluru', 'Srinivas University', 'Mangaluru, Karnataka', 'NIAT Partner', 'UGC Recognised State Private University', '12th PCM Merit / KCET / JEE Main', '2026-12-10', 'Original TC, Conduct Certificate & 10th/12th Original Marksheets'),
  makeInstitution('stmarys_hyd', "St. Mary's Group of Institutions", 'Hyderabad, Telangana', 'NIAT Partner', 'AICTE Approved & JNTUH Affiliated', 'TG EAPCET Convener / Management B-Category Quota', '2026-12-07', 'TG EAPCET Allotment/Rank Card, Original TC & Equivalence Certificate'),
  makeInstitution('sgvu_jaipur', 'Suresh Gyan Vihar University (SGVU)', 'Jaipur, Rajasthan', 'NIAT Partner', 'UGC & NAAC A+ Accredited University', 'SGVUEE / JEE Main / 12th PCM Merit', '2026-12-12', 'Original Migration Certificate, Character Certificate & 12th PCM Marks'),
  makeInstitution('swarrnim_gujarat', 'Swarrnim Startup & Innovation University', 'Gandhinagar / Ahmedabad, Gujarat', 'NIAT Partner', 'UGC Recognised State Private University', 'GUJCET / JEE Main / ACPC Management Merit', '2026-12-12', 'School Leaving Certificate (LC), GUJCET/JEE Score & Migration Certificate'),
  makeInstitution('takshashila_tn', 'Takshashila University', 'Tindivanam (Chennai Region), Tamil Nadu', 'NIAT Partner', 'UGC Recognised State Private University', '12th PCM Merit / JEE Main / TNEA Track', '2026-12-07', 'Original TC, Community Certificate & Migration Certificate'),
  makeInstitution('vgu_jaipur', 'Vivekananda Global University (VGU)', 'Jaipur, Rajasthan', 'NIAT Partner', 'UGC & NAAC A+ Accredited University', 'VGUCET / JEE Main / CUET / 12th PCM Merit', '2026-12-11', 'Original TC, Migration Certificate & 10th/12th Board Marksheets'),
  makeInstitution('yenepoya_blr', 'Yenepoya (Deemed to be University)', 'Bengaluru / Mangaluru, Karnataka', 'NIAT Partner', 'UGC & NAAC A+ Deemed to be University', '12th PCM Direct Merit / KCET / JEE Main', '2026-12-08', 'Original TC, Migration Certificate (non-Karnataka) & 12th PCM Marks', 'Bangalore'),

  // ==================== MAJOR PRIVATE ENGINEERING COLLEGES ====================
  makeInstitution('pvt_akgec_ghaziabad', 'Ajay Kumar Garg Engineering College (AKGEC)', 'Ghaziabad, Uttar Pradesh', 'Private', 'AKTU Affiliated & NAAC A++', 'UPTAC (JEE Main Counselling) / Direct Merit', '2026-12-11', 'UPTAC Allotment / JEE Main Scorecard, Original TC & Migration Certificate'),
  makeInstitution('pvt_amity_noida', 'Amity University Noida', 'Noida, Uttar Pradesh', 'Private', 'UGC Recognised & NAAC A+ Private University', 'Amity JEE / JEE Main / 12th PCM Merit', '2026-12-12', 'Original TC/Migration, 10th/12th Marksheets & Anti-Ragging Undertaking'),
  makeInstitution('pvt_amrita_cbe', 'Amrita Vishwa Vidyapeetham (Coimbatore & Bengaluru)', 'Coimbatore, Tamil Nadu', 'Private', 'UGC Deemed University & NAAC A++', 'AEEE / JEE Main Counselling', '2026-12-10', 'AEEE/JEE Scorecard, Original TC, Conduct & 12th PCM Marksheet'),
  makeInstitution('pvt_bannari_amman', 'Bannari Amman Institute of Technology (BIT Sathy)', 'Sathyamangalam, Tamil Nadu', 'Private', 'Anna Univ. Autonomous & NAAC A+', 'TNEA Counselling / Management Quota', '2026-12-10', 'TNEA Allotment, Original TC, Community & Nativity Certificate'),
  makeInstitution('pvt_bennett_ncr', 'Bennett University (The Times Group)', 'Greater Noida, Uttar Pradesh', 'Private', 'UGC Recognised State Private University', 'JEE Main / CUET / 12th PCM Merit', '2026-12-12', 'Original Migration Certificate, 12th Marksheet & Aadhaar'),
  makeInstitution('pvt_bits_goa', 'Birla Institute of Technology and Science (BITS), KK Birla Goa Campus', 'Zuarinagar, Goa', 'Private', 'UGC Deemed University (Institution of Eminence)', 'BITSAT Online Counselling', '2026-12-06', 'BITSAT Scorecard, Offer Letter, Original Migration & Medical Form'),
  makeInstitution('pvt_bits_hyd', 'Birla Institute of Technology and Science (BITS), Hyderabad Campus', 'Hyderabad, Telangana', 'Private', 'UGC Deemed University (Institution of Eminence)', 'BITSAT Online Counselling', '2026-12-06', 'BITSAT Scorecard, Offer Letter, Original TC/Migration & Medical Form'),
  makeInstitution('pvt_bits_pilani', 'Birla Institute of Technology and Science (BITS), Pilani Campus', 'Pilani, Rajasthan', 'Private', 'UGC Deemed University (Institution of Eminence)', 'BITSAT Online Counselling', '2026-12-06', 'BITSAT Scorecard, Offer Letter, Original Migration & Medical Form'),
  makeInstitution('pvt_bvm_anand', 'Birla Vishvakarma Mahavidyalaya (BVM)', 'Vallabh Vidyanagar (Anand), Gujarat', 'Private', 'GTU Autonomous & NAAC A', 'GUJCET / JEE Main ACPC Counselling', '2026-12-10', 'ACPC Admission Slip, GUJCET Scorecard & School Leaving Certificate'),
  makeInstitution('pvt_cbit_hyd', 'Chaitanya Bharathi Institute of Technology (CBIT)', 'Hyderabad, Telangana', 'Private', 'Osmania Univ. Autonomous & NAAC A++', 'TG EAPCET / JEE Main B-Category', '2026-12-10', 'TG EAPCET Rank Card/Allotment, Original TC & Study Certificates'),
  makeInstitution('pvt_chandigarh_univ', 'Chandigarh University (CU)', 'Mohali, Punjab', 'Private', 'UGC Recognised & NAAC A+ Private University', 'CUCET / JEE Main / 12th PCM Merit', '2026-12-12', 'Original DMC (10th/12th), Migration & Character Certificate'),
  makeInstitution('pvt_cummins_pune', 'Cummins College of Engineering for Women', 'Pune, Maharashtra', 'Private', 'SPPU Autonomous & NAAC A', 'MHT-CET / JEE Main CAP Counselling', '2026-12-09', 'MHT-CET CAP Allotment, Leaving Certificate & Maharashtra Domicile'),
  makeInstitution('pvt_cvr_hyd', 'CVR College of Engineering', 'Hyderabad, Telangana', 'Private', 'JNTUH Autonomous & NAAC A', 'TG EAPCET / JEE Main B-Category', '2026-12-10', 'TG EAPCET Rank Card/Allotment, Original TC & Study Certificates'),
  makeInstitution('pvt_dsce_blr', 'Dayananda Sagar College of Engineering (DSCE)', 'Bengaluru, Karnataka', 'Private', 'VTU Autonomous & NAAC A', 'KCET / COMEDK UGET / Management Quota', '2026-12-10', 'KCET/COMEDK Allotment Order, Original TC & Study Certificate', 'Bangalore'),
  makeInstitution('pvt_daiict_gandhinagar', 'Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)', 'Gandhinagar, Gujarat', 'Private', 'UGC State Private University & NAAC A+', 'JEE Main / GUJCET ACPC Counselling', '2026-12-08', 'JEE Main/GUJCET Scorecard, School Leaving Certificate & 12th Marks'),
  makeInstitution('pvt_djsce_mumbai', 'Dwarkadas J. Sanghvi College of Engineering (DJSCE)', 'Mumbai, Maharashtra', 'Private', 'Mumbai Univ. Autonomous & NAAC A', 'MHT-CET / JEE Main CAP Counselling', '2026-12-09', 'MHT-CET CAP Allotment, Leaving Certificate & Gujarati Minority (if applicable)'),
  makeInstitution('pvt_galgotias_ncr', 'Galgotias University', 'Greater Noida, Uttar Pradesh', 'Private', 'UGC Recognised & NAAC A+ Private University', 'GEEE / JEE Main / CUET Merit', '2026-12-13', 'Original TC/Migration, Character Certificate & 12th PCM Marksheet'),
  makeInstitution('pvt_gvp_vizag', 'Gayatri Vidya Parishad College of Engineering (GVPCE)', 'Visakhapatnam, Andhra Pradesh', 'Private', 'JNTUGV Autonomous & NAAC A++', 'AP EAPCET / JEE Main B-Category', '2026-12-10', 'AP EAPCET Allotment Order, Original TC & Study Certificates'),
  makeInstitution('pvt_griet_hyd', 'Gokaraju Rangaraju Institute of Engineering and Technology (GRIET)', 'Hyderabad, Telangana', 'Private', 'JNTUH Autonomous & NAAC A++', 'TG EAPCET / JEE Main B-Category', '2026-12-10', 'TG EAPCET Rank Card/Allotment, Original TC & Study Certificates'),
  makeInstitution('pvt_graphic_era', 'Graphic Era (Deemed to be University)', 'Dehradun, Uttarakhand', 'Private', 'UGC Deemed University & NAAC A+', 'JEE Main / 12th PCM Direct Merit', '2026-12-12', 'Original TC, Migration Certificate & 10th/12th Board Marksheets'),
  makeInstitution('pvt_heritage_kolkata', 'Heritage Institute of Technology, Kolkata', 'Kolkata, West Bengal', 'Private', 'MAKAUT Autonomous & NAAC A', 'WBJEE / JEE Main Counselling', '2026-12-11', 'WBJEE/JEE Allotment Letter, Original TC/Migration & 12th Marksheet'),
  makeInstitution('pvt_iem_kolkata', 'Institute of Engineering & Management (IEM), Kolkata', 'Kolkata, West Bengal', 'Private', 'UEM / MAKAUT Autonomous & NAAC A', 'WBJEE / JEE Main / IEMJEE Counselling', '2026-12-10', 'WBJEE/JEE Allotment Letter, Original TC/Migration & 12th Marksheet'),
  makeInstitution('pvt_jiit_noida', 'Jaypee Institute of Information Technology (JIIT)', 'Noida, Uttar Pradesh', 'Private', 'UGC Deemed University & NAAC A', 'JEE Main / 12th PCM Merit Counselling', '2026-12-10', 'JEE Main Scorecard, Original Migration & 12th Marksheet'),
  makeInstitution('pvt_jecrc_jaipur', 'JECRC University', 'Jaipur, Rajasthan', 'Private', 'UGC Recognised State Private University', 'JEE Main / 12th PCM Direct Merit', '2026-12-12', 'Original TC, Migration Certificate & 10th/12th Board Marksheets'),
  makeInstitution('pvt_jss_noida', 'JSS Academy of Technical Education (JSSATEN), Noida', 'Noida, Uttar Pradesh', 'Private', 'AKTU Affiliated Engineering Institute', 'UPTAC (JEE Main Counselling)', '2026-12-11', 'UPTAC Allotment Letter, Original TC/Migration & 12th Marksheet'),
  makeInstitution('pvt_kjsomaiya_mumbai', 'K. J. Somaiya School of Engineering', 'Mumbai, Maharashtra', 'Private', 'Somaiya Vidyavihar University & NAAC A', 'MHT-CET / JEE Main / PERA CET', '2026-12-10', 'MHT-CET/JEE Scorecard, Leaving Certificate & Migration Certificate'),
  makeInstitution('pvt_kiit_bbs', 'Kalinga Institute of Industrial Technology (KIIT)', 'Bhubaneswar, Odisha', 'Private', 'UGC Deemed University & NAAC A++', 'KIITEE Online Counselling', '2026-12-10', 'KIITEE Rank Card, Original CLC, Conduct & Migration Certificate'),
  makeInstitution('pvt_kiet_ghaziabad', 'KIET Group of Institutions', 'Ghaziabad, Uttar Pradesh', 'Private', 'AKTU Autonomous & NAAC A+', 'UPTAC (JEE Main Counselling) / Direct Merit', '2026-12-11', 'UPTAC Allotment / JEE Main Scorecard, Original TC & Migration Certificate'),
  makeInstitution('pvt_kl_univ', 'Koneru Lakshmaiah Education Foundation (KL University)', 'Vijayawada / Hyderabad, Andhra Pradesh', 'Private', 'UGC Deemed University & NAAC A++', 'KLEEE / JEE Main / AP EAPCET', '2026-12-10', 'KLEEE/EAPCET Scorecard, Original TC & 12th PCM Marksheet'),
  makeInstitution('pvt_kumaraguru_cbe', 'Kumaraguru College of Technology (KCT)', 'Coimbatore, Tamil Nadu', 'Private', 'Anna Univ. Autonomous & NAAC A++', 'TNEA Counselling / Management Quota', '2026-12-10', 'TNEA Allotment, Original TC, Community & Nativity Certificate'),
  makeInstitution('pvt_lpu_punjab', 'Lovely Professional University (LPU)', 'Phagwara, Punjab', 'Private', 'UGC Recognised & NAAC A++ Private University', 'LPUNEST / JEE Main Counselling', '2026-12-12', 'LPUNEST/JEE Scorecard, Original Migration & 12th Marksheet'),
  makeInstitution('pvt_msrit_blr', 'M. S. Ramaiah Institute of Technology (MSRIT)', 'Bengaluru, Karnataka', 'Private', 'VTU Autonomous & NAAC A+', 'KCET / COMEDK UGET / Management Quota', '2026-12-10', 'KCET/COMEDK Allotment Order, Original TC & Study Certificate', 'Bangalore'),
  makeInstitution('pvt_mit_manipal', 'Manipal Institute of Technology (MIT), MAHE', 'Manipal, Karnataka', 'Private', 'UGC Deemed University (Institution of Eminence)', 'MET (Manipal Entrance Test) Counselling', '2026-12-08', 'MET Rank Card, Provisional Admission Order, Original TC & Migration'),
  makeInstitution('pvt_mitwpu_pune', 'MIT World Peace University (MIT-WPU)', 'Pune, Maharashtra', 'Private', 'UGC Recognised State Private University', 'MHT-CET / JEE Main / PERA CET', '2026-12-11', 'MHT-CET/JEE Scorecard, Leaving Certificate & Migration Certificate'),
  makeInstitution('pvt_nie_mysuru', 'National Institute of Engineering (NIE), Mysuru', 'Mysuru, Karnataka', 'Private', 'VTU Autonomous & NAAC A', 'KCET / COMEDK UGET / Management Quota', '2026-12-10', 'KCET/COMEDK Allotment Order, Original TC & Study Certificate', 'Mysore'),
  makeInstitution('pvt_nmims_mumbai', 'NMIMS Mukesh Patel School of Technology Management & Engineering', 'Mumbai, Maharashtra', 'Private', 'UGC Deemed University & NAAC A+', 'NMIMS-CET / JEE Main Counselling', '2026-12-10', 'NMIMS-CET Offer Letter, Leaving Certificate & 12th Marksheet'),
  makeInstitution('pvt_nirma_ahmedabad', 'Nirma University - Institute of Technology', 'Ahmedabad, Gujarat', 'Private', 'UGC State Private University & NAAC A+', 'JEE Main / GUJCET ACPC Counselling', '2026-12-09', 'JEE Main/GUJCET Scorecard, School Leaving Certificate & 12th Marks'),
  makeInstitution('pvt_pdeu_gandhinagar', 'Pandit Deendayal Energy University (PDEU)', 'Gandhinagar, Gujarat', 'Private', 'UGC State Private University & NAAC A++', 'JEE Main / GUJCET ACPC Counselling', '2026-12-09', 'JEE Main/GUJCET Scorecard, School Leaving Certificate & Migration'),
  makeInstitution('pvt_pes_blr', 'PES University', 'Bengaluru, Karnataka', 'Private', 'UGC State Private University & NAAC A+', 'PESSAT / JEE Main / KCET Counselling', '2026-12-09', 'PESSAT/JEE/KCET Rank Card, Original TC & 12th PCM Marksheet', 'Bangalore'),
  makeInstitution('pvt_psg_cbe', 'PSG College of Technology', 'Coimbatore, Tamil Nadu', 'Private', 'Anna Univ. Autonomous & NAAC A', 'TNEA Counselling Merit Track', '2026-12-09', 'TNEA Provisional Allotment, Original TC, Community & Nativity'),
  makeInstitution('pvt_pict_pune', 'Pune Institute of Computer Technology (PICT)', 'Pune, Maharashtra', 'Private', 'SPPU Autonomous & NAAC A+', 'MHT-CET / JEE Main CAP Counselling', '2026-12-09', 'MHT-CET CAP Allotment, Leaving Certificate & Maharashtra Domicile'),
  makeInstitution('pvt_rvce_blr', 'R. V. College of Engineering (RVCE)', 'Bengaluru, Karnataka', 'Private', 'VTU Autonomous & NAAC A+', 'KCET / COMEDK UGET / Management Quota', '2026-12-09', 'KCET/COMEDK Allotment Order, Original TC & Study Certificate', 'Bangalore'),
  makeInstitution('pvt_rajalakshmi_chennai', 'Rajalakshmi Engineering College (REC)', 'Chennai, Tamil Nadu', 'Private', 'Anna Univ. Autonomous & NAAC A++', 'TNEA Counselling / Management Quota', '2026-12-10', 'TNEA Allotment, Original TC, Community & Nativity Certificate'),
  makeInstitution('pvt_rvrjc_guntur', 'RVR & JC College of Engineering', 'Guntur, Andhra Pradesh', 'Private', 'ANU Autonomous & NAAC A+', 'AP EAPCET / JEE Main B-Category', '2026-12-10', 'AP EAPCET Allotment Order, Original TC & Study Certificates'),
  makeInstitution('pvt_sastra_thanjavur', 'SASTRA Deemed to be University', 'Thanjavur, Tamil Nadu', 'Private', 'UGC Deemed University & NAAC A++', 'JEE Main + 12th Board Normalized Merit', '2026-12-09', 'JEE Main Scorecard, 12th Marksheet, Original TC & Conduct Certificate'),
  makeInstitution('pvt_sharda_ncr', 'Sharda University', 'Greater Noida, Uttar Pradesh', 'Private', 'UGC Recognised & NAAC A+ Private University', 'SUAT / JEE Main / CUET Merit', '2026-12-13', 'Original TC/Migration, Character Certificate & 12th Marksheet'),
  makeInstitution('pvt_snu_ncr', 'Shiv Nadar Institution of Eminence (Shiv Nadar University)', 'Greater Noida, Uttar Pradesh', 'Private', 'UGC Deemed University (Institution of Eminence)', 'SNUSAT / JEE Main / SAT Counselling', '2026-12-08', 'SNUSAT/JEE Offer Letter, Original Migration & 12th Marksheet'),
  makeInstitution('pvt_silicon_bbs', 'Silicon University (Silicon Institute of Technology)', 'Bhubaneswar, Odisha', 'Private', 'UGC State Private University & NAAC A', 'OJEE / JEE Main Counselling', '2026-12-11', 'OJEE/JEE Allotment Letter, Original CLC, Conduct & Migration Certificate'),
  makeInstitution('pvt_soa_bbs', "Siksha 'O' Anusandhan (SOA Deemed University)", 'Bhubaneswar, Odisha', 'Private', 'UGC Deemed University & NAAC A++', 'SAAT / JEE Main Counselling', '2026-12-10', 'SAAT/JEE Rank Card, Original CLC, Conduct & Migration Certificate'),
  makeInstitution('pvt_spit_mumbai', 'Sardar Patel Institute of Technology (SPIT)', 'Mumbai, Maharashtra', 'Private', 'Mumbai Univ. Autonomous & NAAC A+', 'MHT-CET / JEE Main CAP Counselling', '2026-12-09', 'MHT-CET CAP Allotment, Leaving Certificate & 12th Marksheet'),
  makeInstitution('pvt_sjce_mysuru', 'Sri Jayachamarajendra College of Engineering (SJCE / JSS STU)', 'Mysuru, Karnataka', 'Private', 'JSS Science & Tech University & NAAC A+', 'KCET / COMEDK UGET Counselling', '2026-12-10', 'KCET/COMEDK Allotment Order, Original TC & Study Certificate', 'Mysore'),
  makeInstitution('pvt_srm_chennai', 'SRM Institute of Science and Technology (SRMIST)', 'Kattankulathur (Chennai), Tamil Nadu', 'Private', 'UGC Deemed University & NAAC A++', 'SRMJEEE / JEE Main Counselling', '2026-12-10', 'SRMJEEE Provisional Allotment Letter, Original TC & 12th Marksheet'),
  makeInstitution('pvt_ssn_chennai', 'Sri Sivasubramaniya Nadar College of Engineering (SSN)', 'Chennai, Tamil Nadu', 'Private', 'Anna Univ. Autonomous & NAAC A++', 'TNEA Counselling / Management Merit', '2026-12-09', 'TNEA Allotment / Merit Call Letter, Original TC & Community Certificate'),
  makeInstitution('pvt_skit_jaipur', 'Swami Keshvanand Institute of Technology (SKIT), Jaipur', 'Jaipur, Rajasthan', 'Private', 'RTU Autonomous & NAAC A++', 'REAP (JEE Main / 12th Merit Counselling)', '2026-12-11', 'REAP Allotment Letter, Original TC/Migration & 12th Marksheet'),
  makeInstitution('pvt_sit_pune', 'Symbiosis Institute of Technology (SIT)', 'Pune, Maharashtra', 'Private', 'UGC Deemed University & NAAC A++', 'SITEEE / JEE Main / MHT-CET', '2026-12-10', 'SITEEE/JEE Scorecard, Leaving Certificate & Migration Certificate'),
  makeInstitution('pvt_techno_kolkata', 'Techno Main Salt Lake', 'Kolkata, West Bengal', 'Private', 'MAKAUT Affiliated Engineering College', 'WBJEE / JEE Main Counselling', '2026-12-11', 'WBJEE/JEE Allotment Letter, Original TC/Migration & 12th Marksheet'),
  makeInstitution('pvt_thapar_patiala', 'Thapar Institute of Engineering and Technology (TIET)', 'Patiala, Punjab', 'Private', 'UGC Deemed University & NAAC A+', 'JEE Main / 12th PCM Merit Counselling', '2026-12-09', 'JEE Main Scorecard, Original Migration, Character & Medical Certificate'),
  makeInstitution('pvt_tce_madurai', 'Thiagarajar College of Engineering (TCE)', 'Madurai, Tamil Nadu', 'Private', 'Anna Univ. Autonomous & NAAC A++', 'TNEA Counselling Merit Track', '2026-12-09', 'TNEA Provisional Allotment, Original TC, Community & Nativity'),
  makeInstitution('pvt_upes_dehradun', 'UPES (University of Petroleum and Energy Studies)', 'Dehradun, Uttarakhand', 'Private', 'UGC Recognised & NAAC A Private University', 'UPESEAT / JEE Main / 12th PCM Merit', '2026-12-12', 'Original TC, Migration Certificate & 10th/12th Board Marksheets'),
  makeInstitution('pvt_vrsiddhartha_vijayawada', 'Velagapudi Ramakrishna Siddhartha Engineering College (SAHE)', 'Vijayawada, Andhra Pradesh', 'Private', 'Deemed / Autonomous & NAAC A+', 'AP EAPCET / JEE Main B-Category', '2026-12-10', 'AP EAPCET Allotment Order, Original TC & Study Certificates'),
  makeInstitution('pvt_vit_vellore', 'Vellore Institute of Technology (VIT Vellore & Chennai)', 'Vellore, Tamil Nadu', 'Private', 'UGC Deemed University & NAAC A++', 'VITEEE Online Counselling', '2026-12-09', 'VITEEE Provisional Admission Letter, Original TC & Migration Certificate'),
  makeInstitution('pvt_vit_pune', 'Vishwakarma Institute of Technology (VIT Pune)', 'Pune, Maharashtra', 'Private', 'SPPU Autonomous & NAAC A++', 'MHT-CET / JEE Main CAP Counselling', '2026-12-09', 'MHT-CET CAP Allotment, Leaving Certificate & 12th PCM Marksheet'),
  makeInstitution('pvt_vnrvjiet_hyd', 'VNR Vignana Jyothi Institute of Engineering & Technology', 'Hyderabad, Telangana', 'Private', 'JNTUH Autonomous & NAAC A++', 'TG EAPCET / JEE Main B-Category', '2026-12-10', 'TG EAPCET Rank Card/Allotment, Original TC & Study Certificates'),
];

// Strictly sorted A-Z alphabetically across all Indian institutions
export const PARTNER_UNIVERSITIES: PartnerUniversity[] = [...RAW_INSTITUTIONS].sort(
  (a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
);

// Normalizes phonetic/city spelling variations (e.g., Jadhavpur -> Jadavpur, Bangalore -> Bengaluru)
export function normalizeCollegeQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/jadhavpur/g, 'jadavpur')
    .replace(/bangalore/g, 'bengaluru')
    .replace(/bombay/g, 'mumbai')
    .replace(/calcutta/g, 'kolkata')
    .replace(/madras/g, 'chennai')
    .replace(/trichy/g, 'tiruchirappalli')
    .replace(/benaras|banaras/g, 'varanasi')
    .trim();
}

// Resolves either a preloaded institution ID or any custom-typed Indian college ("custom:Public / Govt:Name" or "custom:Private:Name")
export function resolveUniversity(idOrCustom?: string): PartnerUniversity {
  if (!idOrCustom) return PARTNER_UNIVERSITIES[0];

  const found = PARTNER_UNIVERSITIES.find((u) => u.id === idOrCustom);
  if (found) return found;

  if (idOrCustom.startsWith('custom:')) {
    const rest = idOrCustom.replace(/^custom:/, '');
    const isPublic = rest.startsWith('Public / Govt:');
    const cleanName = rest
      .replace(/^(Public \/ Govt|Private):/, '')
      .trim();

    return makeInstitution(
      idOrCustom,
      cleanName || 'Custom Engineering Institution',
      'India (UGC / AICTE Approved)',
      isPublic ? 'Public / Govt' : 'Private',
      isPublic
        ? 'State / Central Public Engineering Institution'
        : 'AICTE / UGC Approved Engineering Institution',
      isPublic
        ? 'State CET / JEE Main Centralized Counselling'
        : 'JEE Main / State CET / Institutional Merit Counselling',
      '2026-12-15',
      'Entrance / Merit Scorecard, Domicile/Category Certificate, Original TC/Migration & 12th PCM Marksheets'
    );
  }

  return makeInstitution(
    idOrCustom,
    idOrCustom,
    'India (UGC / AICTE Approved)',
    'Private',
    'AICTE / UGC Approved Engineering Institution',
    'JEE Main / State CET / Institutional Merit Counselling',
    '2026-12-15',
    'Entrance / Merit Scorecard, Original TC/Migration, 10th & 12th PCM Marksheets'
  );
}