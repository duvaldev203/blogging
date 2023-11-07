import React from 'react';

import FeatImage01 from '../images/features-03-image-01.png';
import FeatImage02 from '../images/features-03-image-02.png';
import FeatImage03 from '../images/features-03-image-03.png';
import Card from './carousel/Card';
import SliderArticles from './carousel/Slider';
import { FormControl, NativeSelect } from '@mui/material';

const slides = [FeatImage01, FeatImage02, FeatImage03]

const FeaturesZigzag: React.FC = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-5 md:py-10 border-t border-gray-700">

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
            {/* <p className="text-xl text-gray-400">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit laborum — semper quis lectus nulla.</p> */}
            {/* <Carousel slides={slides} /> */}
            <div className="flex justify-between">
              <Card />
            </div>

          </div>

          {/* Items */}


        </div>
      </div>
    </section>
  );
}

export default FeaturesZigzag;