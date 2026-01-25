import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
 return (
  <div id="wd-dashboard">
   {/* Dashboard Title */}
   <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
   {/* Published Courses Section */}
   <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
   <div id="wd-dashboard-courses">
    {/* Course 1 */}
    <div className="wd-dashboard-course">
     <Link href="/courses/1201" className="wd-dashboard-course-link">
      <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
      <div>
       <h5> CS1234 React JS </h5>
       <p className="wd-dashboard-course-title">
        Full Stack software developer
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    {/* Course 2 */}
    <div className="wd-dashboard-course">      
      <Link href="/courses/1202" className="wd-dashboard-course-link">
      <Image src="/images/2-course-image.jpg" width={200} height={150} alt="digitalPhilosophy" />
      <div>
       <h5> CS1202 Digital Philosophy </h5>
       <p className="wd-dashboard-course-title">
        Philosopher of the digital age
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    {/* Course 3 */}
    <div className="wd-dashboard-course">      
      <Link href="/courses/1203" className="wd-dashboard-course-link">
      <Image src="/images/3-course-image.jpg" width={200} height={150} alt="QA" />
      <div>
       <h5> CS1203 Quality Assurance </h5>
       <p className="wd-dashboard-course-title">
        Full Time Quality Assurance Engineer
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    {/* Course 4 */}
    <div className="wd-dashboard-course">      
      <Link href="/courses/1204" className="wd-dashboard-course-link">
      <Image src="/images/4-course-image.jpg" width={200} height={150} alt="DS" />
      <div>
       <h5> CS1204 Data Structures </h5>
       <p className="wd-dashboard-course-title">
        Introduction to Data Science
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    {/* Course 5 */}
    <div className="wd-dashboard-course">      
      <Link href="/courses/1205" className="wd-dashboard-course-link">
      <Image src="/images/5-course-image.jpg" width={200} height={150} alt="Hardware" />
      <div>
       <h5> CS1205 Hardware Engineering </h5>
       <p className="wd-dashboard-course-title">
        Computer Hardware Basics
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    {/* Course 6 */}
    <div className="wd-dashboard-course">      
      <Link href="/courses/1206" className="wd-dashboard-course-link">
      <Image src="/images/6-course-image.jpg" width={200} height={150} alt="gamedev" />
      <div>
       <h5> CS1206 Game Development </h5>
       <p className="wd-dashboard-course-title">
        Introduction to Game Development
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    {/* Course 7 */}
    <div className="wd-dashboard-course">      
      <Link href="/courses/1207" className="wd-dashboard-course-link">
      <Image src="/images/7-course-image.jpg" width={200} height={150} alt="gamedesign" />
      <div>
       <h5> CS1207 Game Design </h5>
       <p className="wd-dashboard-course-title">
        What remained of Edith Finch? 
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
   </div>
  </div>
);}

