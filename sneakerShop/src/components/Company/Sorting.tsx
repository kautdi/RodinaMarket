import { FC} from 'react';
import { Search } from './Sorting/Search';
import { SelectedBrand } from './Sorting/Selected';
import { AddBtn } from './Sorting/AddBtn';


const SortingBlock: FC = () => {
  
  return (
    <div className="sortingblock">
    <Search/>
    <SelectedBrand/>
    <AddBtn/>
    </div>
  );
};

export default SortingBlock;

