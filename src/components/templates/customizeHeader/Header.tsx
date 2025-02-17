import { Button } from '@/components/ui/button';
import { FaHamburger } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="bg-white flex items-center justify-between py-[5px] px-[20px] md:py-[10px]">
      <div className="flex items-center md:hidden">
        <FaHamburger />
        <h1 className="text-[20px] font-[700]">Customize</h1>
      </div>
      <div className='hidden md:flex items-center md:justify-end w-full gap-10'>
        <div className='md:flex items-center gap-5'>
            <Button className="bg-[#EEEFF1] text-[#53525F]">Change Channel</Button>
            <Button className="bg-[#EEEFF1] text-[#53525F]">Preview Channel</Button>
        </div>
        <Button className='bg-[#3351FF]'>Save Channel</Button>
      </div>
      <Button className='md:hidden bg-[#3351FF]'>Save Channel</Button>
    </div>
  );
};

export default Header;
