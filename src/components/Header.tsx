import { Menu, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-background/90 backdrop-blur-md flex justify-between items-center px-6 py-4 w-full fixed top-0 z-50">
      <div className="flex items-center gap-4">
        <button className="hover:bg-surface-container/50 transition-colors p-2 rounded-full">
          <Menu className="w-6 h-6 text-primary" />
        </button>
        <h1 className="font-headline font-extrabold text-primary tracking-tighter text-xl">Velvet Crema</h1>
      </div>
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-container">
        <img 
          alt="User profile" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfL3a-7DetZ-Ub-MEercje8M20bUjeBQcdezqi7DjeVFfFA4Srzb7BVW5u3y4C4XlKok8B_LCfhlD8IVgdF8RnTHTvV2R1tbYBFnasxMSDNuCc7yExHa5wtZM3MkinQ90D-7VgAGc8IuzZ4cOLj1zv3Jq-ttLWGwIy8xL2apOEQHI3CkWLmY3nW-vMGn___6xO0Z59AjOSTWlqNgwDxGn1tOONPK2aBsB2TrmwNsj5w_z_Rgm_qCqJBa5jH7Thktv2PjsPAve7q70" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
}
