# react-native-flatlist-pagination-hook
`usePagination` hook for react native flatlist. it make infinity scroll simple and more easy.

![img1](https://raw.githubusercontent.com/ahmedGaber93/react-native-flatlist-pagination-hook/master/doc/img1.gif)

## Installation

```sh
npm install react-native-flatlist-pagination-hook
```

## example

```js
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import usePagination from "react-native-flatlist-pagination-hook";


const fetchApi = (page = 0, pageSize = 10) => {
    const data = [1,2,3,4,5,6,7,8,9,10, 11,12,13,14,15,16,17,18,19,20, 21,22,23,24,25]
    return new Promise(resolve => {
        setTimeout(() => resolve(data.slice(page * pageSize, (page + 1) * pageSize) || []), 1000);
    });
}


const App : React.FC<any> = () => {
    
    const {
        data,         //use it in Flatlist data
        addData,      //push new group of data
        onEndReached, //callback in Flatlist onEndReached
        pageIndex,    //current pageIndex use it to query data
        ListFooterComponent, //use it in Flatlist ListFooterComponent
    } = usePagination(10); //pageSize = 10
    
    
    React.useEffect(() => {
        fetchApi(pageIndex).then((data: any) => {
            addData(data);
        })
    }, [pageIndex]);
    
    
    return (
        <FlatList
            onEndReachedThreshold={.5}
            onEndReached={onEndReached}
            contentContainerStyle={{flexGrow: 1}}
            data={data}
            renderItem={({item} : any) => <View style={styles.item}><Text>item: {item}</Text></View>}
            ListFooterComponent={ListFooterComponent}
            keyExtractor={item => item.toString()}/>
    );
};


const styles = StyleSheet.create({
    item: {
        height: 100,
        backgroundColor : '#e3e3e3',
        marginVertical : 6,
        justifyContent : 'center',
        alignItems : 'center',
        margin : 12,
        borderRadius : 5,
    }
});

export default App;

```



## usePagination full Usage

```js
import usePagination from "react-native-flatlist-pagination-hook";

const {
    data,         //use it in Flatlist data
    addData,      //push new group of data
    onEndReached, //callback in Flatlist onEndReached
    loadingMore,  //if true show loading more Indicator
    pageIndex,    //current pageIndex use it to query data
    hasMoreData,   //if false show hasMoreData message
    resetData,    //use it to reset data when Flatlist refreshing
    ListFooterComponent, //use it in Flatlist ListFooterComponent
} = usePagination(10); //pageSize = 10

```



## how hasMoreData calculated
if pageSize = 10
* if last page data length = 10 `hasMoreData = true`
* if last page data length < 10 `hasMoreData = false`
* if last page data length = 0 `hasMoreData = false`


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
