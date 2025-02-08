'use client'
 
import { usePathname } from 'next/navigation'
import Link from "next/link";   


function concatPreviousRecursive(arr: string[], index = 0, result: { name: string, path: string }[] = []) {
  if (index >= arr.length) {return result}; // Base case: Stop when the index reaches the array length

  if (index === 0) {
      result.push({name: 'home', path: arr[index]}); // First element remains the same
  } else {
      result.push({name: arr[index], path: result[index - 1].path + '/' + arr[index]}); // Concatenate with previous result
  }

  return concatPreviousRecursive(arr, index + 1, result); // Recursive call for the next element

}


function BreadCrumb() {
  
    const pathname = usePathname();
    const breadcrumb_array = pathname.split('/');
    const breadcrumb_obj = concatPreviousRecursive(breadcrumb_array);
    console.log(breadcrumb_obj);
    return (

      breadcrumb_obj[1].name !== '' && (
        <>
          <div className='breadcrumb container mx-auto px-[15px]'>
            {breadcrumb_obj.map(
              (elem, index: number) => (
                <Link href={elem.path == '' ? '/' : elem.path} key={index}>{elem.name.replace(/-/g, " ")}</Link>
              )
            )}
          </div>
        </>   
      ) 
  
    )
};
    
export default BreadCrumb;