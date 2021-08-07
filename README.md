# react-native-flatlist-pagination-hook

![img1](https://raw.githubusercontent.com/ahmedGaber93/react-native-flatlist-pagination-hook/master/doc/img1.gif)

## Installation

```sh
npm install react-native-flatlist-pagination-hook
```

## Usage

```js
...
import usePagination from "react-native-flatlist-pagination-hook";
...



const App : React.FC = () => {

    const {
        data,
        resetData,
        addData,
        onEndReached,
        loadingMore,
        pageIndex,
        noMoreData
    } = usePagination(10);



    React.useEffect(() => {

        fetchApi(pageIndex).then((data: any) => {
            addData(data);
        })

    }, [pageIndex]);



    const ListFooterComponent = () => {
        return(
            <View style={{height : 50}} >
                {
                    loadingMore &&
                    <View style={styles.upActivityIndicator}>
                        <ActivityIndicator size={28} color={"#f55d82"}/>
                    </View>
                }
                {noMoreData && <Text style={styles.noMoreData}>No more date</Text>}
            </View>
        )
    };



    return (
        <View style={styles.container}>
            <FlatList
                onEndReachedThreshold={.5}
                onEndReached={onEndReached}
                contentContainerStyle={{flexGrow: 1}}
                data={data}
                renderItem={({item} : any) => <View style={styles.item}><Text>item: {item}</Text></View>}
                ListFooterComponent={ListFooterComponent}
                keyExtractor={item => item.toString()}/>
        </View>
    );
};


export default App;

```


## Full example with fake data

```js
import React from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import usePagination from "react-native-flatlist-pagination-hook";




const App : React.FC = () => {



    const fetchApi = (page = 0) => {
        const data = [
            [1,2,3,4,5,6,7,8,9,10],
            [11,12,13,14,15,16,17,18,19,20],
            [21,22,23,24,25]
        ]
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(data[page] || []);
            }, 1000);
        });
    }


    const {
        data,
        resetData,
        addData,
        onEndReached,
        loadingMore,
        pageIndex,
        noMoreData
    } = usePagination(10);



    React.useEffect(() => {

        fetchApi(pageIndex).then((data: any) => {
            addData(data);
        })

    }, [pageIndex]);






    const ListFooterComponent = () => {
        return(
            <View style={{height : 50}} >
                {
                    loadingMore &&
                    <View style={styles.upActivityIndicator}>
                        <ActivityIndicator size={28} color={"#f55d82"}/>
                    </View>
                }
                {noMoreData && <Text style={styles.noMoreData}>No more date</Text>}
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <FlatList
                onEndReachedThreshold={.5}
                onEndReached={onEndReached}
                contentContainerStyle={{flexGrow: 1}}
                data={data}
                renderItem={({item} : any) => <View style={styles.item}><Text>item: {item}</Text></View>}
                ListFooterComponent={ListFooterComponent}
                keyExtractor={item => item.toString()}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    noMoreData : {
        textAlign: 'center',
        paddingVertical : 10,
    },
    item: {
        height: 100,
        backgroundColor : '#e3e3e3',
        marginVertical : 6,
        justifyContent : 'center',
        alignItems : 'center',
        margin : 12,
        borderRadius : 5,
    },
    upActivityIndicator : {
        justifyContent : 'center',
        alignItems : 'center',
    },

});

export default App;

```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
