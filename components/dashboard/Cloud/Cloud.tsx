import Content from './Content';
import Header from './Header';

interface CloudProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Cloud = ({ setIsOpen }: CloudProps) => {
  return (
    <div className="bg-white text-black h-full">
      <Header setIsOpen={setIsOpen} />
      <Content />
    </div>
  );
};

export default Cloud;
