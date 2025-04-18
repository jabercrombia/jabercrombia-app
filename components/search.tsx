"use client"

import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react";


export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchResults = async () => {
        if (query.length > 1) {
          const res = await fetch(`/api/search?q=${query}`);
          const data = await res.json();
          setResults(data.results);
        } else {
          setResults([]);
        }
      };
  
      fetchResults();
    }, [query]);

    return (
        <div>
            <Input className="float-right w-[150px] bg-white text-gray-500" placeholder="search" value={query}
            onChange={(e) => setQuery(e.target.value)}/>

            <ul className={`mt-4 space-y-2 absolute top-[20px] right-0 search border ${results.length > 0 ? 'block' : 'hidden'}`}>
                {results.map((item, index: number, array) => (
                <li key={item.sys.id} className="p-2 hover:bg-gray-100 text-black w-[250px]">
                    <a href={`${window.location.origin}/${item.url}`} target="_parent" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    <div className="grid grid-cols-2 content-center items-center mb-2">
                        <div className="pr-[10px]">
                                <img src ={item.images.items[0].url} alt={item.title} className="w-full h-auto border" />
                        </div>
                       <div className="text-left">
                        <p className="uppercase">{item.title}</p>
                        <p className="text-xs text-black">{item.description.length > 75 ? item.description.slice(0, 75) + '...' : item.description}</p>
                       </div>
                    </div>
                    </a>
                    {index === array.length - 2 && <hr/>}
                </li>
                ))}
            </ul>
        </div>

    )
}

  