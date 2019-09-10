import React, { Component } from 'react';
import {
  View, StyleSheet, SafeAreaView, TouchableOpacity, Text,Button
} from 'react-native';
import PickerModal from 'react-native-picker-modal-view';

const city = [
	{Id: 1, Name: '$5000', Value: '500'},
	{Id: 2, Name: '$5000', Value: '500'},
	{Id: 3, Name: '$5000', Value: '500'},
	{Id: 4, Name: '$5000', Value: '500'}
]
const month = [
    {Id: 1, Name: 'Jan', Value: '1'},
    {Id: 2, Name: 'Feb', Value: '2'},
    {Id: 3, Name: 'March', Value: '3'},
    {Id: 4, Name: 'April', Value: '4'},
    {Id: 5, Name: 'May', Value: '5'},
    {Id: 6, Name: 'June', Value: '6'},
    {Id: 7, Name: 'July', Value: '7'},
    {Id: 8, Name: 'August', Value: '8'},
    {Id: 9, Name: 'Sept', Value: '9'},
    {Id: 10, Name: 'Oct', Value: '10'},
    {Id: 11, Name: 'Nov', Value: '11'},
    {Id: 12, Name: 'Dec', Value: '12'},
]
export class EmiCaclulator extends Component {
  state = {
    query: '',
    selectedItem: {},
    selectedItemMonth:{},
    result:null
  };

  selected(selected) {
    this.setState({
        selectedItem: selected
    })
}

selectedMonth(selected) {
    this.setState({
        selectedItemMonth: selected
    })
}

getResult=()=>{    
let amount = Number(this.state.selectedItem.Value);
let month = Number(this.state.selectedItemMonth.Value)
let reqUrl = `https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&&numMonths=${month}`
fetch(reqUrl)
.then((response) => response.json())
.then((responseJson)=>{  
    let data = JSON.stringify(responseJson);  
    alert(data);
    this.setState({result:data})
});
}

  render() {
    const { query } = this.state;
    return (
      <View style={styles.container}>                  
        <View style={{ flex:1,flexDirection:"column"}}>
            <View style={{flex:2,backgroundColor:'green',flexDirection:'column'}}>
                <View style={{flex:2}}>
                    <Text style={{}}>Enter Amount</Text>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
				<PickerModal
					renderSelectView={(disabled, selected, showModal) =>
						<Button disabled={disabled} title={'Choose Currency!'} onPress={showModal} />
					}
					onSelected={(selected) => this.selected(selected)}					
					items={city}
					sortingLanguage={'tr'}
					showToTopButton={true}					
					showAlphabeticalIndex={true}
					autoGenerateAlphabeticalIndex={true}
					selectPlaceholderText={'Choose one...'}
					onEndReached={() => console.log('list ended...')}
					searchPlaceholderText={'Search...'}
					requireSelection={false}
					autoSort={false}
				/>
				<View style={{ padding: 10, alignItems: 'center', backgroundColor: '#ddd' }}>
					<Text>Chosen: </Text>
					<Text>{JSON.stringify(this.state.selectedItem.Value)}</Text>
				</View>
			</SafeAreaView>
                </View>
                <View style={{flex:2,backgroundColor:'yellow'}}>
                        <Text>USerInput3 </Text>
                        <SafeAreaView style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
				<PickerModal
					renderSelectView={(disabled, selected, showModal) =>
						<Button disabled={disabled} title={'Choose Month!'} onPress={showModal} />
					}
					onSelected={(selected) => this.selectedMonth(selected)}					
					items={month}
					sortingLanguage={'tr'}
					showToTopButton={true}					
					showAlphabeticalIndex={true}
					autoGenerateAlphabeticalIndex={true}
					selectPlaceholderText={'Choose one...'}
					onEndReached={() => console.log('list ended...')}
					searchPlaceholderText={'Search...'}
					requireSelection={false}
					autoSort={false}
				/>
				<View style={{ padding: 10, alignItems: 'center', backgroundColor: '#ddd' }}>
					<Text>Chosen: </Text>
					<Text>{JSON.stringify(this.state.selectedItemMonth.Value)}</Text>
				</View>
			</SafeAreaView>
                </View>            
            </View>
            <View style={{flex:2,flexDirection:'column'}}>
            <View style={{flex:2,backgroundColor:'green',justifyContent:"center",alignItems:"center"}}>            
                <TouchableOpacity onPress={()=>this.getResult()}>
                    <Text>Get data</Text>
                </TouchableOpacity>              
            </View>                
            <View style={{flex:2,justifyContent:"center",alignItems:'center',backgroundColor:'gray'}}>
                <Text>{this.state.result} </Text>
                </View>     
            </View>
            <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                <Text>History</Text>
            </View>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1    
  }
});

export default EmiCaclulator;