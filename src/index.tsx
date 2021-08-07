import React from 'react';



export type ReturnUsePaginationType = {
  data: any[],
  resetData: (data : any[]) => void,
  addData: (data : any[]) => void,
  loadingMore: boolean,
  onEndReached: () => void,
  pageIndex: number,
  noMoreData: boolean,
};



type usePaginationType = (pageSize? : number) => ReturnUsePaginationType;









const usePagination : usePaginationType = (pageSize = 10) => {


  const [loadingMore, setLoadingMore] = React.useState<boolean>(false);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [lastPageSize, setLastPageSize] = React.useState<number>(0);
  const [data, setData] = React.useState<any[]>([]);






  const onEndReached = () => {
    if (lastPageSize === pageSize) {
      setPageIndex(pageIndex + 1);
      setLoadingMore(true);
    }
  }

  const addData = (pageData: any[]) => {
    setData([...data, ...pageData]);
    setLastPageSize(pageData?.length || 0)
    setLoadingMore(false)
  };




  return {
    data,
    resetData : setData,
    addData,
    onEndReached,
    loadingMore,
    pageIndex,
    noMoreData: data.length > 0 && lastPageSize !== pageSize,
  }

}



export default usePagination;
