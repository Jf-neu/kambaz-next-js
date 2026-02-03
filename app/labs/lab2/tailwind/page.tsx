import "./index.css";
import TailwindBackgroundColors from "./tailwind-color";
import TailwindFilters from "./tailwind-filter";
import TailwindResponsiveDesign from "./tailwind-responsive-design";
import TailwindSpacing from "./tailwind-spacing";
import TailwindTypography from "./tailwind-typography";

export default function TailwindLab() {
 return (
   <div className="p-8">
     <h1 className="text-4xl font-bold mb-8">Tailwind CSS</h1>

     <div>
        <TailwindSpacing/>
     </div>

      <div>
        <TailwindTypography/>
     </div>

      <div>
        <TailwindBackgroundColors/>
      </div>

      <div>
        <TailwindResponsiveDesign/>
      </div>

      <div>
        <TailwindFilters/>
      </div>

   </div>

 );
}
