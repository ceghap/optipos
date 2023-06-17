import { signOut } from "next-auth/react";
import {
  MdHome,
  MdListAlt,
  MdOutlineReceiptLong
} from "react-icons/md";
import {HiComputerDesktop} from 'react-icons/hi2'
import {CiBoxes} from 'react-icons/ci'
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside
      className="fixed top-0 left-0 h-full w-64 pt-16"
      aria-label="Sidenav"
    >
      <div className="flex h-full flex-col justify-between overflow-y-auto border-r border-gray-200 bg-white py-5 px-3 dark:border-gray-700 dark:bg-gray-800">
        <ul className="space-y-2">
          <SidebarItem icon={<MdHome />} name="Home" link="/" />
          <SidebarItem
            icon={<HiComputerDesktop />}
            name="POS"
            link="/pos"
          />
          <SidebarItem
            icon={<CiBoxes />}
            name="Stock"
            link="/stock"
          />
           <SidebarItem
            icon={<MdOutlineReceiptLong />}
            name="Sales"
            link="/sales"
          />
        </ul>

      </div>
    </aside>
  );
};

export default Sidebar;
