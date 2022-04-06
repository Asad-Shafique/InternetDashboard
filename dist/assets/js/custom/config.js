const BASE_URL = "http://194.233.69.219/cybvegitMiddleware";
const END_PONT_SIGN_IN = "/api/Cybvegit/SignIn";
const END_PONT_GET_COMPANY_STATS = "/api/Cybvegit/Admin/getCompanyStatistics";
const END_PONT_GET_COMPANY_BRANCHES = "/api/Cybvegit/Admin/getCompanyBranches";
const END_PONT_GET_COMPANY_AREAS = "/api/Cybvegit/Admin/getCompanyAreas";
const END_PONT_CREATE_BRANCH = "/api/Cybvegit/Admin/createBranch";
const END_PONT_DELETE_BRANCH = "/api/Cybvegit/Admin/deleteBranch";
const COMPANY_ID=2;
const USER_INFO = "USER_INFO";





//================================ROLE==============================//
const ROLE_TYPE_BRANCH_TECHNICIAN="BRANCH_TECHNICIAN";
const ROLE_TYPE_COMPANY_ADMIN="COMPANY_ADMIN";
const ROLE_TYPE_BRANCH_ADMIN="BRANCH_ADMIN";





//====================================PAGES=======================================================//
const DASHBOARD_PAGE="dashboard.html";
const SIGNIN_PAGE="auth-login.html";





//==========================================MESSAGES==============================================//
const NOT_AUTHORIZED="You are not authorized. Please contact administrator";
const ERROR="Oops! something went wrong. Please try again later.";



//===================================MAP SETTINGS=====================================//
const BRANCH_IMAG= 'http://194.233.69.219/general/branch.png';
const OPEN_STREET_MAP='https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Nq3OKvZqH8jU9LKbrybO';
const OPNE_STREET_MAP_CONTRIBUTOR='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; Cybvegit contributors</a>';