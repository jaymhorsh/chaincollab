import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsFillBarChartLineFill } from 'react-icons/bs';
import { CiStreamOn } from 'react-icons/ci';
import { FaSackDollar } from 'react-icons/fa6';
import { IoSettings } from 'react-icons/io5';
import { RiEditFill } from 'react-icons/ri';
import { TbHomeFilled } from 'react-icons/tb';

const Sidebar = () => {
  const pathname = usePathname();
  const links = [
    { href: '/dashboard', icon: TbHomeFilled, text: 'Home' },
    { href: '/dashboard/stream', icon: CiStreamOn, text: 'Stream' },
    {
      href: '/dashboard/customise-channel',
      icon: RiEditFill,
      text: 'Customize Channel',
    },
    {
      href: '/dashboard/analytics',
      icon: BsFillBarChartLineFill,
      text: 'Analytics',
    },

    {
      href: '/dashboard/monetization',
      icon: FaSackDollar,
      text: 'Monetization',
    },
    { href: '/dashboard/settings', icon: IoSettings, text: 'Settings' },
  ];
  return (
    <nav className="w-full mt-2 ">
      <div className="flex flex-col gap-2">
        {links.map((link) => {
          const IconComponent = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link href={link.href} key={link.text}>
              <div
                className={clsx('flex items-center rounded-md py-3 gap-3 px-4', isActive && 'bg-main-blue text-white')}
              >
                <IconComponent className={'inline-block text-xl'} />
                <p className="font-bold">{link.text}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
export default Sidebar;
