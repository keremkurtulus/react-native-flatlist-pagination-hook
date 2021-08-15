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
        data,
        addData,
        onEndReached,
        pageIndex,
        ListFooterComponent
    } = usePagination(10);


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
