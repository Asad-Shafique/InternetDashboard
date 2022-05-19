const BASE_URL = "http://194.233.69.219/cybvegitMiddleware";
const END_PONT_SIGN_IN = "/api/Cybvegit/SignIn";
const END_PONT_GET_COMPANY_STATS = "/api/Cybvegit/Admin/getCompanyStatistics?userId=";
const END_PONT_GET_COMPANY_BRANCHES = "/api/Cybvegit/Admin/getCompanyBranches?userId=";
const END_PONT_GET_COMPANY_AREAS = "/api/Cybvegit/Admin/getCompanyAreas";
const END_PONT_CREATE_BRANCH = "/api/Cybvegit/Admin/createBranch";
const END_PONT_DELETE_BRANCH = "/api/Cybvegit/Admin/deleteBranch";
const END_PONT_GET_COMPANY_USERS = "/api/Cybvegit/Admin/getCompanyUsers?userId=";
const END_PONT_GET_COMPANY_ROLES = "/api/Cybvegit/Admin/getCompanyRoles";
const END_PONT_GET_PACKAGES_TYPE = "/api/Cybvegit/GetPackageTypes?branchId=-1"
const END_POINT_GET_PACKAGES_BY_ID = "/api/Cybvegit/GetPackagesByPackageTypeId?branchId=-1&packageTypeId="
const END_POINT_GET_STATUS = "/api/Cybvegit/getStatus?form="
const END_POINT_CREATE_USER = "/api/Cybvegit/SingUp"
const END_POINT_UPDATE_USER = "/api/Cybvegit/Admin/updateUser"
const END_POINT_GET_COMPLAINT_FOR_AGENT = "/api/Cybvegit/getComplaintsForAgent?userId="
const END_PINT_GET_COMPLAINT_TYPE = "/api/Cybvegit/getComplaintTypes";
const END_POINT_GET_COMPLAINT_IMAGES_BY_COMPLAINT_ID = "/api/Cybvegit/getComplaintImagesByComplaintId?complaintId=";
const END_POINT_UPDATE_COMPLAINT_STATUS = "/api/Cybvegit/Admin/updateComplaintStatus"
const END_POINT_GET_LOCATIONS = "/api/Cybvegit/Admin/getLocations"
const END_POINT_GET_NOTIFICATIONS = "/api/Cybvegit/Admin/getNotificationsForAdmin?userId="
const END_POINT_DELETE_NOTIFICATION = "/api/Cybvegit/Admin/DeleteNotification"

const END_POINT_CREATE_NOTIFICATION = "/api/Cybvegit/Admin/CreateNotification"



const COMPANY_ID = 2;
const USER_INFO = "USER_INFO";
const STATUS_TYPE_GENERAL = "GENERAL";
const STATUS_TYPE_ON_ACCEPT = "ON_ACCEPT";
const STATUS_TYPE_ON_COMPLAINT_FORM = "ON_COMPLAINT_FORM";
const STATUS_TYPE_ON_ADMIN_FORM = "ON_ADMIN_FORM";
const BRANCH = "Branch";
const USERS = "Users";
const COMPLAINT = "Complaint";



//================================ROLE==============================//
const ROLE_TYPE_BRANCH_TECHNICIAN = "BRANCH_TECHNICIAN";
const ROLE_TYPE_COMPANY_ADMIN = "COMPANY_ADMIN";
const ROLE_TYPE_BRANCH_ADMIN = "BRANCH_ADMIN";





//====================================PAGES=======================================================//
const DASHBOARD_PAGE = "dashboard.html";
const SIGNIN_PAGE = "auth-login.html";





//==========================================MESSAGES==============================================//
const NOT_AUTHORIZED = "You are not authorized. Please contact administrator";
const ERROR = "Oops! something went wrong. Please try again later.";



//===================================MAP SETTINGS=====================================//
const BRANCH_IMAG = 'http://194.233.69.219/general/branch.png';
const PERSON_IMAG = 'http://194.233.69.219/general/person.png';
const PERSON_IMAG_2 = 'http://194.233.69.219/general/person2.png';
const COMPLAINT_IMAG = 'http://194.233.69.219/general/complaint.png';
const COMPANY_LOGO="http://194.233.69.219/general/londoncomputers_logo.png" ;
const OPEN_STREET_MAP = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Nq3OKvZqH8jU9LKbrybO';
const OPNE_STREET_MAP_CONTRIBUTOR = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; Cybvegit contributors</a>';


//=========================Cosntant Array Objects========================================//
const display = ['All', 'Branches', 'Users', 'Complaints']

const userStatus = [{
    status: "Active",
    statusId: "00"
},
{
    status: "InActive",
    statusId: "01"
}];
const complaintStatus = [{
    status: "In Progress",
    statusId: "IN_PROGRESS"
},
{
    status: "Pending",
    statusId: "PENDING"
},
{
    status: "Resolved",
    statusId: "RESOLVED"
},
{
    status: "On Hold",
    statusId: "ON_HOLD"
},
{
    status: "Rejected",
    statusId: "REJECTED"
}
];