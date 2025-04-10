'use client';

import { useState } from 'react';
import Dialog from "../../components/links/projects/dialog";
import StackIcon from "tech-stack-icons";

interface Item {
  id: number;
  name: string;
  category: string;
  technologyList?: string[];
  technologyNameListCollection?: { items: { name: string }[] };
}


interface FilterListProps {
  data: Item[];
}

export default function FilterList({ data }: FilterListProps) {
    
    const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

    type TechnologyItem = {
        name: string;
        techStackIconName?: string;
      };
      
      type Project = {
        technologyNameListCollection: {
          items: TechnologyItem[];
        };
      };
      
      
      // Get all technologyNameListCollection items
      const allTechItems = data.flatMap(elem => elem?.technologyNameListCollection?.items || []);
      
      // Filter unique by name
      const uniqueTechItems = Array.from(
        new Map(allTechItems.map(item => [item.name, item])).values()
      );
            
      
  //       

  const handleCheckboxChange = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech]
    );
  };

  // If no technology is selected, show all products.
  // Otherwise, filter products that have at least one matching technology.
  const filteredProducts =
  selectedTechnologies.length === 0
    ? data
    : data.filter((elem) =>
        selectedTechnologies.some((tech) =>
          elem.technologyNameListCollection?.items?.some(
            (item) => item.name === tech
          )
        )
      );

  return (
    <div className="container mx-auto">
      <div className="flex gap-4 mb-4 justify-center pt-[20px]">
      {uniqueTechItems.map((tech : {name : string, techStackIconName? : string}, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedTechnologies.includes(tech.name)}
                onChange={() => handleCheckboxChange(tech.name)}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <span>{tech.name} <StackIcon name={tech?.techStackIconName} className='w-[15px]' /></span>
            </label>
          ))}
      </div>

       <div className='grid grid-cols-1 md:grid-cols-3 gap-10 px-[15px]'>
         {filteredProducts.length > 0 ? (
           <>
             {filteredProducts.map((item, index : number) => (
               <div key={index}>
                  <Dialog data={item}/>
               </div>
             ))}
           </>
         ) : (
           <p className="text-gray-500">No products found.</p>
         )}
       </div>

     </div>
  );
}
