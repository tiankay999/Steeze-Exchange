export default function Loading() {
  return (
    <div className="w-full min-h-screen p-4 space-y-6 md:p-6">
      

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-2">
       
          <div className="h-8 w-48 bg-gray-200 rounded-lg dark:bg-gray-800 animate-pulse" />
       
          <div className="h-4 w-32 bg-gray-200 rounded dark:bg-gray-800 animate-pulse" />
        </div>
   
        <div className="flex gap-3">
          <div className="h-10 w-24 bg-gray-200 rounded-lg dark:bg-gray-800 animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 rounded-lg dark:bg-gray-800 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
   
        <div className="p-6 border rounded-xl border-gray-100 dark:border-gray-800 md:col-span-2 space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded dark:bg-gray-800 animate-pulse" />
            <div className="h-10 w-64 bg-gray-200 rounded-lg dark:bg-gray-800 animate-pulse" />
          </div>
  
          <div className="w-full h-64 bg-gray-100 rounded-lg dark:bg-gray-900 animate-pulse flex items-end justify-between p-4 gap-2">
          
             <div className="w-full h-1/3 bg-gray-200 dark:bg-gray-800 rounded-t" />
             <div className="w-full h-1/2 bg-gray-200 dark:bg-gray-800 rounded-t" />
             <div className="w-full h-2/3 bg-gray-200 dark:bg-gray-800 rounded-t" />
             <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-t" />
             <div className="w-full h-1/2 bg-gray-200 dark:bg-gray-800 rounded-t" />
             <div className="w-full h-3/4 bg-gray-200 dark:bg-gray-800 rounded-t" />
          </div>
        </div>

     
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded-xl border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-2">
                 <div className="h-4 w-20 bg-gray-200 rounded dark:bg-gray-800 animate-pulse" />
                 <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>
              <div className="h-6 w-32 bg-gray-200 rounded dark:bg-gray-800 animate-pulse" />
            </div>
          ))}
        </div>
      </div>


      <div className="border rounded-xl border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
           <div className="h-6 w-40 bg-gray-200 rounded dark:bg-gray-800 animate-pulse" />
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
            
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded dark:bg-gray-800 animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200 rounded dark:bg-gray-800 animate-pulse" />
                </div>
              </div>
             
              <div className="space-y-2 text-right">
                 <div className="h-4 w-20 bg-gray-200 rounded dark:bg-gray-800 animate-pulse ml-auto" />
                 <div className="h-3 w-12 bg-gray-200 rounded dark:bg-gray-800 animate-pulse ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}