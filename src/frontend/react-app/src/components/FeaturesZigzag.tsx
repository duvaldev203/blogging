import React from 'react';

import Card from './carousel/Card';
// import SliderArticles from './carousel/Slider';
import { FormControl, NativeSelect } from '@mui/material';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather';

const FeaturesZigzag: React.FC = () => {
  return (
    <section>
      <div className="mx-5 ">
        <div className="py-5 md:py-10 border-t border-gray-700 text-center">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Consultez les articles</h1>
            <div className="inline-flex text-sm font-semibold py-1 px-2 m-2 dark:text-gray-600 dark:bg-gray-200 bg-gray-500 rounded-sm mb-4"><span className="w-full mt-1">Trier par :</span>
              <FormControl fullWidth>
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: 'option',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={10}>Categories</option>
                  <option value={20}>Favoris</option>
                  <option value={30}>Meilleurs</option>
                </NativeSelect>
              </FormControl>
            </div>
          </div>
          {/* <p className="text-xl text-gray-400">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit laborum — semper quis lectus nulla.</p> */}
          {/* <Carousel slides={slides} /> */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 space-x-5 items-center justify-center justify-items-center">
            <Card style='max-lg:max-w-2xl'/>
            <Card style='max-lg:max-w-2xl'/>
            <Card style='max-lg:max-w-2xl'/>
          </div>


          {/* More Items */}
          <Link to='/articles' className="mt-5 inline-flex rounded-full px-3 py-1 text-base font-semibold mr-2 mb-2 text-cyan-600 hover:text-gray-700 dark:hover:text-gray-200"><Plus /><p className='mt-0.5 ml-1'> Afficher plus...</p></Link>

        </div>
      </div>
    </section>
  );
}

export default FeaturesZigzag;