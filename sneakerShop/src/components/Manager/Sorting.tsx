import { FC} from 'react';
import { SelectedBrand } from '../Company/Sorting/Selected';
import { Search } from '../Company/Sorting/Search';




const SortingManager: FC = () => {
  
  return (
    <div className="sortingblock">
    <Search/>
    <SelectedBrand/>

    </div>
  );
};

export default SortingManager;

